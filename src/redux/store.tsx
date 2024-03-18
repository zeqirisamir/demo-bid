import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/AuthReducer";
import postsReducer from "./posts/postsReducer";

const store = configureStore({
  reducer: { authReducer, postsReducer },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
