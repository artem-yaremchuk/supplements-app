import { lazy } from 'react';
import { Route, Routes, Navigate, useLocation } from 'react-router-dom';
import { useTheme } from './context/ThemeContext';
import Layout from './components/layout/Layout';
import PrivateRoute from './components/routes/PrivateRoute';

const HomePage = lazy(() => import('./pages/HomePage'));
const SupplementsPage = lazy(() => import('./pages/SupplementsPage'));
const SupplementDetailsPage = lazy(() => import('./pages/SupplementDetailsPage'));
const SupplementDetailsModal = lazy(() => import('./components/SupplementDetailsModal'));
const SavedPage = lazy(() => import('./pages/SavedPage'));

const App = () => {
  const location = useLocation();

  const state = location.state as { background: Location };
  const backgroundLocation = state?.background;

  const { theme } = useTheme();

  return (
    <div className={theme}>
      <Routes location={backgroundLocation || location}>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="supplements" element={<SupplementsPage />} />
          <Route path="supplements/:id" element={<SupplementDetailsPage />} />
          <Route
            path="saved"
            element={
              <PrivateRoute>
                <SavedPage />
              </PrivateRoute>
            }
          />
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
