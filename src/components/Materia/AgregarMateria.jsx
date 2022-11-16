import { Grid, TextField } from "@mui/material";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useForm } from "../../hooks/useForm";
import { comenzarCrearMateria } from "../../store/slicers/materiasActions";

const validaciones = {
  nombre: [
    (value) => value.length > 3,
    "El nombre debe tener al menos 4 caracteres",
  ],
  descripcion: [
    (value) => value.length > 8,
    "La descripcion debe tener al menos 8 caracteres",
  ],
};

export const AgregarMateria = ({ cerrarModales }) => {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formLoginValues, handleLoginInputChange, validacion, isValid] =
    useForm(
      {
        nombre: "",
        descripcion: "",
      },
      validaciones
    );

  const { nombre, descripcion } = formLoginValues;
  const { nombreValid, descripcionValid } = validacion;
  const dispach = useDispatch();
  const submit = (e) => {
    e.preventDefault();
    setFormSubmitted(true);
    if (isValid) {
      dispach(comenzarCrearMateria(nombre, descripcion));
      cerrarModales();
    }
  };
  return (
    <>
      <form onSubmit={submit} className="form-container ">
        <Grid container item xs={12} sx={{ mt: 2 }}>
          <TextField
            label="Nombre de la Materia"
            type="text"
            placeholder="español"
            name="nombre"
            value={nombre}
            fullWidth
            onChange={handleLoginInputChange}
            error={!!nombreValid && formSubmitted}
            helperText={formSubmitted && nombreValid}
          />
        </Grid>
        <Grid container item xs={12} sx={{ mt: 2 }}>
          <TextField
            label="Descripcion"
            type="text"
            placeholder="esta materia sirve ..."
            name="descripcion"
            value={descripcion}
            fullWidth
            onChange={handleLoginInputChange}
            error={!!descripcionValid && formSubmitted}
            helperText={formSubmitted && descripcionValid}
          />
        </Grid>

        <button className="btn btn-primary mt-3" type="submit">
          Agregar
        </button>
      </form>
    </>
  );
};
