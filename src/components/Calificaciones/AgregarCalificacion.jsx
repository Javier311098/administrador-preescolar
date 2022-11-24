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
import { Table } from "react-bootstrap";
import { comenzarCrearCalificacion } from "../../store/slicers/calificacionesActions";
import { useForm } from "react-hook-form";
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
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const dispach = useDispatch();

  const onSubmit = (data) => {
    console.log(data);
    console.log(data.periodo);

    listaMaterias.map((materia) => {
      const nuevaCalificacion = {
        id_periodo: data.periodo,
        id_usuario: alumno.id_usuario,
        calificacion: data[materia.id_materia],
        id_materia: materia.id_materia,
      };
      console.log(nuevaCalificacion);
      dispach(comenzarCrearCalificacion(nuevaCalificacion));
    });
  };
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="form-container ">
        <Grid container item xs={12} sx={{ mt: 2 }}>
          <TextField
            label="Periodo"
            select
            type="text"
            // name="periodo"
            fullWidth
            {...register("periodo", { required: "Debe registrar un periodo" })}
            // value={periodo}
            // onChange={handleLoginInputChange}
            error={errors.periodo}
            helperText={errors.periodo?.message}
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
                        name="calificacion"
                        fullWidth
                        {...register(`${materia.id_materia}`, {
                          required: "Se debe registrar",
                        })}
                        // value={calificacion}
                        // onChange={handleLoginInputChange}
                        error={errors[materia.id_materia]}
                        helperText={errors[materia.id_materia]?.message}
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
