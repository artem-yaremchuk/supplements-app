import { baseApi } from '../api/baseApi';

export const userApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    toggleFavorite: build.mutation<{ message: string }, string>({
      query: (supplementId) => ({
        url: `users/favorites/${supplementId}`,
        method: 'PATCH',
      }),
      invalidatesTags: (_result, _error, supplementId) => [
        { type: 'Supplement', id: supplementId },
      ],
    }),
  }),
});

export const { useToggleFavoriteMutation } = userApi;
