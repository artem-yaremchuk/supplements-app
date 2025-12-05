export const AUTH_ERROR_MESSAGES = {
  REGISTER_FAILED: 'Registration failed.',
  LOGIN_FAILED: 'Login failed.',
  GOOGLE_LOGIN_FAILED: 'Login with Google failed.',
  REFRESH_USER_FAILED: 'Unable to fetch current user.',
  LOGOUT_FAILED: 'Logout failed. Try again.',
} as const;

export const COMMON_ERROR_MESSAGES = {
  UNKNOWN: 'Unknown server error.',
} as const;
