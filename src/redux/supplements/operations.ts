import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import type { Supplement } from '../../types/supplements';
import toast from 'react-hot-toast';

axios.defaults.baseURL = 'https://f6084644-e458-4a55-9311-3f2f03bb63f6.mock.pstmn.io';

export const fetchSupplements = createAsyncThunk<Supplement[], void, { rejectValue: string }>(
  'supplements/fetchAll',
  async (_, thunkAPI) => {
    try {
      const response = await axios.get('/supplements');
      return response.data;
    } catch (e) {
      const errorMessage =
        axios.isAxiosError(e) && e.response?.data?.message
          ? e.response.data.message
          : 'Unknown server error';

      toast.error(errorMessage);

      return thunkAPI.rejectWithValue(errorMessage);
    }
  },
);
