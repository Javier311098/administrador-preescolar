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
  Table,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { comenzarCrearCalificacion } from "../../store/slicers/calificacionesActions";
import { useForm } from "react-hook-form";

export const AgregarCalificacion = ({ cerrarModales }) => {
  const {
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
      cerrarModales();
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
            defaultValue=""
            fullWidth
            {...register("periodo", { required: "Debe registrar un periodo" })}
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
                        defaultValue=""
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
