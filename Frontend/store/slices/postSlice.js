import { createSlice } from "@reduxjs/toolkit";

const postSlice = createSlice({
  name: "posts",
  initialState: {
    allPosts: [],
    myPosts: [],
    myFavourites : [],
  },

  reducers: {
    setAllPosts: (state, action) => {
      state.allPosts = action.payload;
    },
    setMyPosts: (state, action) => {
      state.myPosts = action.payload;
    },
    removePost:(state,action) =>{
      state.myPosts = state.myPosts.filter((post)=>post._id !== action.payload)
    },
    setMyFavourites: (state, action) =>{
      state.myFavourites = action.payload;
    }
  },
});

export const { setAllPosts, setMyPosts, removePost, setMyFavourites} = postSlice.actions;
export default postSlice.reducer;
