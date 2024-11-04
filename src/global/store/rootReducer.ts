import { combineReducers } from 'redux';
import { sidebarSlice } from '../ui/contexts/sidebarSlice';

export const rootReducer = combineReducers({
  sidebar: sidebarSlice.reducer,
});

export type RootState = ReturnType<typeof rootReducer>;
