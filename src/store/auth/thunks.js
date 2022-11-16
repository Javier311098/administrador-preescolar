import { checkingCredentials } from "./authSlice";

export const checarAutentificacion = (email, password) => {
  return async (dispatch) => {
    dispatch(checkingCredentials());
  };
};
