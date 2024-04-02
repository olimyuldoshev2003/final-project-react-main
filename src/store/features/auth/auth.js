import { createSlice } from "@reduxjs/toolkit";
import { getToken } from "../../../utils/token";

const initialState = {
  isAuth: getToken(),
  loading: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLoading: (state, { payload }) => {
      state.loading = payload;
    },
    setIsAuth: (state, { payload }) => {
      state.isAuth = payload;
    },
  },
});
export const { setLoading, setIsAuth } = authSlice.actions;

export const handleLogin =
  (userName, password, navigate) => async (dispatch) => {
    dispatch(setLoading(true));
    if (userName === "kamolovd" && password === "12345678") {
      localStorage.setItem("token", "kamolovd&12345678");
      dispatch(setIsAuth(true));
      navigate("/");
    } else {
      alert("Error");
    }

    let timeout = setTimeout(() => {
      dispatch(setLoading(false));
      clearTimeout(timeout);
    }, 2000);
  };

export default authSlice.reducer;
