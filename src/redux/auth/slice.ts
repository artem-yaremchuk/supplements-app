import type { User, AuthResponse } from '../../types/auth';
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { register, login, refreshUser, logout } from './operations';
import { AUTH_ERROR_MESSAGES } from '../../constants/errors';

interface AuthState {
  user: User | null;
  token: string | null;
  isLoggedIn: boolean;
  isRefreshing: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  token: null,
  isLoggedIn: false,
  isRefreshing: false,
  error: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(register.fulfilled, (state: AuthState, action: PayloadAction<AuthResponse>) => {
        state.user = action.payload.user;
        state.token = action.payload.access_token;
        state.isLoggedIn = true;
        state.error = null;
      })
      .addCase(register.rejected, (state: AuthState, action: PayloadAction<string | undefined>) => {
        state.error = action.payload || AUTH_ERROR_MESSAGES.REGISTER_FAILED;
      })
      .addCase(login.fulfilled, (state: AuthState, action: PayloadAction<AuthResponse>) => {
        state.user = action.payload.user;
        state.token = action.payload.access_token;
        state.isLoggedIn = true;
        state.error = null;
      })
      .addCase(login.rejected, (state: AuthState, action: PayloadAction<string | undefined>) => {
        state.error = action.payload || AUTH_ERROR_MESSAGES.LOGIN_FAILED;
      })
      .addCase(refreshUser.pending, (state: AuthState) => {
        state.isRefreshing = true;
      })
      .addCase(refreshUser.fulfilled, (state: AuthState, action: PayloadAction<User>) => {
        state.user = action.payload;
        state.isLoggedIn = true;
        state.isRefreshing = false;
      })
      .addCase(
        refreshUser.rejected,
        (state: AuthState, action: PayloadAction<string | undefined>) => {
          state.error = action.payload || AUTH_ERROR_MESSAGES.REFRESH_USER_FAILED;
          state.isRefreshing = false;
        },
      )
      .addCase(logout.fulfilled, (state: AuthState) => {
        state.user = null;
        state.token = null;
        state.isLoggedIn = false;
        state.error = null;
      })
      .addCase(logout.rejected, (state: AuthState, action: PayloadAction<string | undefined>) => {
        state.error = action.payload || AUTH_ERROR_MESSAGES.LOGOUT_FAILED;
      });
  },
});

export const authReducer = authSlice.reducer;
