// Copyright (c) 2023, KCSC and contributors
// For license information, please see license.txt

frappe.ui.form.on('Startup QC', {
	// refresh: function(frm) {

	// }
});

cur_frm.fields_dict['station_no'].get_query = function(doc) {
	    return {
	        filters: {
	            "workstation_type": doc.workstation_type
	        }
	    };
	};

frappe.ui.form.on('Startup QC', {
	refresh: function(frm) {

		cur_frm.fields_dict['batch_no'].get_query = function(doc) {
			return {
				filters: {
					"item_code": frm.doc.item_code
				}
			};
		};
	}
});



frappe.ui.form.on('Startup QC', {
    setup: function (frm) {
        frm.fields_dict['item_dimensions'].grid.get_field('dimension_name').get_query = function (doc, cdt, cdn) {
            return {
                filters: {
                    'item_code': doc.item_code
                }
            };
        };
    },
    item_code: function (frm) {
        frappe.call({
            method: 'masar_amc_qc.masar_amc_qc.doctype.startup_qc.startup_qc.get_standard_dimensions',
            args: {
                item_code: frm.doc.item_code
            },
            callback: function (response) {
                if (response.message) {
                    frm.clear_table('item_dimensions');
                    $.each(response.message, function (i, row) {
                        var child = frm.add_child('item_dimensions');
                        frappe.model.set_value(child.doctype, child.name, 'dimension_name', row.dimension_name);
						frappe.model.set_value(child.doctype, child.name, 'dimension_abbr', row.dimension_abbr);
						frappe.model.set_value(child.doctype, child.name, 'value', row.value);
						frappe.model.set_value(child.doctype, child.name, 'upper_tolerance', row.upper_tolerance);
						frappe.model.set_value(child.doctype, child.name, 'lower_tolerance', row.lower_tolerance);
                    });
                    frm.refresh_field('item_dimensions');
                }
            }
        });
    }
});
