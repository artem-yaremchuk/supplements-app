import type { Supplement } from '../../types/supplements';
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { fetchSupplements } from './operations';
import { COMMON_ERROR_MESSAGES } from '../../constants/errors';

interface SupplementsState {
  items: Supplement[];
  total: number;
  isLoading: boolean;
  error: string | null;
}

const initialState: SupplementsState = {
  items: [],
  total: 0,
  isLoading: false,
  error: null,
};

const handlePending = (state: SupplementsState) => {
  state.isLoading = true;
};

const handleRejected = (state: SupplementsState, action: PayloadAction<string | undefined>) => {
  state.isLoading = false;
  state.error = action.payload || COMMON_ERROR_MESSAGES.UNKNOWN;
};

const supplementsSlice = createSlice({
  name: 'supplements',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSupplements.pending, handlePending)
      .addCase(fetchSupplements.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.items = action.payload;
        state.total = action.payload.length;
      })
      .addCase(fetchSupplements.rejected, handleRejected);
  },
});

export const supplementsReducer = supplementsSlice.reducer;
