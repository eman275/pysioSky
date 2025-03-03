import {
  EXCEL_UPLOAD_ERROR_CODES,
  TOAST_MESSAGE_ERROR_CODES,
  VEHICLE_ERROR_CODES,
} from '@/shared/lib/constants'

export default {
  title: 'Something went wrong!',
  description: 'The application has encountered an unexpected error.',
  go_homepage: 'Go Homepage',
  try_again: 'Try Again',
  failed_to_load_data: 'Failed to load data!',
  your_request_failed: 'Looks like Your request failed for some reason!',
  unauthorized: 'Unauthorized',
  failed_to_submit: 'failed to submit, please try again!',
  // codes
  toast_errors: {
    [TOAST_MESSAGE_ERROR_CODES.CR_NUMBER]: {
      title: 'Invalid CR number',
      description: ' ',
    },

    [TOAST_MESSAGE_ERROR_CODES.ENTITY_404]: {
      title: 'no entity found',
      description: 'please make sure you entered the right CR number',
    },
    [TOAST_MESSAGE_ERROR_CODES.VEHICLE_IDENTIFIER]: {
      title: 'Request Failed',
      description: 'Vehicle already exist',
    },
    [TOAST_MESSAGE_ERROR_CODES.MANUFACTURE_YEAR]: {
      title: 'Request Failed',
      description: 'ManufactureYear is invalid',
    },

    [TOAST_MESSAGE_ERROR_CODES.ENTITY_301]: {
      title: 'Expired CR number',
      description:
        'Sorry, according to Ministry of Commerce, it seems that your company commercial registration is expired or suspended or canceled. Therefore, we cannot complete your request',
    },

    [TOAST_MESSAGE_ERROR_CODES.NETWORK_ERROR]: {
      title: 'Please, check your connection!',
      description: ' ',
    },
    [TOAST_MESSAGE_ERROR_CODES.VEHICLE_409_DUPLICATE]: {
      title: 'Error: This vehicle already exists',
      description: ' ',
    },
    [TOAST_MESSAGE_ERROR_CODES.VEHICLE_409_MAX]: {
      title: 'Error: Maximum number of vehicles reached.',
      description: ' ',
    },
  } as const,

  vehicle_errors: {
    [VEHICLE_ERROR_CODES.VEHICLE_404]:
      'Error: Vehicle is not found or You are not the owner',

    vehicle_409: 'Undefined Vehicle Error: Vehicle details are not available',
    vehicle_409_sequence: 'Error: This vehicle already has a sequence number',
  } as const,

  excel_errors: {
    // upload errors
    [EXCEL_UPLOAD_ERROR_CODES.FILE_400]:
      'Invalid file format. Only .xlsx, .xls, and .csv files are allowed',
    [EXCEL_UPLOAD_ERROR_CODES.TABLE_400]: 'Missing expected table',
    [EXCEL_UPLOAD_ERROR_CODES.COLUMN_400]: 'Missing expected column',
    [EXCEL_UPLOAD_ERROR_CODES.VEHICLES]: 'Maximum number of vehicles reached.',
    [EXCEL_UPLOAD_ERROR_CODES.ROW_400]:
      'The uploaded file contains empty rows e.g. Row#{rows} Please check the errors mentioned, enter a valid details and upload a new excel sheet',
    [EXCEL_UPLOAD_ERROR_CODES.LINE_400]:
      'The uploaded file contains invalid data e.g. Row#{rows} Please check the errors mentioned, enter a valid details and upload a new excel sheet',
  } as const,
} as const
