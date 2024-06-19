import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserData } from "../../service/types";

const initialState: any = {
  user: {} as UserData,
  userType: "buyer",
  isAuthenticated: false,
  currentValue: 0,
};

const authSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserData | null>) => {
      state.user = action.payload;
      state.isAuthenticated = !!action.payload;
    },
    setUserType: (state, action: PayloadAction<any | null>) => {
      state.userType = action.payload;
      state.isAuthenticated = !!action.payload;
    },
    setCurrentValue: (state, action: PayloadAction<any | null>) => {
      state.currentValue = action.payload;
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
    },
  },
});

export const { setUser, logout, setUserType } = authSlice.actions;

export default authSlice.reducer;
