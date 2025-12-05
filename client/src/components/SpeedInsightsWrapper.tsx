import { SpeedInsights } from '@vercel/speed-insights/react';

export const SpeedInsightsWrapper = () =>
  import.meta.env.VITE_VERCEL_ENV === 'production' ? <SpeedInsights /> : null;
