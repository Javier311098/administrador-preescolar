import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

export const PrivateRoute = ({ children }) => {
  const { user } = useSelector((state) => state.auth);
  const { pathname, search } = useLocation();

  localStorage.setItem("lastPath", pathname + search);

  return user ? children : <Navigate to="/login" />;
};
