export default {
  title: {
    contact_information: 'Contact Information',
    business_work_address: 'Business Work Address',
    business_contact_info: 'Business Contact Information',
    preferred_communication_method: 'Preferred Communication Method',
  },
  field: {
    mobile_number: 'Mobile Number',
    landline_number: 'Landline Number',
    email_address: 'Email Address',
    country: 'Country',
    unit: 'Unit',
    building_name: 'Building Name',
    building_number: 'Building Number',
    street: 'Street',
    additional_number: 'Additional Number',
    postal_code: 'Postal Code',
    district: 'District',
    city: 'City',
    po_box: 'PO Box',
    fax: 'Fax',
    preferred_mailing_address: 'Preferred Mailing Address',
    preferred_language: 'Preferred Language',
    relationship: 'Relationship with Covered Member',
    share_percentage: 'Beneficiary share percentage ',
    contact_details: 'Contact Details',
  },
  applicant_contact_disclaimer:
    'I declare that I have one nationality, which is {nationality} and I do not have any other nationality.',
  saudi: 'Saudi',
  beneficiaries: {
    beneficiary: 'Beneficiary',
    legal_hairs: 'Legal hairs',
    deletion_title:
      'Are you sure you want to remove {beneficiaryName} from your Main Beneficiary list?',
    remove_beneficiary: 'Remove Beneficiary',
    add_main_beneficiary: 'Add main beneficiary',
    update_beneficiary: 'updating {beneficiaryName} information',
    beneficiary_action: 'Save Beneficiary Details',
    main_beneficiary: 'Main Beneficiary',
    who_main_beneficiary: 'Who is the Main Beneficiary?',
    main_beneficiary_description:
      "The main beneficiary is the person who will benefit from the insurance in the event of the covered member's death. The main beneficiary receives the financial benefits related to the insurance in the case of the covered member's death. It is possible to add more than one primary beneficiary.",
    main_beneficiary_action: 'Add Main Beneficiary',
    applicant_beneficiaries_disclaimer:
      "I don't want to add specific beneficiaries. the legal heirs will be the beneficiaries",
    beneficiary_alert:
      'You cannot add this beneficiary because their relationship with the covered individual is {relationship}.  {productName} allows adding beneficiaries with the following relationships only: {beneficiaries}',
    share_percentage: 'Share percentage',
    failed_to_load_beneficiaries: 'Failed to load beneficiaries',
    beneficiary_added_successfully: 'Beneficiary added successfully',
    beneficiary_updated_successfully: 'Beneficiary updated successfully',
    percentage_max_error: 'Share Percentage sum cannot be more than 100%',
    percentage_min_error: 'Share Percentage sum cannot be less than 100%',
    legal_hairs_declaimer_error:
      'Please check this box or add beneficiaries to continue',
  },
} as const
