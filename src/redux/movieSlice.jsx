import { createSlice } from "@reduxjs/toolkit";
import { cleanData } from "../utils/utlity";

const initialState = {
  popularMovies: [],
  topRatedMovies: [],
  upcomingMovies: [],
  pages: null,
  movieLoading: false,
  movieGenres: [],
};

const movieSlice = createSlice({
  name: "movie",
  initialState,
  reducers: {
    getPopular(state, { payload }) {
      state.popularMovies = cleanData(payload.results);
      state.pages = payload.total_pages;
      state.popularMovies.forEach((movie) => (movie.type = "movie"));
      state.movieLoading = false;
    },

    getTopRated(state, { payload }) {
      state.topRatedMovies = payload;
      state.topRatedMovies.forEach((movie) => (movie.type = "movie"));
    },
    getUpcoming(state, { payload }) {
      state.upcomingMovies = payload;
      state.upcomingMovies.forEach((movie) => (movie.type = "movie"));
    },
    getMovieGenres(state, { payload }) {
      state.movieGenres = payload;
    },
    resetPopular(state) {
      state.popularMovies = [];
      state.movieLoading = true;
    },
  },
});

export const movieActions = movieSlice.actions;
export default movieSlice.reducer;
