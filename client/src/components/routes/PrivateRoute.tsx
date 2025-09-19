import type { JSX } from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectIsLoggedIn, selectIsRefreshing, selectToken } from '../../redux/auth/selectors';
import Loader from '../Loader';

interface PrivateRouteProps {
  component: JSX.Element;
  redirectTo?: string;
}

const PrivateRoute = ({ component, redirectTo = '/' }: PrivateRouteProps) => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const isRefreshing = useSelector(selectIsRefreshing);
  const token = useSelector(selectToken);

  if (isRefreshing || (token && !isLoggedIn)) return <Loader />;

  return isLoggedIn ? component : <Navigate to={redirectTo} />;
};

export default PrivateRoute;
