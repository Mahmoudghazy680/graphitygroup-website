frappe.ui.form.on('Graphity Solutions Release', {
  refresh(frm) {
    const canPublish = ['Graphity Solutions Publisher', 'System Manager'].some(role => frappe.user.has_role(role));
    if (frm.doc.docstatus === 1 && canPublish) {
      frm.add_custom_button(__('Download release'), () => {
        const method = 'graphity_web_admin.graphity_web_admin.doctype.graphity_solutions_release.graphity_solutions_release.download';
        window.location.assign('/api/method/' + method + '?name=' + encodeURIComponent(frm.doc.name));
      });
    }
  },
});
