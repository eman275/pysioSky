export default {
  vehicles_customization: 'Vehicles Customization',
  title: {
    title: 'We’re bringing suitable quotations for you,',
    sub_title: ' please wait.',
  },
  rasan_information: 'Rasan Information Technology Co',
  cr: 'CR:',
  expiry_date: 'Expiry Date:',

  important_flag: {
    title: 'Important Note:',
    sub_title:
      "Customize your quote for repair type and deductibles by clicking on 'View Details'",
  },
  modified_flag: {
    title: 'Modified Option:',
    sub_title: `The IC offer you a modification for some of your vehicles’
                insurance type`,
  },
  quotes_loader: 'More quotations are being loaded',
  alert_flag: {
    title: 'Alert:',
    sub_title: `Some of the vehicle <strong>“sum insured”</strong> and <strong>“insurance type”</strong> has been changed by the IC`,
    sum_insured_changed_alert:
      'Some of the vehicle <strong>“sum insured”</strong>  has been changed by the IC',
    insurance_type_changed_alert:
      'Some of the vehicle <strong>“insurance type”</strong>  has been changed by the IC',
  },
  fleet_insurance: 'Fleet Insurance',
  terms_conditions: 'Terms & Conditions',
  show_all_benefits: 'Show All Benefits',
  hide_all_benefits: 'Hide All Benefits',
  original_price: 'Original Price:',
  using_deductibles: '(Using IC’s default deductibles)',
  select_customize: 'Select & Customize',
  view_details: 'View Details',
  new_price: 'New Price',
  per_your_customization: 'As per your customization for deductibles & Repair',
  reset: 'Reset',
  vehicles_comp: '{total} Vehicles - COMP',
  vehicles_tpl: '{total} Vehicles - TPL',
  discount: 'Discount ({percentage}%)',
  vat: 'VAT ({percentage}%)',
  quotation_summary: {
    title: 'Quotation Summary',
    need_help: 'Need Help?',
    policy_details: 'Policy Details',
    benefits: 'Benefits',
    comp_vehicles: 'COMP Vehicles ({total})',
    tpl_vehicles: 'TPL Vehicles ({total})',
    repair_type: 'Repair Type:',
    deductible_amount: 'Deductible Amount',
    deductible: 'Deductible:',
    quotation_price: 'Quotation Price',
    workshop: 'Workshop',
    agency: 'Agency',
    edited: 'Edited',
    modified_tPL_iC: ' Modified to TPL by IC',
    some_vehicle_insurance_changed:
      'This car was  requested for Comprehensive, but IC can provide only TPL for this car.',
    edited_vehicle:
      'The sum insured is edited by IC, so it is different than the one entered by the customer',
  },
  reset_to_default: 'Reset to default',
  save_and_compare: 'Save & Compare',
  proceed_to_payment: 'Proceed to payment',
  policy_summary: 'Policy Summary',
  repair_type: 'Repair type',
  agency_deductible: 'agency',
  workshop_deductible: 'workshop',
  edit_deductibles: {
    title: 'Select repair type & deductibles for each vehicle:',
    agency: 'For agency',
    workshop: 'For workshop',
  },
  edit_repair_method: {
    title: 'Select repair type & deductibles for each vehicle:',
    sub_title: 'Or set all applicable vehicles as:',
    agency: 'agency:',
    workshop: 'For workshop:',
  },
  reset_customization_modal: {
    title: 'Are you sure you want to reset the customizations on this quote?',
    description:
      'This will delete all your preferences customization permanently, and the quotation will returned to its default state exactly as what the IC offer.',
    reset_button: 'Yes, Reset',
    cancel_button: 'Cancel',
  },
  vehicle_list: 'Vehicles List:',
  premium_features: {
    title: 'Benefits',
  },
  empty_quotes_card: {
    title: 'No Quotes to show',
    sub_title:
      'Sorry, We are not able to retrieve any quotes for your fleet in the time being. Please Try-again Later',
  },
  repair_type_section: {
    title: 'Repair Type',
    sub_title: '{total} Comp Vehicles:',
    agency: 'Agency',
    workshop: 'Workshop',
  },
  quotation_expiry_warning: {
    minutes_left: '5 Minutes Left!',
    warning_msg: 'Kindly note that these quotations will expire in 5 minutes',
    ok: 'ok',
  },
  quotation_expired_warning: {
    time_out: 'Time Out!',
    warning_msg:
      ' Sorry these quotations are expired,Please go back to the home page and request a new quotation if needed',
    return_to_vehicle_list: ' Return to Vehicle List',
    go_back_to_home_page: ' Go Back to Home Page',
  },
  quotations: 'Quotations',
  request_id: 'Request ID',
} as const
