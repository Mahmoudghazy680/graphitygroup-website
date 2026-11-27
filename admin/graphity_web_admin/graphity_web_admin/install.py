import frappe

def ensure_roles():
    for name in ("Graphity Solutions Editor", "Graphity Solutions Publisher", "Graphity Studio Editor", "Graphity Studio Publisher"):
        if not frappe.db.exists("Role", name):
            frappe.get_doc({"doctype": "Role", "role_name": name, "desk_access": 1}).insert()
