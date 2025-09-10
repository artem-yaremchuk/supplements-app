import RegisterForm from '../components/RegisterForm';
import { Link } from 'react-router-dom';

const RegisterPage = () => {
  return (
    <div className="bg-soft-bg flex justify-center px-6 pt-20 pb-58 sm:pt-34 sm:pb-56">
      <section className="bg-ui-bg w-full max-w-md rounded-lg p-6 shadow-md">
        <h2 className="mb-6 text-center text-2xl font-semibold">Create your account</h2>

        <RegisterForm />
        <div className="text-center">
          <p className="text-secondary-text mt-6 text-sm">Already have an account?</p>
          <Link to="/login" className="text-accent hover:underline">
            Sign in
          </Link>
        </div>
      </section>
    </div>
  );
};

export default RegisterPage;
