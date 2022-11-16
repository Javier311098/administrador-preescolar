import { useDispatch, useSelector } from "react-redux";
import usuarioApi from "../api/usuarioApi";
import {
  checkingCredentials,
  limpiarError,
  login,
  logout,
} from "../store/auth/authSlice";

export const useAuthStore = () => {
  const { user, status, errorMessage } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const startLogin = async ({ email, password }) => {
    dispatch(checkingCredentials());
    try {
      const { data } = await usuarioApi.post("/login", {
        correo_electronico: email,
        password_usuario: password,
      });
      localStorage.setItem("token", data.token);
      localStorage.setItem("token-inicio-fecha", new Date().getTime());
      dispatch(login({ nombre: data.name, uid: data.uid, role: data.role }));
    } catch (error) {
      dispatch(logout("Credenciales incorrectas"));
      setTimeout(() => {
        dispatch(limpiarError());
      }, 10);
    }
  };

  const checkAuthToken = async () => {
    const token = localStorage.getItem("token");
    if (!token) return dispatch(logout());
    try {
      const { data } = await usuarioApi.get("/renew");
      localStorage.setItem("token", data.token);
      localStorage.setItem("token-inicio-fecha", new Date().getTime());
      dispatch(login({ nombre: data.name, uid: data.uid, role: data.role }));
    } catch (error) {
      localStorage.clear();
      dispatch(logout());
    }
  };
  const startLogout = async () => {
    localStorage.clear();
    dispatch(logout());
  };

  return {
    user,
    status,
    errorMessage,
    startLogin,
    checkAuthToken,
    startLogout,
  };
};
