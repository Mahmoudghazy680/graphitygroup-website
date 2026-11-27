import base64
import json
from io import BytesIO

import frappe
from frappe.model.document import Document
from PIL import Image

DOCTYPE = "Graphity Solutions Release"
MAX_IMAGE_BYTES = 1_000_000

class GraphitySolutionsRelease(Document):
    def validate(self):
        for key in ("planned", "logged", "approvals", "stock"):
            value = self.get(key)
            if not isinstance(value, int) or not 0 <= value <= 999_999:
                frappe.throw(f"{self.meta.get_label(key)} must be between 0 and 999,999.")
        for locale in ("en", "ar"):
            for key in ("project", "date", "overview", "overview_body"):
                value = (self.get(f"{key}_{locale}") or "").strip()
                if not value or len(value) > 700:
                    frappe.throw(f"Complete all fields for {locale.upper()} using at most 700 characters.")

            self.labels("other_steps", locale, 4)
            self.labels("module_labels", locale, 8)

    def labels(self, key, locale, count):
        lines = [line.strip() for line in (self.get(f"{key}_{locale}") or "").splitlines()]
        if len(lines) != count or any(not line or len(line) > 100 for line in lines):
            frappe.throw(f"Enter {count} non-empty labels for {self.meta.get_label(f'{key}_{locale}')}.")
        return lines

    def before_submit(self):
        payload = {
            "schema": 1,
            "division": "solutions",
            "revision": self.name,
            "metrics": {key: self.get(key) for key in ("planned", "logged", "approvals", "stock")},
        }
        for locale in ("en", "ar"):
            payload[locale] = {
                "project": self.get(f"project_{locale}").strip(),
                "date": self.get(f"date_{locale}").strip(),
                "overview": self.get(f"overview_{locale}").strip(),
                "overviewBody": self.get(f"overview_body_{locale}").strip(),
                "otherSteps": self.labels("other_steps", locale, 4),
                "moduleLabels": self.labels("module_labels", locale, 8),
            }
        if self.hero_image:
            payload["hero"] = self.export_image()
        self.release_snapshot = json.dumps(payload, ensure_ascii=False)

    def export_image(self):
        file_name = frappe.db.get_value("File", {
            "attached_to_doctype": DOCTYPE,
            "attached_to_name": self.name,
            "file_url": self.hero_image,
        }, "name")
        if not file_name:
            frappe.throw("Upload the hero image as an attachment to this release.")
        data = frappe.get_doc("File", file_name).get_content()
        if not isinstance(data, bytes) or len(data) > MAX_IMAGE_BYTES:
            frappe.throw("Upload a JPEG, PNG, or WebP image under 1 MB.")
        try:
            with Image.open(BytesIO(data)) as image:
                format_name = (image.format or "").lower()
                if image.width * image.height > 16_000_000:
                    frappe.throw("The hero image must be under 16 megapixels.")
                image.verify()
        except (OSError, Image.DecompressionBombError):
            frappe.throw("The hero image could not be verified.")
        if format_name not in {"jpeg", "png", "webp"}:
            frappe.throw("Upload a JPEG, PNG, or WebP image.")
        return {"format": format_name, "base64": base64.b64encode(data).decode("ascii")}

@frappe.whitelist()
def download(name):
    if not set(frappe.get_roles()).intersection({"Graphity Solutions Publisher", "System Manager", "Administrator"}):
        frappe.throw("Only a publisher can export a release.", frappe.PermissionError)
    release = frappe.get_doc(DOCTYPE, name)
    release.check_permission("read")
    if release.docstatus != 1 or not release.release_snapshot:
        frappe.throw("Submit the release before exporting.")
    frappe.local.response.filename = f"{release.name}.json"
    frappe.local.response.filecontent = release.release_snapshot
    frappe.local.response.type = "download"
