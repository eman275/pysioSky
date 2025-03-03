export default {
  summary: {
    policy_summary: 'Policy Summary',
    benefeciaries: 'Beneficiaries',
    policy_details: 'Policy Details',
    payment_details: 'Payment Details',
    fleet_details: 'Fleet Details',
    policy_holder_details: 'Policy Holder Details',
    sum_covered: 'Sum Covered',
    targeted_maturity_amount: 'Targeted Maturity Amount',
    contribution: 'Contribution',
    insurance_period: 'Insurance Period',
    benefits: 'Benefits',
    legal_heirs: 'Legal heirs',
    phone_verification: {
      title: 'This Mobile Number is not owned by you!',
      description:
        'By reviewing your data, you are not the owner of this Mobile Number {mobile}, please enter your a Mobile Number that owned by you.',
      alert:
        "The Mobile Number you've entered is not yours, please enter another Number that owned by you!",
    },
  },
  iban_number: 'IBAN number',
  payment_method: 'Payment Method',
  payment_day: 'Payment Day',
  select_payment_method: 'Select Payment Method',
  select_payment_avaliability: '(Only Card Payment available)',
  select_payment_method_second_line:
    'This payment will be automatically deducted from your account for all upcoming bills ',
  payment_note: 'You will get notified before every payment',
  payment_cards: {
    mada: 'MADA',
    credit_card: 'Debit/Credit Card ',
    sadad_payment: 'Sadad Payment',
  },
  disclaimer: {
    disclaimer_1: 'I Accept All of the below:',
    disclaimer_2:
      'I certify that i have read and reviewed all the details written in this page',
    disclaimer_3: `I accept the  `,
    terms_conditions: 'Terms & Conditions',
  },
  aside: {
    summary_details: 'Summary Details',
    including_taxes: 'Includes all taxes and fees',
    policy_price_amount: 'Policy Price Amount',
    base_premium: 'Base Premium',
    vAT: 'VAT ({percentage}%) ',
    payment_summary: 'Payment Summary',
  },
  contract: {
    required_signature: 'Required Signature',
    sign_now: 'Sign Now',
    otp_required: 'OTP is required to proceed',
    pay_now: 'Pay Now',
  },
  otp: {
    otp_verification: 'OTP Verification',
    otp_description:
      'We sent a 4 digits to the applicant mobile number, please check and enter below',
    otp_label: 'Enter OTP Number',
    ends_in: 'Ends in',
  },
  policy_holder_details: {
    company_name: 'Company Name',
    cr_expiry_date: 'CR Expiry date',
    cr_number: 'Cr Number',
    company_address: {
      title: 'Company National Address',
      building_number: 'Building Number',
      street: 'Street Name',
      district: 'District',
      city: 'City',
      post_code: 'Post Code',
      additional_number: 'Additional Number',
    },
  },
  policy_total_price: 'Policy Total Price',
  repair_type: 'Repair Type',
  comp_vehicles: 'COMP Vehicles',
  tpl_vehicles: 'TPL Vehicles',
  proceed_to_payment: 'Proceed To Payment',
  policy_effective_date: 'Policy Effective Date: ',
  till_date: 'Till Date: ',
  workShop: 'WorkShop',
  agency: 'Agency',
  payment_failed:
    'There is a problem in proceeding your payment, please try again.',
  payment_processing: 'Payment is processing',
} as const
