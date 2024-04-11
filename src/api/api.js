import axios from "axios";
import { useNavigate } from "react-router-dom";
import { setLoading } from "../reducers/signUpState/signUpState";
import { createAsyncThunk } from "@reduxjs/toolkit";

//Sign Up
export const handleSignUp = (obj, navigate) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const { data } = await axios.post("http://localhost:3000/signup", obj);
    navigate("/signin");
  } catch (error) {
    console.error(error);
  } finally {
    let timeout = setTimeout(() => {
      dispatch(setLoading(false));
      clearTimeout(timeout);
    }, 2000);
  }
};

//Movies from backend
export const getMovies = createAsyncThunk("api/getMovies", async function () {
  try {
    const { data } = await axios.get(  `http://localhost:3000/movies` );
    return data;
  } catch (error) {}
});

export const getSearchedMovies = createAsyncThunk("api/searchMovies", async function (movies) {
  try {
    const { data } = await axios.get(
      movies === ``
        ? `http://localhost:3000/movies`
        : `http://localhost:3000/movies?q=${movies}`
    );
    return data;
  } catch (error) {}
});

export const registeredUsers = createAsyncThunk("api/registeredUser", async function () {
  try {
    const { data } = await axios.get(`http://localhost:3000/signup`);
    return data;
  } catch (error) {
    console.error(error);
  }
});