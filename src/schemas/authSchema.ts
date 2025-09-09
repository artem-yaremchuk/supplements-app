import { z } from 'zod';

export const registerSchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(2, 'Full name must be at least 2 characters')
      .max(50, 'Full name must be no more than 50 characters'),

    email: z
      .email('Invalid email address')
      .max(50, 'Email must be no more than 50 characters')
      .toLowerCase(),

    password: z
      .string()
      .min(8, 'Password must be at least 8 characters')
      .max(30, 'Password must be no more than 30 characters'),

    confirmPassword: z
      .string()
      .min(8, 'Confirm password must be at least 8 characters')
      .max(30, 'Confirm password must be no more than 30 characters'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: 'Passwords do not match',
  });

export type RegisterFormValues = z.infer<typeof registerSchema>;

export const loginSchema = z.object({
  email: z
    .email('Invalid email address')
    .max(50, 'Email must be no more than 50 characters')
    .toLowerCase(),

  password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .max(30, 'Password must be no more than 30 characters'),
});

export type LoginFormValues = z.infer<typeof loginSchema>;
