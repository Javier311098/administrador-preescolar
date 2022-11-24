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
  calificacion: [
    (value) => value.length > 3,
    "Se debe registrar una calificacion",
  ],
  materia: [(value) => value.length > 3, "Se debe registrar una materia"],
};

export const AgregarCalificacion = ({ cerrarModales }) => {
  const [formSubmitted, setFormSubmitted] = useState(false);

  const {
    alumnos: { listaAlumnos },
    periodos: { listaPeriodos },
    materias: { listaMaterias },
  } = useSelector((state) => state);

  const listaCalificaciones = ["EXCELENTE", "MUY BIEN", "BIEN", "REGULAR"];
  const alumno = JSON.parse(localStorage.getItem("alumno"));

  const [formLoginValues, handleLoginInputChange, validacion, isValid] =
    useForm(
      {
        periodo: "",

        calificacion: "",
        materia: "",
        materias: listaMaterias.map((materia) =>
          materia.nombre_materia.toLowerCase().replace(" ", "_")
        ),
      },
      validaciones
    );

  const { periodo, calificacion, materia, materias } = formLoginValues;
  const { periodoValid, calificacionValid, materiaValid } = validacion;
  const dispach = useDispatch();

  console.log(materias);

  const submit = (e) => {
    e.preventDefault();
    setFormSubmitted(true);

    if (isValid) {
      const nuevaCalificacion = {
        id_periodo: periodo,
        id_usuario: alumno.id_usuario,
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
        <TableContainer
          component={Paper}
          className="lista-container"
          style={{ height: "450px" }}
        >
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
                  key={materia.id_materia}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell key={materia.nombre_materia} scope="col">
                    {materia.nombre_materia}
                  </TableCell>
                  <TableCell key={index} scope="col">
                    <Grid container item xs={12} sx={{ mt: 2 }}>
                      <TextField
                        label="Calificacion"
                        select
                        type="text"
                        name={materias[index]}
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
          <button className="btn btn-primary mt-3" type="submit">
            Agregar
          </button>
        }
      </form>
    </>
  );
};
