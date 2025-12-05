import GoogleAuthButton from '@/components/GoogleAuthButton';
import LoginForm from '../components/LoginForm';
import { Link } from 'react-router-dom';
import Divider from '@/components/Divider';

const LoginPage = () => {
  return (
    <div className="bg-soft-bg flex justify-center px-6 pt-18 pb-60 sm:pt-28 sm:pb-63">
      <section className="bg-ui-bg w-full max-w-md rounded-lg p-6 shadow-md">
        <h2 className="mb-6 text-center text-2xl font-semibold">Welcome back!</h2>

        <GoogleAuthButton label="Sign in with Google" />

        <Divider />

        <LoginForm />
        <div className="text-center">
          <p className="text-secondary-text mt-6 text-sm">Don't have an account?</p>
          <Link to="/signup" className="text-accent hover:underline">
            Create one for free!
          </Link>
        </div>
      </section>
    </div>
  );
};

export default LoginPage;
