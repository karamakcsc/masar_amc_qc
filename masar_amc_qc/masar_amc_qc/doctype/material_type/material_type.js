// Copyright (c) 2023, KCSC and contributors
// For license information, please see license.txt

cur_frm.fields_dict['material_type'].get_query = function(doc) {
    return {
        filters: {
            "parent_item_group": "Raw Material"
        }
    };
};
