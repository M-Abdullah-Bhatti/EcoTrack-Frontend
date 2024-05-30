import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  goals: null,
  loading: false,
  error: false,
};

const goalSlice = createSlice({
  name: "goals",
  initialState,
  reducers: {
    fetchingStart: (state) => {
      state.loading = true;
    },
    fetchingSuccess: (state, action) => {
      state.loading = false;
      state.goals = action.payload;
    },
    fetchingFailure: (state) => {
      state.loading = false;
      state.error = true;
    },
  },
});

export const {
  fetchingStart,
  fetchingSuccess,
  fetchingFailure,
} = goalSlice.actions;

export default goalSlice.reducer;
