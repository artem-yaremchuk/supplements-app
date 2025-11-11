import type { JSX } from 'react';
import { Navigate } from 'react-router-dom';
import { useAppSelector } from '../../hooks/hooks';
import { selectIsLoggedIn } from '../../redux/auth/selectors';

interface RestrictedRouteProps {
  component: JSX.Element;
  redirectTo?: string;
}

const RestrictedRoute = ({ component, redirectTo = '/' }: RestrictedRouteProps) => {
  const isLoggedIn = useAppSelector(selectIsLoggedIn);

  return isLoggedIn ? <Navigate to={redirectTo} /> : component;
};

export default RestrictedRoute;
