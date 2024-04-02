import { configureStore } from "@reduxjs/toolkit";
import auth from "./features/auth/auth";

export const store = configureStore({
  reducer: {
    auth: auth,
  },
});
