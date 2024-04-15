import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const isAuth = useSelector(({ auth }) => auth.isAuth);

  return isAuth ? children : <Navigate to="/introduction" />;
};

export default ProtectedRoute;
