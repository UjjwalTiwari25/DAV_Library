import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: "auth",
    initialState:{isLoogedIn: false ,role:"user"},
    reducers:{
        login(state){
            state.isLoogedIn = true;
        },
        logout(state){
            state.isLoogedIn = false;
        },
        changeRole(state,action){
            const role = action.payload;
            state.role = role;
        },
    }
});

export const authActions = authSlice.actions;
export default authSlice.reducer;