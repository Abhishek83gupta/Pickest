import { createSlice } from "@reduxjs/toolkit"


const authSlice = createSlice({
    name:"auth",
    initialState : {
    accessToken :localStorage.getItem("accessToken") || null,     // consider null // localstorage help when page get refresh
    refreshToken :localStorage.getItem("refreshToken") || null,
    role :localStorage.getItem("role") || null,
    author :localStorage.getItem("author") || null,
    isAuthenticated :!!localStorage.getItem("accessToken") || null,
    },

reducers : {
    login : (state, action) =>{
        state.accessToken = action.payload.accessToken;
        state.refreshToken = action.payload.refreshToken;
        state.role = action.payload.role;
        state.author = action.payload.author;
        state.isAuthenticated = true;
        localStorage.setItem("accesstoken", action.payload.accessToken);
        localStorage.setItem("refreshToken", action.payload.refreshToken);
        localStorage.setItem("role", action.payload.role);
        localStorage.setItem("author", action.payload.author);
    },
 },
});

export const { login } = authSlice.actions
export default authSlice.reducer