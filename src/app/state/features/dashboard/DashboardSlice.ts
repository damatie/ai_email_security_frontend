import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface OverviewDetails {
  title: string;
  subtitle: string;
  accountConnected: number;
}

export interface DashboardState {
  overviewDetails: OverviewDetails;
}

export const initialState: DashboardState = {
  overviewDetails: {
    title: '',
    subtitle: '',
    accountConnected: 0,
  },
};

export const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    setOverviewDetails: (state, action: PayloadAction<OverviewDetails>) => {
      state.overviewDetails = action.payload;
    },
  },
});

export const { setOverviewDetails } = dashboardSlice.actions;

export default dashboardSlice.reducer;
