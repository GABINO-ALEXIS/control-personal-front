import { createSlice } from '@reduxjs/toolkit';

export const sidebarSlice = createSlice({
  name: 'expand',
  initialState: true,
  reducers: {
    expandSidebar: () => true,
    hiddenSidebar: () => false,
    toggleSidebar: (state) => !state,
  },
});

export const { expandSidebar, hiddenSidebar, toggleSidebar } =
  sidebarSlice.actions;
