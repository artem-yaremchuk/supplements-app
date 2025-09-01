import { configureStore } from '@reduxjs/toolkit';
import { supplementsReducer } from './supplements/slice';

export const store = configureStore({
  reducer: {
    supplements: supplementsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
