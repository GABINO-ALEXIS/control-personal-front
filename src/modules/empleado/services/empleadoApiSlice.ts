import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Empleado } from '../types/Empleado';

export const empleadoApiSlice = createApi({
  reducerPath: 'empleado',
  baseQuery: fetchBaseQuery({
    // baseUrl: 'http://192.168.18.13:3001/api',
    baseUrl: 'http://192.168.18.5:3001/api',
    prepareHeaders: (headers, { getState }) => {
      const token =
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3MmQ3ZWVkOGRhMzI1YjFjMzYzM2RmMiIsImlhdCI6MTczMjA3MTU0NiwiZXhwIjoxNzMyMTU3OTQ2fQ.jhGK7nuBA_XOIecJ4tZLNeirGquwOlvdZ2q5hXbMpAQ';
      if (token) headers.set('Authorization', `Bearer ${token}`);
      return headers;
    },
  }),
  tagTypes: ['Empleado'],

  endpoints: (builder) => ({
    getEmpleados: builder.query<Empleado[], {}>({
      query: () => 'empleados/?populate=true',
      providesTags: ['Empleado']
    }),
    getEmpleadoById: builder.query<Empleado, { id: string }>({
      query: ({ id }) => `empleados/${id}/?populate=true`,
      providesTags: ['Empleado']
    }),
    updateEmpleado:
      builder.mutation<Empleado, Partial<Empleado> & Pick<Empleado, 'id'>>({
      query: ({ id, ...patch }) => ({
        url: `empleados/${id}`,
        method: 'PATCH',
        body: patch,
        }),
        invalidatesTags: ['Empleado']
      }),
    deleteEmpleado: builder.mutation<{ succes: boolean; id: string }, string>({
      query: (id) => ({
        url: `empleados/${id}`,
        method: 'DELETE'
      }) ,
      // invalidatesTags: ['Empleado']
    })
  }),
  refetchOnReconnect: true,
  keepUnusedDataFor: 86400,
});

export const { useGetEmpleadosQuery, useGetEmpleadoByIdQuery,useUpdateEmpleadoMutation, useDeleteEmpleadoMutation } =
  empleadoApiSlice;
