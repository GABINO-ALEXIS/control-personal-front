import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Cargo } from '../types/Cargo';
import { JWT } from '../../../global/utils/jwt';
import { CONNECTION } from '../../../global/utils/connection';

export const cargoApiSlice = createApi({
  reducerPath: 'cargo',
  baseQuery: fetchBaseQuery({
    baseUrl: CONNECTION,
    prepareHeaders: (headers) => {
      const token = JWT;
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
