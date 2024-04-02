import axios from "axios";
import { useNavigate } from "react-router-dom";
import { setLoading } from "../reducers/signUpState/signUpState";

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
