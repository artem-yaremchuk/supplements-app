import type { User, AuthResponse } from '../../types/auth';
import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/api';
import { setAuthHeader, clearAuthHeader } from './api';
import axios from 'axios';
import { AUTH_ERROR_MESSAGES } from '../../constants/errors';
import toast from 'react-hot-toast';

interface Credentials {
  name: string;
  email: string;
  password: string;
}

export const registerUser = createAsyncThunk<AuthResponse, Credentials, { rejectValue: string }>(
  'auth/register',
  async (credentials, thunkAPI) => {
    try {
      const response = await api.post('/auth/register', credentials);

      setAuthHeader(response.data.token);

      toast.success(`${credentials.name}, welcome to the Supplements App!`);

      return response.data;
    } catch (e) {
      const errorMessage =
        axios.isAxiosError(e) && e.response?.data?.message
          ? e.response.data.message
          : AUTH_ERROR_MESSAGES.REGISTER_FAILED;

      toast.error(errorMessage);

      return thunkAPI.rejectWithValue(errorMessage);
    }
  },
);

export const login = createAsyncThunk<
  AuthResponse,
  Omit<Credentials, 'name'>,
  { rejectValue: string }
>('auth/login', async (credentials, thunkAPI) => {
  try {
    const response = await api.post('/auth/login', credentials);

    setAuthHeader(response.data.token);

    toast.success('You are now logged in.');

    return response.data;
  } catch (e) {
    const errorMessage =
      axios.isAxiosError(e) && e.response?.data?.message
        ? e.response.data.message
        : AUTH_ERROR_MESSAGES.LOGIN_FAILED;

    toast.error(errorMessage);

    return thunkAPI.rejectWithValue(errorMessage);
  }
});

export const refreshUser = createAsyncThunk<
  User,
  void,
  { state: { auth: { token: string | null } }; rejectValue: string }
>('auth/refreshUser', async (_, thunkAPI) => {
  const state = thunkAPI.getState();
  const token = state.auth.token;

  if (!token) return thunkAPI.rejectWithValue(AUTH_ERROR_MESSAGES.REFRESH_USER_FAILED);

  try {
    setAuthHeader(token);
    const response = await api.get('/auth/profile');
    return response.data;
  } catch (e) {
    const errorMessage =
      axios.isAxiosError(e) && e.response?.data?.message
        ? e.response.data.message
        : AUTH_ERROR_MESSAGES.REFRESH_USER_FAILED;

    return thunkAPI.rejectWithValue(errorMessage);
  }
});

export const logout = createAsyncThunk<void, void, { rejectValue: string }>(
  'auth/logout',
  async (_, thunkAPI) => {
    try {
      await api.post('/auth/logout');

      clearAuthHeader();

      toast.success('You are now logged out.');
    } catch (e) {
      const errorMessage =
        axios.isAxiosError(e) && e.response?.data?.message
          ? e.response.data.message
          : AUTH_ERROR_MESSAGES.LOGOUT_FAILED;

      toast.error(errorMessage);

      return thunkAPI.rejectWithValue(errorMessage);
    }
  },
);
