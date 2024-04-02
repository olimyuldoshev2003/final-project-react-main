import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const AuthCheck = ({ children }) => {
  const isAuth = useSelector(({ auth }) => auth.isAuth);
  return isAuth ? <Navigate to="/" /> : children;
};

export default AuthCheck;
