import AsyncStorage from "@react-native-async-storage/async-storage";
import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  user: null,
  token: null,
  loading: false,
  error: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginStart: (state) => {
      state.loading = true;
    },
    loginSuccess: (state, action) => {
      state.loading = false;
      state.user = action.payload;
      state.token = action.payload.token;
      console.log(action.payload);

      AsyncStorage.setItem("userToken", action.payload.token);
    },
    loginFailure: (state) => {
      state.loading = false;
      state.error = true;
    },
    logout: (state) => {
      AsyncStorage.removeItem("userToken");
      return initialState;
    },
    signupStart: (state) => {
      state.loading = true;
    },
    signupSuccess: (state, action) => {
      state.loading = false;
      state.user = action.payload;
      console.log(action.payload);
    },
    signupFailure: (state) => {
      state.loading = false;
      state.error = true;
    },
    refreshUser: (state, action) => {
      console.log("action payload: ", action.payload);
      state.user = action.payload;
    },
    // refreshUser: async (state, action) => {
    //   state.loading = true;
    //   try {
    //     const response = await axios.get(
    //       `https://ecotrack-dev.vercel.app/api/users/${state.user._id}`
    //     );
    //     console.log("CURRENT USERRR: ", response.data.userWithoutPassword);
    //     console.log("STATE USERRR1: ", state.user);
    //     state.user = response.data.userWithoutPassword;
    //     console.log("STATE USERRR2: ", state.user);
    //   } catch (error) {
    //     state.error = true;
    //     console.error("Error fetching user data:", error);
    //   } finally {
    //     state.loading = false;
    //   }
    // },
  },
});

export const {
  loginStart,
  loginSuccess,
  loginFailure,
  logout,
  signupStart,
  signupSuccess,
  signupFailure,
  refreshUser,
} = userSlice.actions;
export default userSlice.reducer;
