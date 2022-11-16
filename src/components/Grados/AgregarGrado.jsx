import { Grid, TextField } from "@mui/material";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useForm } from "../../hooks/useForm";
import { comenzarCrearGrado } from "../../store/slicers/gradosActions";

const validaciones = {
  nombre: [
    (value) => value.length > 4,
    "El nombre debe tener al menos 5 caracteres",
  ],
};

export const AgregarGrado = ({ cerrarModales }) => {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formLoginValues, handleLoginInputChange, validacion, isValid] =
    useForm(
      {
        nombre: "",
      },
      validaciones
    );

  const { nombre } = formLoginValues;
  const { nombreValid } = validacion;
  const dispach = useDispatch();
  const submit = (e) => {
    e.preventDefault();
    setFormSubmitted(true);
    if (isValid) {
      dispach(comenzarCrearGrado(nombre));
      cerrarModales();
    }
  };
  return (
    <>
      <form onSubmit={submit} className="form-container ">
        <Grid container item xs={12} sx={{ mt: 2 }}>
          <TextField
            label="Nombre del Grado"
            type="text"
            placeholder="segundo"
            name="nombre"
            value={nombre}
            fullWidth
            onChange={handleLoginInputChange}
            error={!!nombreValid && formSubmitted}
            helperText={formSubmitted && nombreValid}
          />
        </Grid>

        <button className="btn btn-primary mt-3" type="submit">
          Agregar
        </button>
      </form>
    </>
  );
};
