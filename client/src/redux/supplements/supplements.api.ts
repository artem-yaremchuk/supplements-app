import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { Supplement } from '@/types/supplements';

const apiUrl = import.meta.env.VITE_API_URL;

export const supplementsApi = createApi({
  reducerPath: 'supplementsApi',
  baseQuery: fetchBaseQuery({ baseUrl: apiUrl }),
  tagTypes: ['Supplements'],
  endpoints: (build) => ({
    getSupplements: build.query<Supplement[], void>({
      query: () => '/supplements',
      providesTags: ['Supplements'],
    }),
  }),
});

export const { useGetSupplementsQuery } = supplementsApi;
