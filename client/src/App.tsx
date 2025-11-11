import { lazy, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from './hooks/hooks';
import { selectIsRefreshing, selectToken } from './redux/auth/selectors';
import { refreshUser } from './redux/auth/operations';
import { Route, Routes, Navigate, useLocation } from 'react-router-dom';
import { useTheme } from './context/ThemeContext';
import Layout from './components/layout/Layout';
import Loader from './components/Loader';
import PrivateRoute from './components/routes/PrivateRoute';
import RestrictedRoute from './components/routes/RestrictedRoute';

const HomePage = lazy(() => import('./pages/HomePage'));
const SupplementsPage = lazy(() => import('./pages/SupplementsPage'));
const SupplementDetailsPage = lazy(() => import('./pages/SupplementDetailsPage'));
const SupplementDetailsModal = lazy(() => import('./components/SupplementDetailsModal'));
const RegisterPage = lazy(() => import('./pages/RegisterPage'));
const LoginPage = lazy(() => import('./pages/LoginPage'));
const FavoritesPage = lazy(() => import('./pages/FavoritesPage'));

const App = () => {
  const dispatch = useAppDispatch();
  const isRefreshing = useAppSelector(selectIsRefreshing);
  const token = useAppSelector(selectToken);

  useEffect(() => {
    if (token) dispatch(refreshUser());
  }, [dispatch, token]);

  const location = useLocation();

  const state = location.state as { background: Location };
  const backgroundLocation = state?.background;

  const { theme } = useTheme();

  if (isRefreshing) return <Loader />;

  return (
    <div className={theme}>
      <Routes location={backgroundLocation || location}>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="supplements" element={<SupplementsPage />} />
          <Route path="supplements/:id" element={<SupplementDetailsPage />} />
          <Route
            path="signup"
            element={<RestrictedRoute component={<RegisterPage />} redirectTo="/" />}
          />
          <Route
            path="login"
            element={<RestrictedRoute component={<LoginPage />} redirectTo="/" />}
          />
          <Route
            path="favorites"
            element={<PrivateRoute component={<FavoritesPage />} redirectTo="/" />}
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>

      {backgroundLocation && (
        <Routes>
          <Route path="/supplements/:id" element={<SupplementDetailsModal />} />
          <Route path="/favorites/:id" element={<SupplementDetailsModal />} />
        </Routes>
      )}
    </div>
  );
};

export default App;
