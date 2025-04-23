export const API_ROUTES = {
  AUTH: {
    SIGNUP: '/api/auth/signup',
    ME: '/api/auth/me',
  },
  BUSINESS: {
    ALL: '/api/allBusinesses',
    DEMANDS: '/api/getbusinessesDemandsFullList',
  },
  GUILD: {
    ALL: '/api/getGuilds',
  },
  BUG: '/api/bug',
  UPLOAD: '/api/uploadImg',
};

export const COOKIE_NAMES = {
  TOKEN: 'token',
};

export const IMAGE_PATHS = {
  AVATARS: '/api/images/avatars',
  HEADERS: '/api/images/headers',
};

export const ROUTES = {
  HOME: '/',
  WELCOME: '/w',
  CREATE_BUSINESS: '/CB',
  BUG: '/bug',
};

export const VALIDATION = {
  BUSINESS_NAME: {
    MIN_LENGTH: 3,
    PATTERN: /^[A-Za-z\-_.]+$/,
  },
};

export const DATE_FORMATS = {
  SHORT: 'YYYY/MM/DD',
  LONG: 'YYYY/MM/DD HH:mm',
};

export const ERROR_MESSAGES = {
  AUTH: {
    UNAUTHORIZED: 'دسترسی غیر مجاز',
    INVALID_TOKEN: 'توکن نامعتبر است',
  },
  BUSINESS: {
    NAME_REQUIRED: 'نام کسب و کار الزامی است',
    NAME_INVALID: 'نام کسب و کار باید فقط شامل حروف انگلیسی باشد',
    NAME_TOO_SHORT: 'نام کسب و کار باید بیشتر از 3 حرف باشد',
  },
  GENERAL: {
    SERVER_ERROR: 'خطای سرور',
    NETWORK_ERROR: 'خطای شبکه',
  },
}; 