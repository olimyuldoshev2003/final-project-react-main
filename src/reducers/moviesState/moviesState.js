import { createSlice } from "@reduxjs/toolkit";
import {
  getFavoriteMovies,
  getMovies,
  getMoviesOfMovie,
  getSavedMovies,
  getSearchedMovies,
} from "../../api/api";

const initialState = {
  movies: [],
  moviesOfEachMovie: [],
  loading: false,
  loadingOfEachMovie: false,
  searchMovies: "",
  loadingSearchedMovies: false,
  searchedMovies: [],
  loadingFavoriteMovies: false,
  favoriteMovies: [],
  loadingSavedMovies: false,
  savedMovies: [],
};

const moviesSlice = createSlice({
  name: "moviesState",
  initialState,
  reducers: {
    setSearchMovies(state, action) {
      state.searchMovies = action.payload;
    },
    setMoviesOfEachMovie(state, action) {
      state.moviesOfEachMovie = action.payload;
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
    builder.addCase(getMoviesOfMovie.pending, (state) => {
      state.loadingOfEachMovie = true;
    });
    builder.addCase(getMoviesOfMovie.fulfilled, (state, action) => {
      state.moviesOfEachMovie = action.payload;
      state.loadingOfEachMovie = false;
    });
    builder.addCase(getMoviesOfMovie.rejected, (state) => {
      state.loadingOfEachMovie = false;
    });
    builder.addCase(getSearchedMovies.pending, (state) => {
      state.loadingSearchedMovies = true;
    });
    builder.addCase(getSearchedMovies.fulfilled, (state, action) => {
      state.searchedMovies = action.payload;
      state.loadingSearchedMovies = false;
    });
    builder.addCase(getSearchedMovies.rejected, (state) => {
      state.loadingSearchedMovies = false;
    });
    builder.addCase(getFavoriteMovies.pending, (state) => {
      state.loadingFavoriteMovies = true;
    });
    builder.addCase(getFavoriteMovies.fulfilled, (state, action) => {
      state.favoriteMovies = action.payload;
      state.loadingFavoriteMovies = true;
    });
    builder.addCase(getFavoriteMovies.rejected, (state) => {
      state.loadingFavoriteMovies = true;
    });
    builder.addCase(getSavedMovies.pending, (state) => {
      state.loadingSavedMovies = true;
    });
    builder.addCase(getSavedMovies.fulfilled, (state, action) => {
      state.savedMovies = action.payload;
      state.loadingSavedMovies = true;
    });
    builder.addCase(getSavedMovies.rejected, (state) => {
      state.loadingSavedMovies = true;
    });
  },
});

export const { setLoading, setSearchMovies, setMoviesOfEachMovie } =
  moviesSlice.actions;

export default moviesSlice.reducer;
