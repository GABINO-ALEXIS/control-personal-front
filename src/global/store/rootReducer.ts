import { combineReducers } from 'redux';
import { sidebarSlice } from '../ui/contexts/sidebarSlice';
import { empleadoApiSlice } from '../../modules/empleado/services/empleadoApiSlice';
import { cargoApiSlice } from '../../modules/cargo/services/cargoApiSlice';
import { asistenciaApiSlice } from '../../modules/asistencia/services/asistenciaApiSlice';

export const rootReducer = combineReducers({
  sidebar: sidebarSlice.reducer,
  [empleadoApiSlice.reducerPath]: empleadoApiSlice.reducer,
  [cargoApiSlice.reducerPath]: cargoApiSlice.reducer,
  [asistenciaApiSlice.reducerPath]: asistenciaApiSlice.reducer,
});

// export type RootState = ReturnType<typeof rootReducer>;
