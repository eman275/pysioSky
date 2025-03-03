export default {
  status_section: {
    title: 'Thank you for Purchasing through Tameeni',
    description: 'Insurance policy has been issued successfully.',
    account_btn: 'View My Account',
    download_btn: 'Download Policy',
  },
  policy_section: {
    term_but: 'Terms & Conditions',
    policy_details: {
      policy_number: 'Policy Number',
      policy_effective_date: 'Effective Date',
      policy_end_date: 'End Date',
      policy_price: 'Policy Price',
      policy_quote_reference_no: 'Quote Reference No',
      policy_vehicle_count: '{count} Vehicles - {type}',
    },
  },
  payment_section: {
    title: 'Payment Details',
    payment_reference: 'Payment Reference No:',
    print_btn: 'Print Receipt',
    details_card: {
      policy_price: 'Policy Price Amount',
      policy_price_vat: '+VAT ({vat}%):',
      policy_price_grand_total: 'Grand Total (Including VAT):',
    },
  },
} as const
