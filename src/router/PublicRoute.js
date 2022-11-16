import { Navigate } from "react-router";
import { useSelector } from "react-redux";

export const PublicRoute = ({ children }) => {
  const { user } = useSelector((state) => state.auth);
  return user ? <Navigate to="/inicio" /> : children;
};
