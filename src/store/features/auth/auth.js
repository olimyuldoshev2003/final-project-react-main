import { createSlice } from "@reduxjs/toolkit";
import { getToken } from "../../../utils/token";
import { registeredUsers } from "../../../api/api";

const initialState = {
  isAuth: getToken(),
  loading: false,
  users: [],
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
  extraReducers: (builder) => {
    builder.addCase(registeredUsers.fulfilled, (state, action) => {
      state.users = action.payload;
    });
  },
});
export const { setLoading, setIsAuth } = authSlice.actions;

export const handleLogin =
  (userName, password, navigate, users) => async (dispatch) => {
    dispatch(setLoading(true));
    let registeredUser = users.find((item) => {
      return item.userName === userName && item.password === password
    })

    // if (userName === "kamolovd" && password === "12345678") {
    //   localStorage.setItem("token", "kamolovd&12345678");
    //   dispatch(setIsAuth(true));
    //   navigate("/");
    // } else {
      //   alert("Error");
      // }
      
    if (registeredUser !== undefined) {
      localStorage.setItem("access_token", `${registeredUser.userName}&${registeredUser.password}`);
      // localStorage.setItem("user", registeredUser);
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
 