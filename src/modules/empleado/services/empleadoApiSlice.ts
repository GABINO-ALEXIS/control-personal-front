import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Empleado } from '../types/Empleado';

export const empleadoApiSlice = createApi({
  reducerPath: 'empleado',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://192.168.18.5:3001/api',
    prepareHeaders: (headers, { getState }) => {
      const token =
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3MmQ3ZWVkOGRhMzI1YjFjMzYzM2RmMiIsImlhdCI6MTczMTE4NTM5MiwiZXhwIjoxNzMxMTk5NzkyfQ.gde_KV3aRwiKX5ch4VIaNrciaqQhr2ipO-ABD6cBT9g';
      if (token) headers.set('Authorization', `Bearer ${token}`);
      return headers;
    },
  }),

  endpoints: (builder) => ({
    getEmpleados: builder.query<Empleado[], {}>({
      query: () => 'empleados/?populate=true',
    }),
    getEmpleadoById: builder.query<Empleado, { id: string }>({
      query: ({ id }) => `empleados/${id}`,
    }),
  }),
  refetchOnReconnect: true,
  keepUnusedDataFor: 86400,
});

export const { useGetEmpleadosQuery, useGetEmpleadoByIdQuery } =
  empleadoApiSlice;
