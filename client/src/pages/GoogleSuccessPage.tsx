import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Loader from '../components/Loader';
import { useAppDispatch } from '@/hooks/hooks';
import { googleVerify } from '@/redux/auth/operations';

const GoogleSuccessPage = () => {
  const [searchParams] = useSearchParams();
  const code = searchParams.get('code');

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const verify = async () => {
      if (!code) {
        navigate('/login', { replace: true });
        return;
      }

      try {
        await dispatch(googleVerify(code)).unwrap();
        navigate('/', { replace: true });
      } catch {
        navigate('/login', { replace: true });
      }
    };

    verify();
  }, [code, dispatch, navigate]);

  return (
    <div className="bg-soft-bg flex items-center justify-center">
      <Loader />
    </div>
  );
};

export default GoogleSuccessPage;
