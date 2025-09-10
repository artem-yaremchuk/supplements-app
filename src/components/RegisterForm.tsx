import { useState } from 'react';
import { useDispatch } from 'react-redux';
import type { AppDispatch } from '../redux/store.ts';
import { useForm } from 'react-hook-form';
import type { SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { registerSchema } from '../schemas/authSchema.ts';
import type { RegisterFormValues } from '../schemas/authSchema.ts';
import { registerUser } from '../redux/auth/operations.ts';

const RegisterForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const dispatch = useDispatch<AppDispatch>();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit: SubmitHandler<RegisterFormValues> = (data) => {
    const userData = {
      name: data.name,
      email: data.email,
      password: data.password,
    };

    dispatch(registerUser(userData));
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <div className="flex flex-col gap-1">
        <input
          {...register('name')}
          placeholder="Full Name"
          type="text"
          autoComplete="name"
          className="border-ui-border bg-ui-bg text-input-text focus-visible:border-focus w-full rounded border px-4 py-2 transition-colors outline-none"
        />
        {errors.name && <p className="text-errors-text text-sm">{errors.name.message}</p>}
      </div>

      <div className="flex flex-col gap-1">
        <input
          {...register('email')}
          placeholder="Email"
          type="email"
          autoComplete="email"
          className="border-ui-border bg-ui-bg text-input-text focus-visible:border-focus w-full rounded border px-4 py-2 transition-colors outline-none"
        />
        {errors.email && <p className="text-errors-text text-sm">{errors.email.message}</p>}
      </div>

      <div className="flex flex-col gap-1">
        <div className="relative">
          <input
            {...register('password')}
            placeholder="Password"
            type={showPassword ? 'text' : 'password'}
            autoComplete="new-password"
            className="border-ui-border bg-ui-bg text-input-text focus-visible:border-focus w-full rounded border py-2 pr-14 pl-4 transition-colors outline-none"
          />

          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="text-btn-bg hover:text-btn-bg-hover absolute top-1/2 right-3 -translate-y-1/2 text-xs font-semibold"
          >
            {showPassword ? 'HIDE' : 'SHOW'}
          </button>
        </div>

        {errors.password && <p className="text-errors-text text-sm">{errors.password.message}</p>}
      </div>

      <div className="flex flex-col gap-1">
        <div className="relative">
          <input
            {...register('confirmPassword')}
            placeholder="Confirm Password"
            type={showPassword ? 'text' : 'password'}
            autoComplete="new-password"
            className="border-ui-border bg-ui-bg text-input-text focus-visible:border-focus w-full rounded border px-4 py-2 transition-colors outline-none"
          />

          <button
            type="button"
            onClick={() => setShowConfirmPassword((prev) => !prev)}
            className="text-btn-bg hover:text-btn-bg-hover absolute top-1/2 right-3 -translate-y-1/2 text-xs font-semibold"
          >
            {showConfirmPassword ? 'HIDE' : 'SHOW'}
          </button>
        </div>

        {errors.confirmPassword && (
          <p className="text-errors-text text-sm">{errors.confirmPassword.message}</p>
        )}
      </div>

      <button
        type="submit"
        className="bg-btn-bg hover:bg-btn-bg-hover w-full rounded px-4 py-2 text-center text-white transition-colors"
      >
        Create a free account
      </button>
    </form>
  );
};

export default RegisterForm;
