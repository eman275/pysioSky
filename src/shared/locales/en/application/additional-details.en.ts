export default {
  vat_number: {
    label: 'VAT Number',
    placeHolder: 'Insert VAT number',
  },
  select_one_of_cr_title:
    'Select one of the CR owners’ ID to verify and complete the purchase!',
  note: {
    title: 'Note that: ',
    description:
      'The CR owner with the ID you select will receive a message with OTP to verify and approve the purchase you are requesting',
  },
  cr_owner_mobile_number: {
    title: 'CR Owner’s Mobile Number',
    description:
      ' We will send a message with OTP to the selected CR Owner’s (ID:{id})   to verify and approve the purchase you are requesting.',
    sent_otp: ' Sent OTP',
  },
  select_another_cr_owner: 'Select another CR Owner',
  otp_verification: {
    title: 'OTP Verification',
    description:
      ' We have sent a 4 digits OTP to the CR Owner’s (ID: {id}) provided phone number. Kindly check and enter below',
    please_enter_the_otp_number: 'Please enter the OTP number',
    enter_the_otp_number: 'Enter OTP Number',
    otp_expires_in: 'OTP expires in',
    otp_expired: 'OTP is expired',
    resend_otp: 'Resend OTP',
    verify: 'Verify',

    incorrect_otp: 'Incorrect OTP Entered. Please try again.',
  },

  exceeded_available_attempts: {
    title: '  Exceeded Available Attempts',
    description:
      ' Don’t worry, Your request is already saved in your Tameeni Account, You can access it any time.',
    sub_description:
      'For your security, your access using this CR Owner ({id}) has been temporarily locked for 2 hours due to multiple failed attempts. ',
    send_you_notification_email:
      'We’ll send you a notification email when this CR owner is unlocked.',
    use_different_cr_owner:
      'Also you can use different CR owner and proceed with your purchase.',
    ok_btn: 'Ok',
    Contact_support: 'Contact support for any further inquiries',
  },
  resending_otp: 'Resending OTP',

  mobile_number_id_mismatch: {
    title: ' Mobile Number & ID Mismatch',
    description:
      ' We apologize for the inconvenience, but we cannot proceed in the request as the provided mobile number is not owned by the provided ID/Iqama Number. Kindly provide a mobile number owned by the provided ID/Iqama   Number',
    try_again: '   Try Again',
  },

  verification_service_down: {
    title: 'Verification Service is Down',
    description:
      'We apologize for the inconvenience, but we were not able to proceed in the request as the third party service for verification is currently not available.',
  },

  can_not_proceed: {
    title: ' Sorry, We can not proceed',
    description:
      '  Please make sure to insert the VAT number and select CR Owner to  Proceed',
  },
  exceeded_available_attempts_title:
    'Exceeded Available Attempts, will be available after {time} min',
} as const
