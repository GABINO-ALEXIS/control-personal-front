import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Empleado } from '../types/Empleado';
import { CreateEmpleadoMutation } from '../types/CreateEmpleadoMutation';

export const empleadoApiSlice = createApi({
  reducerPath: 'empleado',
  baseQuery: fetchBaseQuery({
    // baseUrl: 'http://192.168.18.13:3001/api',
    baseUrl: 'http://192.168.18.5:3001/api',
    prepareHeaders: (headers, { getState }) => {
      const token =
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3MmQ3ZWVkOGRhMzI1YjFjMzYzM2RmMiIsImlhdCI6MTczMjIwNzE2NSwiZXhwIjoxNzMyMjkzNTY1fQ.cvpLFzinsZLS1CIoonQjeF0wewfbMZRHjfVz8PoEdOg';
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
    createEmpleado: builder.mutation<Empleado, CreateEmpleadoMutation>({
      query: (empleado) => {
        const newEmpleado = {
          ...empleado,
          dni: parseInt(empleado.dni, 10),
          edad: parseInt(empleado.edad, 10),
          celular: parseInt(empleado.celular, 10)
        }
        return {
          url: `empleados`,
          method: 'POST',
          body: newEmpleado,
        }
    },
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
    })
  }),
  refetchOnReconnect: true,
  keepUnusedDataFor: 86400,
});

export const { useGetEmpleadosQuery, useGetEmpleadoByIdQuery,useUpdateEmpleadoMutation, useDeleteEmpleadoMutation, useCreateEmpleadoMutation } =
  empleadoApiSlice;
