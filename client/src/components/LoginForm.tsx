import { useState } from 'react';
import { useAppDispatch } from '../hooks/hooks';
import { useForm } from 'react-hook-form';
import type { SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema } from '../schemas/authSchema.ts';
import type { LoginFormValues } from '../schemas/authSchema.ts';
import { login } from '../redux/auth/operations.ts';

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit: SubmitHandler<LoginFormValues> = (data) => {
    dispatch(login(data));
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
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
            autoComplete="current-password"
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

      <button
        type="submit"
        className="bg-btn-bg hover:bg-btn-bg-hover w-full rounded px-4 py-2 text-center text-white transition-colors"
      >
        Login
      </button>
    </form>
  );
};

export default LoginForm;
