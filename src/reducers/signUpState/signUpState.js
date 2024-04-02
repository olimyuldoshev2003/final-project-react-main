import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
};

const signUpSlice = createSlice({
  name: "signupState",
  initialState,
  reducers: {
    setLoading(state, action) {
      state.loading = action.payload;
    },
  },
});

export const { setLoading } = signUpSlice.actions;

export default signUpSlice.reducer;
