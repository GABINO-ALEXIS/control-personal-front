import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Empleado } from '../types/Empleado';

export const empleadoApiSlice = createApi({
  reducerPath: 'empleado',
  baseQuery: fetchBaseQuery({
    // baseUrl: 'http://192.168.18.13:3001/api',
    baseUrl: 'http://192.168.18.5:3001/api',
    prepareHeaders: (headers, { getState }) => {
      const token =
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3MmQ3ZWVkOGRhMzI1YjFjMzYzM2RmMiIsImlhdCI6MTczMTQxOTg0MSwiZXhwIjoxNzMxNTA2MjQxfQ.vZB3FLg3A7UJSy9k7K8EbpCbGvdgwPTeypMDpvebi6U';
      if (token) headers.set('Authorization', `Bearer ${token}`);
      return headers;
    },
  }),

  endpoints: (builder) => ({
    getEmpleados: builder.query<Empleado[], {}>({
      query: () => 'empleados/?populate=true',
    }),
    getEmpleadoById: builder.query<Empleado, { id: string }>({
      query: ({ id }) => `empleados/${id}/?populate=true`,
    }),
    deleteEmpleado: builder.query<Empleado, { id: string }>({
      query: ({ id }) => `empleados/${id}`,
    }),
  }),
  refetchOnReconnect: true,
  keepUnusedDataFor: 86400,
});

export const {
  useGetEmpleadosQuery,
  useGetEmpleadoByIdQuery,
  useDeleteEmpleadoQuery,
} = empleadoApiSlice;
