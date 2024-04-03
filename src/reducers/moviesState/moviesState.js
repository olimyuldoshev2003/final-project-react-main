import { createSlice } from "@reduxjs/toolkit";
import { getMovies } from "../../api/api";

const initialState = {
  movies: [],
  loading: false,
};

const moviesSlice = createSlice({
  name: "moviesState",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getMovies.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getMovies.fulfilled, (state, action) => {
      state.loading = false;
      state.movies = action.payload;
    });
    builder.addCase(getMovies.rejected, (state) => {
      state.loading = false;
    });
  },
});

export const { setLoading } = moviesSlice.actions;

export default moviesSlice.reducer;
