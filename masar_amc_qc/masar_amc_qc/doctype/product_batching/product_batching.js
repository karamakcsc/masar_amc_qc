// Copyright (c) 2023, KCSC and contributors
// For license information, please see license.txt


cur_frm.fields_dict['prim_raw_material'].get_query = function(doc) {
    return {
        filters: {
            "item_group": doc.material_type
        }
    };
};

cur_frm.fields_dict['sec_raw_material'].get_query = function(doc) {
    return {
        filters: {
            // "parent_item_group": "Raw Material",
			"is_group": 0
        }
    };
};

cur_frm.fields_dict['batch_no'].get_query = function(doc) {
    return {
        filters: {
            "item": doc.item_code
        }
    };
};
