import { Link } from 'react-router-dom';
import { ERROR_MESSAGES } from '../../const/error-messages';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { SerializedError } from '@reduxjs/toolkit';

export type ErrorProps = {
  error: FetchBaseQueryError | SerializedError;
  redireccion?: string;
  bottomMessage?: string;
};

export const Error = ({
  error,
  redireccion = '/',
  bottomMessage = 'Regresar a Inicio',
}: ErrorProps) => {
  const err: any = error;
  const { status, message } =
    'data' in err
      ? {
          status: err.data.statusCode,
          message: err.data.message,
        }
      : {
          status: err?.status || 400,
          message: err?.err || 'unexpected error',
        };
  return (
    <main className="grid min-h-full min-w-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
      <div className="text-center">
        <p className="text-base font-semibold text-indigo-600">
          {status} / {message}
        </p>
        <p className="mt-6 text-pretty text-lg font-medium text-gray-500 sm:text-xl/8">
          {ERROR_MESSAGES[status] || 'error inesperado'}
        </p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <Link
            to={redireccion}
            className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            &larr; {bottomMessage}
          </Link>
        </div>
      </div>
    </main>
  );
};
