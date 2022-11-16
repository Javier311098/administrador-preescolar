import { Grid, TextField } from "@mui/material";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "../../hooks/useForm";
import { comenzarEditarPeriodo } from "../../store/slicers/periodosActions";
import DatePicker from "react-datepicker";
import { registerLocale, setDefaultLocale } from "react-datepicker";
import es from "date-fns/locale/es";

import "react-datepicker/dist/react-datepicker.css";
import { FormLabel } from "react-bootstrap";
const validaciones = {
  nombre: [
    (value) => value.length > 3,
    "El nombre debe tener al menos 4 caracteres",
  ],
};

export const EditarPeriodo = ({ cerrarModales }) => {
  registerLocale("es", es);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const { periodoSeleccionado } = useSelector((state) => state.periodos);
  const { id_periodo, nombre_periodo, inicio_periodo, fin_periodo } =
    periodoSeleccionado;
  const [fechaInicio, setFechaInicio] = useState(new Date(inicio_periodo));
  const [fechaFin, setFechaFin] = useState(new Date(fin_periodo));
  const [formLoginValues, handleLoginInputChange, validacion, isValid] =
    useForm(
      {
        nombre: nombre_periodo,
      },
      validaciones
    );

  const { nombre, inicio, fin } = formLoginValues;
  const { nombreValid } = validacion;
  const dispach = useDispatch();
  const submit = (e) => {
    e.preventDefault();
    setFormSubmitted(true);
    if (isValid) {
      dispach(comenzarEditarPeriodo(nombre, fechaInicio, fechaFin, id_periodo));
      cerrarModales();
    }
  };

  const handleFechaInicio = (date) => {
    setFechaInicio(date);
  };
  const handleFechaFin = (date) => {
    setFechaFin(date);
  };

  return (
    <>
      <form onSubmit={submit} className="form-container ">
        <Grid container item xs={12} sx={{ mt: 2 }}>
          <TextField
            label="Nombre del Periodo"
            type="text"
            placeholder="bloque 1"
            name="nombre"
            value={nombre}
            fullWidth
            onChange={handleLoginInputChange}
            error={!!nombreValid && formSubmitted}
            helperText={formSubmitted && nombreValid}
          />
        </Grid>

        <FormLabel>Fecha de Inicio:</FormLabel>
        <DatePicker
          selected={fechaInicio}
          onChange={handleFechaInicio}
          locale="es"
          dateFormat="dd//MM/yyyy"
        />
        <FormLabel>Fecha de Fin:</FormLabel>
        <DatePicker
          selected={fechaFin}
          onChange={handleFechaFin}
          locale="es"
          dateFormat="dd//MM/yyyy"
        />
        <button className="btn btn-primary mt-3" type="submit">
          Editar
        </button>
      </form>
    </>
  );
};
