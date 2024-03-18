
  import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: any = {
  user: {} as any | null,
  userType:'buyer',
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<any | null>) => {
      state.user = action.payload;
      state.isAuthenticated = !!action.payload;
    },
    setUserType: (state, action: PayloadAction<any | null>) => {
      state.userType = action.payload;
      state.isAuthenticated = !!action.payload;
    },
    logout: (state) => {
     
      state.user = null;
      state.isAuthenticated = false;
    },
  },
});

export const { setUser, logout,setUserType } = authSlice.actions;

export default authSlice.reducer;
