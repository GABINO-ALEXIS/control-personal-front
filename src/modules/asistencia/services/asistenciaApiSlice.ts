import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { JWT } from '../../../global/utils/jwt';
import { Asistencia } from '../types/Asistencia';
import { CreateAsistenciaMutation } from '../types/CreateAsistenciaMutation';

export const asistenciaApiSlice = createApi({
  reducerPath: 'asistencia',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://192.168.18.5:3001/api',
    prepareHeaders: (headers, { getState }) => {
      const token = JWT;
      if (token) headers.set('Authorization', `Bearer ${token}`);
      return headers;
    },
  }),

  endpoints: (builder) => ({
    createAsistencia: builder.mutation<Asistencia, CreateAsistenciaMutation>({
      query: (asistencia) => {
        return {
          url: `asistencias`,
          method: 'POST',
          body: asistencia,
        };
      },
    }),
  }),
});

export const { useCreateAsistenciaMutation } = asistenciaApiSlice;
