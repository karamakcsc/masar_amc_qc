# Import necessary modules
import frappe
from frappe.model.document import Document

class StartupQC(Document):
    def validate(self):
        result = frappe.db.sql("""
            SELECT *
            FROM `tabItem Standard Dimension Line` 
            WHERE parent = %s
            ORDER BY creation DESC
            LIMIT 1
        """, (self.item_code,), as_dict=True)

        return result

@frappe.whitelist()
def get_standard_dimensions(item_code):
    standard_dimensions = frappe.get_all('Item Standard Dimension Line',
                                         filters={'parent': item_code},
                                         fields=['dimension_name', 'dimension_abbr', 'value', 'upper_tolerance', 'lower_tolerance'])

    return standard_dimensions
