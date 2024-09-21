import { configureStore } from "@reduxjs/toolkit"
import authSlice from "./slices/authSlice.js"
import navSlice from "./slices/navSlice.js"
import postSlice from "./slices/postSlice.js"
import orderSlice from "./slices/orderSlice.js"

export const store = configureStore({
    reducer :{
       " Key to identify slice " : "slice file",
       // shakkar : shakkarSlice,
       auth : authSlice,
       nav : navSlice,
       posts : postSlice,
       order : orderSlice,
    }
})