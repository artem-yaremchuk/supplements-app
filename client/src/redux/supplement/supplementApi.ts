import { baseApi } from '../api/baseApi';
import type { Supplement } from '../../types/supplement';

export const supplementApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getSupplements: build.query<Supplement[], void>({
      query: () => '/supplements',
      providesTags: (result) =>
        result
          ? [...result.map(({ id }) => ({ type: 'Supplement' as const, id })), 'Supplement']
          : ['Supplement'],
    }),
  }),
});

export const { useGetSupplementsQuery } = supplementApi;
