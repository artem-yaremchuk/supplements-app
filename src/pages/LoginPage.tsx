import LoginForm from '../components/LoginForm';
import { Link } from 'react-router-dom';

const LoginPage = () => {
  return (
    <main>
      <div className="bg-soft-bg flex justify-center px-6 pt-20 pb-60 sm:pt-34 sm:pb-63">
        <section className="bg-ui-bg w-full max-w-md rounded-lg p-6 shadow-md">
          <h2 className="mb-6 text-center text-2xl font-semibold">Welcome back!</h2>

          <LoginForm />
          <div className="text-center">
            <p className="text-secondary-text mt-6 text-sm">Don't have an account?</p>
            <Link to="/signup" className="text-accent hover:underline">
              Create one for free!
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
};

export default LoginPage;
