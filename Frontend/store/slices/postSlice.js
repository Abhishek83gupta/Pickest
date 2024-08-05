import { createSlice } from "@reduxjs/toolkit";

const postSlice = createSlice({
  name: "posts",
  initialState: {
    allPosts: [],
    myPosts: [],
  },

  reducers: {
    setAllPosts: (state, action) => {
      state.allPosts = action.payload;
    },
    setMyposts: (state, action) => {
      state.myPosts = action.payload;
    },

  },
});

export const { setAllPosts, setMyposts } = postSlice.actions;
export default postSlice.reducer;
