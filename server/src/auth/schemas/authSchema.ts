import { z } from 'zod';

export const registerSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, 'Full name must be at least 2 characters')
    .max(50, 'Full name must be no more than 50 characters')
    .describe('Full name of the user')
    .meta({ example: 'John Doe' }),

  email: z
    .email('Invalid email address')
    .max(50, 'Email must be no more than 50 characters')
    .toLowerCase()
    .describe('User email address')
    .meta({ example: 'john.doe@company.com' }),

  password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .max(30, 'Password must be no more than 30 characters')
    .describe('User password')
    .meta({ example: 'SecurePass123!' }),
});

export type RegisterRequest = z.infer<typeof registerSchema>;

export const loginSchema = z.object({
  email: z
    .email('Invalid email address')
    .max(50, 'Email must be no more than 50 characters')
    .toLowerCase()
    .describe('User email address')
    .meta({ example: 'john.doe@company.com' }),

  password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .max(30, 'Password must be no more than 30 characters')
    .describe('User password')
    .meta({ example: 'SecurePass123!' }),
});

export type LoginRequest = z.infer<typeof loginSchema>;
