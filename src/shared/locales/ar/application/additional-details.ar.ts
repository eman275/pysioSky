export default {
  vat_number: {
    label: 'رقم ضريبة القيمة المضافة',
    placeHolder: 'أدخل رقم ضريبة القيمة المضافة',
  },
  select_one_of_cr_title:
    'اختر أحد معرفات مالكي السجل التجاري للتحقق وإكمال الشراء!',
  note: {
    title: 'يرجى ملاحظة: ',
    description:
      'سيتلقى مالك السجل التجاري بالمعرف الذي تختاره رسالة تحتوي على رمز التحقق (OTP) للتحقق والموافقة على الشراء الذي تطلبه',
  },
  cr_owner_mobile_number: {
    title: 'رقم جوال مالك السجل التجاري',
    description:
      'سنرسل رسالة تحتوي على رمز التحقق (OTP) إلى مالك السجل التجاري المحدد (الرقم: {id}) للتحقق والموافقة على الشراء الذي تطلبه.',
    sent_otp: 'تم إرسال رمز التحقق',
  },
  select_another_cr_owner: 'اختر مالك سجل تجاري آخر',
  otp_verification: {
    title: 'التحقق برمز التحقق (OTP)',
    description:
      'لقد أرسلنا رمز التحقق (OTP) المكون من 4 أرقام إلى رقم الهاتف المقدم لمالك السجل التجاري (الرقم: {id}). يرجى التحقق وإدخال الرمز أدناه',
    please_enter_the_otp_number: 'يرجى إدخال رمز التحقق (OTP)',
    enter_the_otp_number: 'أدخل رمز التحقق (OTP)',
    otp_expires_in: 'رمز التحقق ينتهي في',
    otp_expired: 'رمز التحقق منتهي الصلاحية',
    resend_otp: 'إعادة إرسال رمز التحقق',
    verify: 'تحقق',
    incorrect_otp:
      'تم إدخال رمز التحقق (OTP) بشكل غير صحيح. يرجى المحاولة مرة أخرى.',
  },
  exceeded_available_attempts: {
    title: 'تجاوزت المحاولات المتاحة',
    description:
      'لا تقلق، تم حفظ طلبك في حسابك في تأميني، يمكنك الوصول إليه في أي وقت.',
    sub_description:
      'لأمانك، تم قفل الوصول باستخدام هذا مالك السجل التجاري ({id}) مؤقتًا لمدة ساعتين بسبب المحاولات الفاشلة المتعددة.',
    send_you_notification_email:
      'سنرسل لك بريدًا إلكترونيًا عند فتح قفل هذا مالك السجل التجاري.',
    use_different_cr_owner:
      'يمكنك أيضًا استخدام مالك سجل تجاري آخر والمضي قدماً في عملية الشراء.',
    ok_btn: 'موافق',
    Contact_support: 'اتصل بالدعم لأي استفسارات أخرى',
  },
  resending_otp: 'إعادة إرسال رمز التحقق',
  mobile_number_id_mismatch: {
    title: 'عدم تطابق رقم الجوال ورقم الهوية',
    description:
      'نعتذر عن الإزعاج، ولكن لا يمكننا متابعة الطلب لأن رقم الجوال المقدم ليس مملوكًا لرقم الهوية/الإقامة المقدم. يرجى تقديم رقم جوال مملوك لرقم الهوية/الإقامة المقدم.',
    try_again: 'حاول مرة أخرى',
  },

  verification_service_down: {
    title: 'Verification Service is Down',
    description:
      'We apologize for the inconvenience, but we were not able to proceed in the request as the third party service for verification is currently not available.',
  },

  can_not_proceed: {
    title: 'عذرًا، لا يمكننا المتابعة',
    description:
      'يرجى التأكد من إدخال رقم الضريبة على القيمة المضافة واختيار مالك السجل التجاري للمتابعة',
  },
  exceeded_available_attempts_title:
    'تجاوزت عدد المحاولات المتاحة، ستكون متاحة بعد {time} دقيقة',
} as const
