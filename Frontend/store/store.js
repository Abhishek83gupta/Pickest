import { configureStore } from "@reduxjs/toolkit"
import authSlice from "./slices/authSlice.js"
import navSlice from "./slices/navSlice.js"

export const store = configureStore({
    reducer :{
       " Key to identify slice " : "slice file",
       // shakkar : shakkarSlice,
       auth : authSlice,
       nav : navSlice
    }
})