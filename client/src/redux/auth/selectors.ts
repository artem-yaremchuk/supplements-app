import type { RootState } from '../store';

export const selectUser = (state: RootState) => state.auth.user;

export const selectToken = (state: RootState) => state.auth.token;

export const selectIsLoggedIn = (state: RootState) => state.auth.isLoggedIn;

export const selectIsRefreshing = (state: RootState) => state.auth.isRefreshing;
