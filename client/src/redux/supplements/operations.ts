import { createAsyncThunk } from '@reduxjs/toolkit';
import type { Supplement } from '../../types/supplements';
import api from '../../services/api';
import axios from 'axios';
import { COMMON_ERROR_MESSAGES } from '../../constants/errors';

export const fetchSupplements = createAsyncThunk<Supplement[], void, { rejectValue: string }>(
  'supplements/fetchAll',
  async (_, thunkAPI) => {
    try {
      const response = await api.get('/supplements');
      return response.data;
    } catch (e) {
      const errorMessage =
        axios.isAxiosError(e) && e.response?.data?.message
          ? e.response.data.message
          : COMMON_ERROR_MESSAGES.UNKNOWN;

      return thunkAPI.rejectWithValue(errorMessage);
    }
  },
);
