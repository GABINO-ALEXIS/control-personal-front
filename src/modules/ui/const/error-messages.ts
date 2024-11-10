export const ERROR_MESSAGES: { [key: string | number]: string } = {
  401: 'No tienes permisos para acceder a este recurso. Por favor, inicia sesión.',
  403: 'Acceso prohibido. No tienes los permisos necesarios para realizar esta acción.',
  404: 'El recurso solicitado no fue encontrado. Verifica la URL o la información solicitada.',
  400: 'La solicitud no es válida. Verifica los datos enviados y vuelve a intentarlo.',
  500: 'Ha ocurrido un error interno. Por favor, intenta nuevamente más tarde.',
  FETCH_ERROR:
    'Ha ocurrido un error inesperado. Por favor, intenta nuevamente más tarde.',
} as const;
