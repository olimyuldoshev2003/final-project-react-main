import { configureStore } from "@reduxjs/toolkit";
import auth from "./features/auth/auth";
import signUpState from "../reducers/signUpState/signUpState";

export const store = configureStore({
  reducer: {
    auth: auth,
    signUpState: signUpState,
  },
});
