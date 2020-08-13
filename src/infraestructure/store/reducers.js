/* eslint-disable import/no-cycle */
import moviesReducer from "./movies";

import { logger } from "./middlewares";

export const initialState = {
  movie: moviesReducer.initialState
};

export default function mainReducer(state, action) {
  // Receiving previous state here
  const {
    movie
  } = state;

  // Receiving current state here
  const currentState = {
    movie: moviesReducer.reducer(movie, action),
  };

  // Middlewares
  logger(action, state, currentState);

  return currentState;
}
