import { configureStore } from "@reduxjs/toolkit";
import auth from "./features/auth/auth";
import signUpState from "../reducers/signUpState/signUpState";
import moviesState from "../reducers/moviesState/moviesState";

export const store = configureStore({
  reducer: {
    auth: auth,
    signUpState: signUpState,
    moviesState: moviesState,
  },
});
