export const VALIDATION_MESSAGES = {
  EMAIL: {
    INVALID: 'Please enter a valid email address',
    MAX_LENGTH: 'Email must be no more 50 characters long',
  },
  NAME: {
    MIN_LENGTH: 'Name must be at least 2 characters long',
    MAX_LENGTH: 'Name must be no more 50 characters long',
  },
  PASSWORD: {
    MIN_LENGTH: 'Password must be at least 8 characters long',
    MAX_LENGTH: 'Password must be no more 30 characters long',
  },
  REQUIRED: 'This field is required',
  STRING: 'This field must be a string',
} as const;
