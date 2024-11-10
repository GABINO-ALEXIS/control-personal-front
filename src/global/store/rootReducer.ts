import { combineReducers } from 'redux';
import { sidebarSlice } from '../ui/contexts/sidebarSlice';
import { empleadoApiSlice } from '../../modules/empleado/services/empleadoApiSlice';

export const rootReducer = combineReducers({
  sidebar: sidebarSlice.reducer,
  [empleadoApiSlice.reducerPath]: empleadoApiSlice.reducer,
});

// export type RootState = ReturnType<typeof rootReducer>;
