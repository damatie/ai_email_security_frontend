import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface UserProfileDetails {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  status: string;
  is_active: boolean;
  is_admin: boolean;
  user_type: string;
  last_login: string;
  created_at: string;
  updated_at: string;
}

export interface DashboardState {
  userProfile: UserProfileDetails | null;
}

export const initialState: DashboardState = {
  userProfile: null,
};

export const userProfileSlice = createSlice({
  name: 'userProfile',
  initialState,
  reducers: {
    setUserProfile: (state, action: PayloadAction<UserProfileDetails>) => {
      state.userProfile = action.payload;
    },
  },
});

export const { setUserProfile } = userProfileSlice.actions;

export default userProfileSlice.reducer;
