import { lazy, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch } from './redux/store';
import { selectIsRefreshing } from './redux/auth/selectors';
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
const SavedPage = lazy(() => import('./pages/SavedPage'));

const App = () => {
  const dispatch = useDispatch<AppDispatch>();
  const isRefreshing = useSelector(selectIsRefreshing);

  useEffect(() => {
    dispatch(refreshUser());
  }, [dispatch]);

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
          <Route path="saved" element={<PrivateRoute component={<SavedPage />} redirectTo="/" />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>

      {backgroundLocation && (
        <Routes>
          <Route path="/supplements/:id" element={<SupplementDetailsModal />} />
        </Routes>
      )}
    </div>
  );
};

export default App;
