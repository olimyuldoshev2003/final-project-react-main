import { createSlice } from "@reduxjs/toolkit";
import { getMovies, getSearchedMovies } from "../../api/api";

const initialState = {
  movies: [],
  loading: false,
  searchMovies: "",
  loadingSearchedMovies: false,
  searchedMovies: [],
};

const moviesSlice = createSlice({
  name: "moviesState",
  initialState,
  reducers: {
    setSearchMovies(state, action) {
      state.searchMovies = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getMovies.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getMovies.fulfilled, (state, action) => {
      state.movies = action.payload;
      state.loading = false;
    });
    builder.addCase(getMovies.rejected, (state) => {
      state.loading = false;
    });
    builder.addCase(getSearchedMovies.pending, (state) => {
      state.loadingSearchedMovies = true;
    });
    builder.addCase(getSearchedMovies.fulfilled, (state, action) => {
      state.searchedMovies = action.payload;
      state.loadingSearchedMovies = false;
    });
    builder.addCase(getSearchedMovies.rejected, (state) => {
      state.loading = false;
      state.loadingSearchedMovies = false;
    });
  },
});

export const { setLoading, setSearchMovies } = moviesSlice.actions;

export default moviesSlice.reducer;
