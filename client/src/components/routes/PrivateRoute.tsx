import type { JSX } from 'react';
import { Navigate } from 'react-router-dom';
import { useAppSelector } from '../../hooks/hooks';
import { selectIsLoggedIn, selectIsRefreshing, selectToken } from '../../redux/auth/selectors';
import Loader from '../Loader';

interface PrivateRouteProps {
  component: JSX.Element;
  redirectTo?: string;
}

const PrivateRoute = ({ component, redirectTo = '/' }: PrivateRouteProps) => {
  const isLoggedIn = useAppSelector(selectIsLoggedIn);
  const isRefreshing = useAppSelector(selectIsRefreshing);
  const token = useAppSelector(selectToken);

  if (isRefreshing || (token && !isLoggedIn)) return <Loader />;

  return isLoggedIn ? component : <Navigate to={redirectTo} />;
};

export default PrivateRoute;
