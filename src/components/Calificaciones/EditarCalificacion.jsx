import {
  Grid,
  MenuItem,
  Paper,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "../../hooks/useForm";
import { FormLabel, Table } from "react-bootstrap";
import { comenzarCrearCalificacion } from "../../store/slicers/calificacionesActions";
const validaciones = {
  periodo: [(value) => value > 0, "Se debe registrar un periodo"],
  alumno: [(value) => value > 0, "Se debe registrar un alumno"],
  calificacion: [
    (value) => value.length > 3,
    "Se debe registrar una calificacion",
  ],
  materia: [(value) => value.length > 3, "Se debe registrar una materia"],
};

export const EditarCalificacion = ({ cerrarModales }) => {
  const [formSubmitted, setFormSubmitted] = useState(false);

  const {
    alumnos: { listaAlumnos },
    periodos: { listaPeriodos },
    materias: { listaMaterias },
  } = useSelector((state) => state);

  const listaCalificaciones = ["EXCELENTE", "MUY BIEN", "BIEN", "REGULAR"];

  const [formLoginValues, handleLoginInputChange, validacion, isValid] =
    useForm(
      {
        periodo: "",
        alumno: "",
        calificacion: "",
        materia: "",
      },
      validaciones
    );

  const { periodo, alumno, calificacion, materia } = formLoginValues;
  const { periodoValid, alumnoValid, calificacionValid, materiaValid } =
    validacion;
  const dispach = useDispatch();
  const submit = (e) => {
    e.preventDefault();
    setFormSubmitted(true);

    if (isValid) {
      const nuevaCalificacion = {
        id_periodo: periodo,
        id_usuario: alumno,
        calificacion: calificacion,
        id_materia: materia,
      };
      dispach(comenzarCrearCalificacion(nuevaCalificacion));
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
        <TableContainer component={Paper} className="lista-container">
          <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
            <TableHead>
              <TableRow>
                <TableCell scope="col">Materia</TableCell>
                <TableCell scope="col">Calificacion</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {listaMaterias.map((materia, index) => (
                <TableRow
                  key={index}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell key={index} scope="col">
                    {materia.nombre_materia}
                  </TableCell>
                  <TableCell key={index} scope="col">
                    <Grid container item xs={12} sx={{ mt: 2 }}>
                      <TextField
                        label="Calificacion"
                        select
                        type="text"
                        name="calificacion"
                        value={calificacion}
                        fullWidth
                        onChange={handleLoginInputChange}
                        error={!!calificacionValid && formSubmitted}
                        helperText={formSubmitted && calificacionValid}
                      >
                        {listaCalificaciones.map((calificacion) => (
                          <MenuItem key={calificacion} value={calificacion}>
                            {calificacion}
                          </MenuItem>
                        ))}
                      </TextField>
                    </Grid>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {
          /* <Grid container item xs={12} sx={{ mt: 2 }}>
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
            label="Alumno"
            select
            type="alumno"
            name="alumno"
            value={alumno}
            fullWidth
            onChange={handleLoginInputChange}
            error={!!alumnoValid && formSubmitted}
            helperText={formSubmitted && alumnoValid}
          >
            {listaAlumnos.map((alumno) => (
              <MenuItem key={alumno.id_alumno} value={alumno.id_alumno}>
                {alumno.nombre_usuario}
              </MenuItem>
            ))}
          </TextField>
        </Grid>

        <Grid container item xs={12} sx={{ mt: 2 }}>
          <TextField
            label="Calificacion"
            select
            type="text"
            name="calificacion"
            value={calificacion}
            fullWidth
            onChange={handleLoginInputChange}
            error={!!calificacionValid && formSubmitted}
            helperText={formSubmitted && calificacionValid}
          >
            {listaCalificaciones.map((calificacion) => (
              <MenuItem key={calificacion} value={calificacion}>
                {calificacion}
              </MenuItem>
            ))}
          </TextField>
        </Grid>

        <Grid container item xs={12} sx={{ mt: 2 }}>
          <TextField
            label="Materia"
            select
            type="materia"
            name="materia"
            value={materia}
            fullWidth
            onChange={handleLoginInputChange}
            error={!!materiaValid && formSubmitted}
            helperText={formSubmitted && materiaValid}
          >
            {listaMaterias.map((materia) => (
              <MenuItem key={materia.id_materia} value={materia.id_materia}>
                {materia.nombre_materia}
              </MenuItem>
            ))}
          </TextField>
        </Grid>

     
        */
          <button className="btn btn-primary mt-3" type="submit">
            Editar
          </button>
        }
      </form>
    </>
  );
};
