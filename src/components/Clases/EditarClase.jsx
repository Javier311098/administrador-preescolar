import { Grid, MenuItem, TextField } from "@mui/material";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "../../hooks/useForm";

import { comenzarEditarClase } from "../../store/slicers/clasesActions";
const validaciones = {
  grado: [(value) => value > 0, "Se debe registrar el grado"],
  periodo: [(value) => value > 0, "Se debe registrar el periodo"],
  actividad: [(value) => value > 0, "Se debe registrar una actividad"],
};

export const EditarClase = ({ cerrarModales }) => {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const listaEstatus = [
    { id_estatus: 0, nombre_estatus: "inactivo" },
    { id_estatus: 1, nombre_estatus: "activo" },
  ];
  const {
    grados: { listaGrados },
    periodos: { listaPeriodos },
    actividades: { listaActividades },
  } = useSelector((state) => state);
  const { claseSeleccionada } = useSelector((state) => state.clases);
  const [formLoginValues, handleLoginInputChange, validacion, isValid] =
    useForm(
      {
        grado: claseSeleccionada.id_grado,
        periodo: claseSeleccionada.id_periodo,
        actividad: claseSeleccionada.id_actividad,
        estatus: claseSeleccionada.estatus,
      },
      validaciones
    );

  const { estudianteDocente, grado, periodo, actividad, estatus } =
    formLoginValues;
  const { gradoValid, periodoValid, actividadValid } = validacion;
  const dispach = useDispatch();
  const submit = (e) => {
    e.preventDefault();
    setFormSubmitted(true);
    if (isValid) {
      const clase = {
        id_esdo: estudianteDocente,
        id_grado: grado,
        id_periodo: periodo,
        id_actividad: actividad,
        estatus: estatus,
      };
      dispach(comenzarEditarClase(clase, claseSeleccionada.id_clase));
      cerrarModales();
    }
  };

  return (
    <>
      <form onSubmit={submit} className="form-container ">
        <Grid container item xs={12} sx={{ mt: 2 }}>
          <TextField
            label="Periodo"
            select
            type="text"
            name="periodo"
            value={periodo}
            fullWidth
            onChange={handleLoginInputChange}
            error={!!periodoValid && formSubmitted}
            helperText={formSubmitted && periodoValid}
          >
            {listaPeriodos.map((periodo) => (
              <MenuItem key={periodo.id_periodo} value={periodo.id_periodo}>
                {periodo.nombre_periodo}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid container item xs={12} sx={{ mt: 2 }}>
          <TextField
            label="Grado"
            select
            type="text"
            name="grado"
            value={grado}
            fullWidth
            onChange={handleLoginInputChange}
            error={!!gradoValid && formSubmitted}
            helperText={formSubmitted && gradoValid}
          >
            {listaGrados.map((grado) => (
              <MenuItem key={grado.id_grado} value={grado.id_grado}>
                {grado.nombre_grado}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid container item xs={12} sx={{ mt: 2 }}>
          <TextField
            label="Actividad"
            select
            type="text"
            name="actividad"
            value={actividad}
            fullWidth
            onChange={handleLoginInputChange}
            error={!!actividadValid && formSubmitted}
            helperText={formSubmitted && actividadValid}
          >
            {listaActividades.map((actividad) => (
              <MenuItem
                key={actividad.id_actividad}
                value={actividad.id_actividad}
              >
                {actividad.nombre_actividad}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
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
