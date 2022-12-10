import { Grid, TextField, MenuItem } from "@mui/material";
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
  const { user } = useSelector((state) => state.auth);
  const listaEstatus = [
    { id_estatus: 0, nombre_estatus: "inactivo" },
    { id_estatus: 1, nombre_estatus: "activo" },
  ];
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
        estatus: periodoSeleccionado.estatus,
      },
      validaciones
    );

  const { nombre, inicio, fin, estatus } = formLoginValues;
  const { nombreValid } = validacion;
  const dispach = useDispatch();
  const submit = (e) => {
    e.preventDefault();
    setFormSubmitted(true);
    if (isValid) {
      dispach(
        comenzarEditarPeriodo(
          nombre,
          fechaInicio,
          fechaFin,
          id_periodo,
          estatus
        )
      );
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
          dateFormat="dd/MM/yyyy"
        />
        <FormLabel>Fecha de Fin:</FormLabel>
        <DatePicker
          selected={fechaFin}
          onChange={handleFechaFin}
          locale="es"
          dateFormat="dd/MM/yyyy"
        />
        {user.role === 1 && (
          <Grid container item xs={12} sx={{ mt: 2 }}>
            <TextField
              label="Estatus"
              select
              type="text"
              name="estatus"
              value={estatus}
              fullWidth
              onChange={handleLoginInputChange}
            >
              {listaEstatus.map((estatus) => (
                <MenuItem key={estatus.id_estatus} value={estatus.id_estatus}>
                  {estatus.nombre_estatus}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
        )}
        <button className="btn btn-primary mt-3" type="submit">
          Editar
        </button>
      </form>
    </>
  );
};
