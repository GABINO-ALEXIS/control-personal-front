import { configureStore } from '@reduxjs/toolkit';
import { rootReducer } from './rootReducer';
import { empleadoApiSlice } from '../../modules/empleado/services/empleadoApiSlice';

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(empleadoApiSlice.middleware);
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
