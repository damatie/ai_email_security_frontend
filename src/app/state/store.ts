// src/redux/store.ts
import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import DashboardReducer from './features/dashboard/DashboardSlice';

const rootReducer = combineReducers({
  dashboard: DashboardReducer,
  // Add other reducers here
});

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
