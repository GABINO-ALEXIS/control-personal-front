import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { JWT } from '../../../global/utils/jwt';
import { Asistencia } from '../types/Asistencia';
import { CreateAsistenciaMutation } from '../types/CreateAsistenciaMutation';
import { CONNECTION } from '../../../global/utils/connection';

export const asistenciaApiSlice = createApi({
  reducerPath: 'asistencia',
  baseQuery: fetchBaseQuery({
    baseUrl: CONNECTION,
    prepareHeaders: (headers, { getState }) => {
      const token = JWT;
      if (token) headers.set('Authorization', `Bearer ${token}`);
      return headers;
    },
  }),
  tagTypes: ['Asistencia'],

  endpoints: (builder) => ({
    getAsistenciasByEmpleadoEndDate: builder.query<Asistencia[], {empleadoId: string, fechaInicio: string, fechaFin?: string}>({
      query: ({empleadoId, fechaInicio, fechaFin}) => `asistencias/buscar/?empleado=${empleadoId}&fechaInicio=${fechaInicio}${fechaFin ? `&fechaFin=${fechaFin}`: ''}`,
      providesTags: ['Asistencia']
    }),
    createAsistencia: builder.mutation<Asistencia, CreateAsistenciaMutation>({
      query: (asistencia) => (
         {
          url: `asistencias`,
          method: 'POST',
          body: asistencia,
        }
      ),
      invalidatesTags: ['Asistencia']

    }),
    updateAsisitencia: builder.mutation <Asistencia, Partial<Asistencia> & Pick<Asistencia, 'id'>>({
      query: ({ id, ...patch }) => ({
        url: `asistencias/${id}`,
        method: 'PATCH',
        body: patch,
        }),
        invalidatesTags: ['Asistencia']
    }),
  }),
});

export const { useCreateAsistenciaMutation, useGetAsistenciasByEmpleadoEndDateQuery, useUpdateAsisitenciaMutation } = asistenciaApiSlice;
