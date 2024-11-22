import { configureStore } from '@reduxjs/toolkit';
import { rootReducer } from './rootReducer';
import { empleadoApiSlice } from '../../modules/empleado/services/empleadoApiSlice';
import { cargoApiSlice } from '../../modules/cargo/services/cargoApiSlice';

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware()
      .concat(empleadoApiSlice.middleware)
      .concat(cargoApiSlice.middleware);
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
