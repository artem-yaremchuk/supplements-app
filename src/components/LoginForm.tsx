import { useDispatch } from 'react-redux';
import type { AppDispatch } from '../redux/store.ts';
import { useForm } from 'react-hook-form';
import type { SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema } from '../schemas/authSchema.ts';
import type { LoginFormValues } from '../schemas/authSchema.ts';
import { login } from '../redux/auth/operations.ts';

const LoginForm = () => {
  const dispatch = useDispatch<AppDispatch>();

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
        <input
          {...register('password')}
          placeholder="Password"
          type="password"
          autoComplete="new-password"
          className="border-ui-border bg-ui-bg text-input-text focus-visible:border-focus w-full rounded border px-4 py-2 transition-colors outline-none"
        />
        {errors.password && <p className="text-errors-text text-sm">{errors.password.message}</p>}
      </div>

      <button
        type="submit"
        className="bg-link-bg hover:bg-link-bg-hover w-full rounded px-4 py-2 text-center text-white transition-colors"
      >
        Login
      </button>
    </form>
  );
};

export default LoginForm;
