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
import { SpeedInsightsWrapper } from './components/SpeedInsightsWrapper.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <ThemeProvider>
        <PersistGate loading={<Loader />} persistor={persistor}>
          <BrowserRouter>
            <App />
            <SpeedInsightsWrapper />
          </BrowserRouter>
        </PersistGate>
      </ThemeProvider>
    </Provider>
  </StrictMode>,
);
