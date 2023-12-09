frappe.ui.form.on('Item', {
	setup: function (frm) {
		frm.set_query("dimension_name", "custom_item_dimensions", function (doc, cdt, cdn) {
			var custom_item_dimensions = [];

			if (doc.custom_item_dimensions && doc.custom_item_dimensions.length) {
				custom_item_dimensions = doc.custom_item_dimensions.map(item => item.dimension_name);
			}

			return {
				filters: [
					['Item Standard Dimension', 'is_enable','=', 1],
                    ['Item Standard Dimension', 'name', 'not in', custom_item_dimensions],
				]
			};
		});
	},
});

cur_frm.fields_dict['custom_material_type'].get_query = function(doc) {
	return {
		filters: {
			"is_enable": 1
		}
	}
}

cur_frm.fields_dict['custom_product_color'].get_query = function(doc) {
	return {
		filters: {
			"is_enable": 1
		}
	}
}
cur_frm.fields_dict['custom_neck_finish_type'].get_query = function(doc) {
	return {
		filters: {
			"is_enable": 1
		}
	}
}