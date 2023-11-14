import AsyncStorage from "@react-native-async-storage/async-storage";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: null,
    token: null,
    loading: false,
    error: false
}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers:{
        loginStart: (state) => {
            state.loading = true;
        },
        loginSuccess: (state, action) => {
            state.loading = false;
            state.user = action.payload
            state.token = action.payload.token;
            console.log(action.payload)

            AsyncStorage.setItem('userToken', action.payload.token);
        },
        loginFailure: (state) => {
            state.loading = false;
            state.error = true;
        },
        logout: (state) => {
            AsyncStorage.removeItem('userToken');
            return initialState
        },
        signupStart: (state) => {
            state.loading = true;
        },
        signupSuccess: (state, action) => {
            state.loading = false;
            state.user = action.payload
            console.log(action.payload)
        },
        signupFailure: (state) => {
            state.loading = false;
            state.error = true;
        },
    }
});

export const { loginStart, loginSuccess, loginFailure, logout, signupStart, signupSuccess, signupFailure } = userSlice.actions;
export default userSlice.reducer;