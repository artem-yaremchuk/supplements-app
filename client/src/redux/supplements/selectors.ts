import type { RootState } from '../store';

export const selectItems = (state: RootState) => state.supplements.items;

export const selectIsLoading = (state: RootState) => state.supplements.isLoading;

export const selectError = (state: RootState) => state.supplements.error;
