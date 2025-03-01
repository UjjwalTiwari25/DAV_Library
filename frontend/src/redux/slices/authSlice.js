import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isLoogedIn: false,
    role: null,
    token: null,
    userId: null
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        // Simple login for initial state restoration
        loginRestore(state) {
            state.isLoogedIn = true;
            state.role = localStorage.getItem("role");
            state.token = localStorage.getItem("token");
            state.userId = localStorage.getItem("id");
        },
        // Full login with payload
        login(state, action) {
            if (action.payload) {
                const { role, token, userId } = action.payload;
                state.isLoogedIn = true;
                state.role = role;
                state.token = token;
                state.userId = userId;
            }
        },
        logout(state) {
            state.isLoogedIn = false;
            state.role = null;
            state.token = null;
            state.userId = null;
        }
    }
});

export const { login, logout, loginRestore } = authSlice.actions;
export default authSlice.reducer; 