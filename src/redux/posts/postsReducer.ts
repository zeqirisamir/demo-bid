
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: any = {
  posts: {} as any | null,
};

const postSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setPosts: (state, action: PayloadAction<any | null>) => {
      state.posts = action.payload;
    },
    
  },
});

export const { setPosts } = postSlice.actions;

export default postSlice.reducer;
