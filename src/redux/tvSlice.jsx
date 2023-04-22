import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  popularTVShows: [],
  topRatedTVShows: [],
  upcomingTVShows: [],
  pages: null,
  tvLoading: false,
  tvGenres: [],
};

const tvSlice = createSlice({
  name: "tv",
  initialState,
  reducers: {
    getPopular(state, { payload }) {
      state.popularTVShows = payload.results;
      state.pages = payload.total_pages;
      state.popularTVShows.forEach((tv) => (tv.type = "tv"));
      state.tvLoading = false;
    },
    getTopRated(state, { payload }) {
      state.topRatedTVShows = payload;
      state.topRatedTVShows.forEach((tv) => (tv.type = "tv"));
    },
    getUpcoming(state, { payload }) {
      state.upcomingTVShows = payload;
      state.upcomingTVShows.forEach((tv) => (tv.type = "tv"));
    },
    getTvGenres(state, { payload }) {
      state.tvGenres = payload;
    },
    resetPopular(state) {
      state.popularTVShows = [];
      state.tvLoading = true;
    },
  },
});

export const tvActions = tvSlice.actions;
export default tvSlice.reducer;
