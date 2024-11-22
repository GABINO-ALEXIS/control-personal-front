import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Cargo } from '../types/Cargo';

export const cargoApiSlice = createApi({
  reducerPath: 'cargo',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://192.168.18.5:3001/api',
    prepareHeaders: (headers) => {
      const token =
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3MmQ3ZWVkOGRhMzI1YjFjMzYzM2RmMiIsImlhdCI6MTczMjIwNzE2NSwiZXhwIjoxNzMyMjkzNTY1fQ.cvpLFzinsZLS1CIoonQjeF0wewfbMZRHjfVz8PoEdOg';
      if (token) headers.set('Authorization', `Bearer ${token}`);
      return headers;
    },
  }),

  endpoints: (builder) => ({
    getCargos: builder.query<Cargo[], {}>({
      query: () => 'cargos',
    }),
    // createCargo: builder.mutation<Cargo, Omit<Cargo, 'id'>>({}),
  }),
});

export const { useGetCargosQuery } = cargoApiSlice;
