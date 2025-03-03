import {
  EXCEL_UPLOAD_ERROR_CODES,
  TOAST_MESSAGE_ERROR_CODES,
  VEHICLE_ERROR_CODES,
} from '@/shared/lib/constants'

export default {
  title: 'هناك خطأ ما!',
  description: 'حدث خطأ غير متوقع في التطبيق',
  go_homepage: 'الذهاب للصفحة الرئيسية',
  try_again: 'إعادة المحاولة',
  failed_to_load_data: 'فشل في تحميل البيانات!',
  your_request_failed: 'يبدو أن طلبك فشل لسبب ما!',
  unauthorized: 'غير مصرح',
  failed_to_submit: 'فشل في الإرسال، يرجى المحاولة مرة أخرى!',

  // codes
  toast_errors: {
    [TOAST_MESSAGE_ERROR_CODES.CR_NUMBER]: {
      title: 'رقم موحد / رقم الحاسب الآلي غير صالح',
      description: ' ',
    },

    [TOAST_MESSAGE_ERROR_CODES.ENTITY_404]: {
      title: 'لم يتم العثور على الشركة',
      description: 'يرجى التأكد من إدخال الرقم الموحد الصحيح',
    },
    [TOAST_MESSAGE_ERROR_CODES.VEHICLE_IDENTIFIER]: {
      title: 'فشل الطلب',
      description: 'المركبة موجودة بالفعل',
    },
    [TOAST_MESSAGE_ERROR_CODES.MANUFACTURE_YEAR]: {
      title: 'فشل الطلب',
      description: 'سنة التصنيع غير صالحة',
    },

    [TOAST_MESSAGE_ERROR_CODES.ENTITY_301]: {
      title: 'انتهت صلاحية رقم التسجيل',
      description:
        'نعتذر، وفقا لوزارة التجارة يتضح أن رقم السجل التجاري الخاص بمنشأتك انتهت صلاحيته أو متوقف أو تم إلغاؤه. لذلك، لا نستطيع استكمال طلبك.',
    },

    [TOAST_MESSAGE_ERROR_CODES.NETWORK_ERROR]: {
      title: 'يرجى التحقق من الاتصال!',
      description: ' ',
    },
    [TOAST_MESSAGE_ERROR_CODES.VEHICLE_409_DUPLICATE]: {
      title: 'المركبة موجودة بالفعل',
      description: ' ',
    },
    [TOAST_MESSAGE_ERROR_CODES.VEHICLE_409_MAX]: {
      title: 'تم الوصول إلى الحد الأقصى لعدد المركبات.',
      description: ' ',
    },
  } as const,

  vehicle_errors: {
    [VEHICLE_ERROR_CODES.VEHICLE_404]:
      'المركبة غير موجودة أو ليست تحت ملكية المستخدم المحدد.',
    vehicle_409: 'خطأ غير محدد في المركبة: تفاصيل المركبة غير متاحة',
    vehicle_409_sequence: 'خطأ: هذه المركبة لديها رقم تسلسل بالفعل',
  } as const,

  excel_errors: {
    // upload errors
    [EXCEL_UPLOAD_ERROR_CODES.FILE_400]:
      'تنسيق الملف المرفوع غير مدعوم، يرجى التأكد من استخدام تنسيق ملف XLS أو XLSX. ',
    [EXCEL_UPLOAD_ERROR_CODES.TABLE_400]: 'الجدول المتوقع مفقود',
    [EXCEL_UPLOAD_ERROR_CODES.COLUMN_400]: 'العمود المتوقع مفقود',
    [EXCEL_UPLOAD_ERROR_CODES.VEHICLES]:
      'تم الوصول إلى الحد الأقصى لعدد المركبات.',
    [EXCEL_UPLOAD_ERROR_CODES.ROW_400]:
      'الملف المرفوع يحتوي على صفوف فارغة مثل الصف رقم#{rows}. يرجى التحقق من الأخطاء المذكورة، إدخال تفاصيل صحيحة ورفع ملف إكسل جديد.',
    [EXCEL_UPLOAD_ERROR_CODES.LINE_400]:
      'الملف المرفوع يحتوي على بيانات غير صالحة مثل الصف رقم#{rows}. يرجى التحقق من الأخطاء المذكورة، إدخال تفاصيل صحيحة ورفع ملف إكسل جديد.',
  },
} as const
