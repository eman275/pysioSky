export default {
  title: {
    contact_information: 'بيانات التواصل',
    business_work_address: 'بيانات العنوان التجارى',
    business_contact_info: 'بيانات التواصل التجارية',
    preferred_communication_method: 'طريقة الاتصال المفضلة',
  },
  field: {
    mobile_number: 'رقم الجوال',
    landline_number: 'رقم الهاتف الأرضي',
    email_address: 'البريد الإلكتروني',
    country: 'الدولة',
    unit: 'الوحدة',
    building_name: 'اسم المبنى',
    building_number: 'رقم المبنى',
    street: 'الشارع',
    additional_number: 'الرقم الإضافي',
    postal_code: 'الرمز البريدي',
    district: 'الحي',
    city: 'المدينة',
    po_box: 'صندوق البريد',
    fax: 'الفاكس',
    preferred_mailing_address: 'عنوان المراسلة المفضل',
    preferred_language: 'اللغة المفضلة',
    relationship: 'صلة القرابة مع المشمول بالتغطية',
    share_percentage: 'نسبة المشاركة',
    contact_details: 'بيانات الاتصال',
  },
  applicant_contact_disclaimer:
    'اقر بأن لدي جنسية واحدة وهي {nationality}. وليس لدي أي جنسية أخرى',
  saudi: 'سعودي',
  beneficiaries: {
    beneficiary: 'المستفيد',
    legal_hairs: 'المستفيدين الشرعيين',
    deletion_title:
      'هل أنت متأكد من رغبتك في حذف {beneficiaryName} من قائمة المستفيدين الرئيسيين؟',
    remove_beneficiary: 'حذف المستفيد ',
    main_beneficiary: 'المستفيد الأساسي',
    update_beneficiary: 'تحديث بيانات {beneficiaryName}',

    beneficiary_action: 'حفظ بيانات المستفيد',
    add_main_beneficiary: 'أضف مستفيد أساسي',
    who_main_beneficiary: 'من هو المستفيد الأساسي؟',
    main_beneficiary_description:
      'هو الشخص الذي سيستفيد من التأمين في حالة وفاة المشمول بالتغطية. يتلقى المستفيد الأساسي الفوائد المالية المتعلقة بالتأمين في حالة وفاة المشمول بالتغطية. يمكن إضافة أكثر من مستفيد أساسي.',
    main_beneficiary_action: 'إضافة مستفيد أساسي',
    applicant_beneficiaries_disclaimer:
      'لا أرغب في إضافة مستفيدين محددين. سيكون الورثة الشرعيين هم المستفيدين',
    beneficiary_alert:
      'لا يمكنك إضافة هذا المستفيد لأن علاقته بالمشمول بالتغطية هي {relationship}. {productName} يسمح بإضافة مستفيدين بالعلاقات التالية فقط: {beneficiaries}',
    share_percentage: 'مشاركة النسبة',
    failed_to_load_beneficiaries: 'فشل في تحميل المستفيدين',
    percentage_max_error: 'لا يمكن أن يزيد مجموع نسبة المشاركة عن 100%',
    percentage_min_error: 'لا يمكن أن يقل مجموع نسبة المشاركة عن 100%',
    legal_hairs_declaimer_error:
      'يرجى تحديد هذا الخيار أو إضافة مستفيدين للمتابعة',
  },
} as const
