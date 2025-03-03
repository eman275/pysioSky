export default {
  summary: {
    policy_summary: 'ملخص الوثيقة',
    benefeciaries: 'المستفيدين',
    payment_details: 'تفاصيل الدفع',
    fleet_details: 'تفاصيل الأسطول',
    policy_details: 'تفاصيل الوثيقة',
    policy_holder_details: 'تفاصيل حامل الوثيقة',
    sum_covered: 'مبلغ الحماية',
    targeted_maturity_amount: 'مبلغ الاستحقاق',
    contribution: 'قيمة الاشتراك',
    insurance_period: 'مدة التأمين',
    benefits: 'المنافع',
    legal_heirs: 'الورثة الشرعيين',
    phone_verification: {
      title: 'رقم الجوال هذا ليس ملكًا لك!',
      description:
        'من خلال مراجعة بياناتك، فأنت لست مالك رقم الجوال هذا {mobile}، يرجى إدخال رقم الجوال الذي تملكه.',
      alert: 'رقم الجوال الذي قمت بإدخاله ليس ملكك، يرجى إدخال رقم آخر تملكه!',
    },
  },
  iban_number: 'رقم الآيبان الدولي',
  payment_method: 'وسيلة الدفع',
  payment_day: 'يوم الدفع',
  select_payment_method: 'اختر طريقة الدفع',
  select_payment_avaliability: '(يتوفر الدفع بالبطاقة فقط)',
  select_payment_method_second_line:
    'سيتم خصم هذه الدفعة تلقائيًا من حسابك لجميع الفواتير القادمة',
  payment_note: 'سيتم إخطارك قبل كل دفعة',
  payment_cards: {
    mada: 'مدى',
    credit_card: 'بطاقة الخصم/الائتمان',
    sadad_payment: 'دفع سداد',
  },
  disclaimer: {
    disclaimer_1: 'أقبل كل ما يلي',
    disclaimer_2: 'سيتم حفظ رقم الآيبان الدولي مع حامل البوليصة في حسابك',
    disclaimer_3: 'أوافق على ',
    terms_conditions: 'الشروط والأحكام',
  },
  aside: {
    summary_details: 'ملخص الدفع',
    including_taxes: 'تشمل الضرائب والمصروفات',
    policy_price_amount: 'مبلغ سعر الوثيقة',
    base_premium: 'القسط الأساسي',
    vAT: '({percentage}%)ضريبة القيمة المضافة',
    payment_summary: 'ملخص الدفع',
  },
  contract: {
    required_signature: 'التوقيعات المطلوبة',
    sign_now: 'وقع الآن',
    otp_required: 'ملاحظة: مطلوب OTP للمتابعة',
    pay_now: 'ادفع الآن',
  },
  otp: {
    otp_verification: 'التحقق عن طريق OTP',
    otp_description:
      'لقد أرسلنا 4 أرقام إلى رقم جوال مقدم الطلب، يرجى التحقق من ذلك وإدخاله',
    otp_label: 'أدخل رقم OTP',
    ends_in: 'تنتهي في',
  },
  policy_holder_details: {
    company_name: 'اسم الشركة',
    cr_expiry_date: 'تاريخ انتهاء السجل التجاري',
    cr_number: 'رقم السجل التجاري',
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
  policy_total_price: 'إجمالي سعر الوثيقة',
  repair_type: 'نوع الإصلاح',
  comp_vehicles: 'COMP Vehicles',
  tpl_vehicles: 'TPL Vehicles',
  proceed_to_payment: 'تابع إلى الدفع',
  policy_effective_date: 'تاريخ سريان الوثيقة:',
  till_date: 'حتى تاريخ:',
  workShop: 'ورشة العمل',
  agency: 'الوكالة',
  payment_failed:
    'There is a problem in proceeding your payment, please try again.',
  payment_processing: 'Payment is processing',
} as const
