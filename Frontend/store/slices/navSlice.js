import { createSlice } from "@reduxjs/toolkit";


const navSlice = createSlice({
    name : "nav",
    initialState : {
     sidebar : false,
     tab : "",
    },

    reducers : {
        toggleSidebar:(state) =>{
            state.sidebar = !state.sidebar;  // false -> true // true -> false
        },

        setTab : (state,action) =>{
          state.tab = action.payload
        }
    }
})

export const {toggleSidebar, setTab } = navSlice.actions;
export default navSlice.reducer