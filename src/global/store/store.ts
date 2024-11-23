import { configureStore } from '@reduxjs/toolkit';
import { rootReducer } from './rootReducer';
import { empleadoApiSlice } from '../../modules/empleado/services/empleadoApiSlice';
import { cargoApiSlice } from '../../modules/cargo/services/cargoApiSlice';
import { asistenciaApiSlice } from '../../modules/asistencia/services/asistenciaApiSlice';

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware()
      .concat(empleadoApiSlice.middleware)
      .concat(cargoApiSlice.middleware)
      .concat(asistenciaApiSlice.middleware);
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
