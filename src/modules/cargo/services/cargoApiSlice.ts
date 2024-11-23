import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Cargo } from '../types/Cargo';
import { JWT } from '../../../global/utils/jwt';

export const cargoApiSlice = createApi({
  reducerPath: 'cargo',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://192.168.18.5:3001/api',
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
