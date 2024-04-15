import { createSlice } from "@reduxjs/toolkit";
import { getToken } from "../../../utils/token";
import { registeredUsers } from "../../../api/api";
import axios from "axios";

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
  let registeredUser = users.find((item) => {
    return item.userName === userName && item.password === password
  })
    dispatch(setLoading(true));
      
    if (registeredUser !== undefined) {
      localStorage.setItem("access_token", `${registeredUser.userName}&${registeredUser.password}`);
      const { data } = await axios.post(
        "http://localhost:3000/user",
        registeredUser
      );
      dispatch(setIsAuth(true));
      navigate("/");
      alert("You successfully signed in to your account")
    } else {
      alert("Your username or password is incorrect");
    }

    let timeout = setTimeout(() => {
      dispatch(setLoading(false));
      clearTimeout(timeout);
    }, 2000);
  };

export default authSlice.reducer;
 