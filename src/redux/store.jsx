import { configureStore } from "@reduxjs/toolkit";
import movieReducer from "./movieSlice";
import tvReducer from "./tvSlice";

const store = configureStore({
  reducer: { movie: movieReducer, tv: tvReducer },
});

export default store;
