import { createRoot } from 'react-dom/client';
import { StrictMode } from 'react';
import { Provider } from 'react-redux';
import { store, persistor } from './redux/store.ts';
import { ThemeProvider } from './context/ThemeContext.tsx';
import { PersistGate } from 'redux-persist/integration/react';
import Loader from './components/Loader.tsx';
import { BrowserRouter } from 'react-router';
import App from './App.tsx';
import './index.css';
import { SpeedInsights } from '@vercel/speed-insights/react';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <ThemeProvider>
        <PersistGate loading={<Loader />} persistor={persistor}>
          <BrowserRouter>
            <App />
            {import.meta.env.VITE_VERCEL_ENV === 'production' && <SpeedInsights />}
          </BrowserRouter>
        </PersistGate>
      </ThemeProvider>
    </Provider>
  </StrictMode>,
);
