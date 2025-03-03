export default {
  add_vehicle: {
    add_vehicle_details: 'Add Vehicle Details',
    fix_vehicle_details: 'Fix Vehicle Details',
    registration_type: 'Registration Type',
    sequence_number: 'Sequence Number',
    custom_number: 'Custom Number',
    purpose_of_insurance: 'Purpose Of Insurance',
    new_insurance: 'New Insurance',
    ownership_transfer: 'Ownership Transfer',
    model_year: 'Model Year',
    body_type: 'Body Type',
    vehicle_make: 'Vehicle Make',
    vehicle_model: 'Vehicle Model',
    sum_insured: 'Sum Insured',
    sar: 'SAR',
    insurance_type: 'Insurance Type',
    third_party: 'Third-Party',
    comprehensive: 'Comprehensive',
    save_add_more: 'Save & Add More',
    start_a_new_vehicles: {
      title: 'To start a new vehicles list, ',
      sub_title: 'replace excel sheet',
    },
    edit_vehicle_details: 'Edit Vehicle Details',
    edit_vehicles_details: 'Edit Selected Vehicles Details',
    save_changes: 'Save Changes',
    confirm_vehicle_details: 'Confirm Vehicle Details',
    confirm_vehicle: 'Confirm Vehicle',

    sub_title: 'Please provide correct details',
  },
  spinner: 'Adding Your Vehicle',
  apply_changes_for_selected_vehicles: 'Apply Changes for Selected Vehicles ',

  error_single_vehicle_modal: {
    title: 'Sorry, We can not proceed',
    sub_title:
      'You have {total-error} undefined vehicles, Do you want to delete these vehicles?',
    undefined_vehicles: 'Undefined Vehicles:',
    back_btn: 'Back to the List',
    delete_btn: 'Delete Undefined Vehicles',
  },

  selection_warning_modal: {
    x_vehicles_selected: '({selectedVehicles}) vehicles selected',
    do_you_want_to_proceed:
      'Do you want to proceed with all the vehicles ({totalVehicles})?',
    neglect_and_proceed: 'Neglect Selection & Proceed',
    go_back: 'Go Back',
  },
  delete_warning_vehicle: {
    are_you_sure: 'Are you sure you want to delete this vehicle?',
    are_you_sure_multi:
      'Are you sure you want to delete those {total} vehicles?',
    this_will_delete_title:
      ' This will delete the vehicle permanently, You can not undo this action',
    this_will_delete_title_multi:
      ' This will delete those {total} vehicles permanently, You can not undo this action',
    cancel: 'Cancel',
    yes_delete: 'Yes, Delete',
  },
  failed_vehicles:
    '{totalError} Errors found, Please edit or remove these fields to proceed',
  no_vehicle_card: {
    title: 'No vehicles added yet',
    sub_title:
      ' Your vehicles will be listed here once you added it one by one or using Excel sheet',
  },
  vehicles_list: 'Vehicles List',
  vehicle: 'Vehicle',
  select_all_for_edit: 'Select all for edit',
  selected: 'Selected',
  delete: 'Delete ',
  edit: 'Edit  ',
  next: 'Next',
  vehicle_edited_successfully: 'Vehicle Edited Successfully',
  vehicle_add_successfully: 'Vehicle Add Successfully',
  vehicle_deleted_successfully: 'Vehicle deleted Successfully',
  vehicle_add_warning: 'Vehicle is Added but not valid',
  vehicle_fix_warning: 'Vehicle fixed but still not valid!',
  vehicle_edit_warning: 'Vehicle edited but still not valid!',

  vehicle_fix_successfully: 'Vehicle fixed successfully!',
  warning_error_modal: {
    title: '{total-error} of your vehicles has errors',
    sub_title: ' Please select how do you want to proceed',
    delete_procees: ' Delete&Procees',
    edit_vehicles: 'Edit Vehicles',
  },
  pagination: {
    pages: 'Pages',
    back: 'Back',
    next: 'Next',
  },
  reset_alert: {
    flag: 'Note:',
    description: 'You still can',
    link: 'Reset Your Previous Vehicles list',
    sub_description:
      ', by adding any vehicle there will not be an option to reset your previous list',
  },
  vehicle_actions: {
    edit: 'Edit Vehicle',
    fix: 'Fix Vehicle',
    delete: 'Delete Vehicle',
    confirm: 'Confirm Vehicle',
  },
  select_method: {
    alert: {
      flag: 'Note:',
      description: 'You already have a vehicles list, Go back to',
      link: 'my Vehicles list.',
    },
    title: 'Insert your vehicles details using',
    manual: {
      title: 'Insert Vehicle Manually',
      description:
        'Insert sequence/ custom number for your fleet vehicles one by one',
      sub_title: 'It’s recommended for fleet with less than 5 vehicles',
      btn: 'Insert Vehicle Details',
    },
    excel: {
      title: 'Bulk Upload',
      description: 'Upload your vehicles details using Excel Sheet',
      sub_title: 'It’s recommended for fleet with 5 vehicles or more',
      btn: 'Use Excel Sheet',
    },
  },
  upload_excel_modal: {
    title: 'Upload Excel Sheet',
    sub_title: 'Recommended for fleet with 5 vehicles or more',
    description:
      'This method allows you to download an excel template and requesting you to upload this excel sheet after filling it with your vehicles details',
    btn_download: 'Download a template',
    btn_upload: 'Upload Excel file',
    how_it_works: 'How it works?',
  },
  how_it_works_modal: {
    title: 'Bulk Upload',
    sub_title: 'An easy way to add all your vehicles by one click',
    steps: {
      title: 'Follow the below steps:',
      step_one: 'Download the Excel sheet Template.',
      step_two: 'Fill the required Excel Columns.',
      step_three: 'Upload the Excel Sheet after filling it.',
    },
    notes: {
      title: 'Important Notes:',
      note_one:
        'Make sure the company have a National address registered in Saudi Post.',
      note_two:
        'Make sure to enter sequence number, model year, insurance type, coverage type and sum insured correctly.',
      note_three: 'Make sure to follow the same values as in the Template.',
    },
    btn_download: 'Download a template',
  },
  upload_loader_modal: {
    title: 'Upload Excel Sheet',
    sub_title: 'UPLOADING',
    btn_cancel: 'Cancel',
  },
  file_not_supported_modal: {
    title: 'Upload Excel Sheet',
    sub_title: 'Something went wrong',
    description:
      'The uploaded file formate is not supported, Please make sure to use CSV,XLS or XLSX file formate',
    btn_try_again: 'Try Again',
  },
  upload_error_modal: {
    title: 'Upload Excel Sheet',
    sub_title: 'Something went wrong',
    btn_try_again: 'Upload New Excel Sheet',
  },
  replace_list_modal: {
    title: 'You already have a vehicles list',
    description_manual:
      'You can add new vehicle to your existing list or add a vehicle to a new list',
    description_excel:
      'By uploading new excel sheet, All the existing vehicles will be replaced with the new list.',
    btn_add_to_list: 'Add to My List',
    btn_replace_list: 'Replace with new list',
    btn_start_new_list: 'Start New List',
    btn_go_to_old_list: 'Go to my list',
  },
  active_quote_exist_modal: {
    title: 'Are you sure you want to cancel these existing quotes?',
    description:
      'We currently have quotes available for this request.{brTag} Please note that any modifications to the request details will result in the cancellation of these quotes.',
    close_btn_text: 'Cancel',
    cancel_existing_btn_text: 'Yes, Cancel Existing Quotes',
    view_existing_btn_text: 'View Existing Quotes',
  },
  sum_insured_tooltip:
    'The sum insured is the market value of the car, and it might be counted for claims compensation in case of total loss.',
} as const
