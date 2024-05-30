import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  emissions: null,
  loading: false,
  error: false,
};

const emissionSlice = createSlice({
  name: "emission",
  initialState,
  reducers: {
    fetchingStart: (state) => {
      state.loading = true;
    },
    fetchingSuccess: (state, action) => {
      state.loading = false;
      state.emissions = action.payload;
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
} = emissionSlice.actions;

export default emissionSlice.reducer;
