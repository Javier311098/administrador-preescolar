import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useForm } from "../../hooks/useForm";
import { checarAutentificacion } from "../../store/auth/thunks";
import "./login.css";
import "react-chatbot-kit/build/main.css";
import { Grid, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { useAuthStore } from "../../hooks/useAuthStore";
import Swal from "sweetalert2";

const validaciones = {
  email: [(value) => value.includes("@"), "Ingrese un correo valido"],
  password: [(value) => value.length > 0, "Ingrese la contraseña"],
};

export const LoginScreen = () => {
  let navigate = useNavigate();
  const dispatch = useDispatch();

  const { startLogin, errorMessage } = useAuthStore();
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formLoginValues, handleLoginInputChange, validacion, isValid] =
    useForm(
      {
        email: "",
        password: "",
      },
      validaciones
    );

  const { email, password } = formLoginValues;
  const { emailValid, passwordValid } = validacion;

  useEffect(() => {
    if (errorMessage !== undefined) {
      Swal.fire("Error en la autentificacion", errorMessage, "error");
    }
  }, [errorMessage]);

  const submit = (e) => {
    e.preventDefault();
    setFormSubmitted(true);
    if (isValid) {
      startLogin({ email, password });
      dispatch(checarAutentificacion());
    }
  };

  return (
    <>
      <div className="center">
        <h1>Administracion Preescolar</h1>

        <form onSubmit={submit} className="form-container">
          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label="Correo Electronico"
              type="email"
              placeholder="name@example.com"
              name="email"
              value={email}
              onChange={handleLoginInputChange}
              error={!!emailValid && formSubmitted}
              helperText={formSubmitted && emailValid}
            />
          </Grid>
          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label="Contraseña"
              type="password"
              name="password"
              value={password}
              onChange={handleLoginInputChange}
              error={!!passwordValid && formSubmitted}
              helperText={formSubmitted && passwordValid}
            />
          </Grid>

          <button className="btn btn-primary mt-3" type="submit">
            Iniciar Sesion
          </button>
        </form>
      </div>
    </>
  );
};
