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
import { useDispatch, useSelector } from "react-redux";
import { Table } from "react-bootstrap";
import { comenzarEditarCalificacion } from "../../store/slicers/calificacionesActions";
import { useForm } from "react-hook-form";

export const EditarCalificacion = ({ cerrarModales }) => {
  const { user } = useSelector((state) => state.auth);
  const listaEstatus = [
    { id_estatus: 0, nombre_estatus: "inactivo" },
    { id_estatus: 1, nombre_estatus: "activo" },
  ];
  const {
    periodos: { listaPeriodos },
    materias: { listaMaterias },
    calificaciones: { calificacionSeleccionada },
  } = useSelector((state) => state);

  const listaCalificaciones = ["EXCELENTE", "MUY BIEN", "BIEN", "REGULAR"];

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const dispach = useDispatch();

  const onSubmit = (data) => {
    const nuevaCalificacion = {
      id_periodo: calificacionSeleccionada.id_periodo,
      id_usuario: calificacionSeleccionada.id_usuario,
      calificacion: data.materia,
      id_materia: calificacionSeleccionada.id_materia,
      estatus: data.estatus,
    };

    dispach(
      comenzarEditarCalificacion(
        nuevaCalificacion,
        calificacionSeleccionada.id_calificacion
      )
    );
    cerrarModales();
  };
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="form-container ">
        <TableContainer
          component={Paper}
          className="lista-container"
          style={{ height: "200px" }}
        >
          <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
            <TableHead>
              <TableRow>
                <TableCell scope="col">Materia</TableCell>
                <TableCell scope="col">Calificacion</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell scope="col">
                  {listaMaterias.map((materia) => {
                    if (
                      calificacionSeleccionada.id_materia === materia.id_materia
                    ) {
                      return materia.nombre_materia;
                    }
                  })}
                </TableCell>
                <TableCell scope="col">
                  <Grid container item xs={12} sx={{ mt: 2 }}>
                    <TextField
                      label="Calificacion"
                      select
                      type="text"
                      fullWidth
                      defaultValue={calificacionSeleccionada.calificacion}
                      {...register("materia", {
                        required: "Se debe registrar",
                      })}
                      error={errors[calificacionSeleccionada.id_materia]}
                      helperText={
                        errors[calificacionSeleccionada.id_materia]?.message
                      }
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
            </TableBody>
          </Table>
        </TableContainer>
        {user.role === 1 && (
          <Grid container item xs={12} sx={{ mt: 2 }}>
            <TextField
              label="Estatus"
              select
              type="text"
              defaultValue={calificacionSeleccionada.estatus}
              {...register("estatus")}
              fullWidth
            >
              {listaEstatus.map((estatus) => (
                <MenuItem key={estatus.id_estatus} value={estatus.id_estatus}>
                  {estatus.nombre_estatus}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
        )}
        {
          <button className="btn btn-primary mt-3" type="submit">
            Editar
          </button>
        }
      </form>
    </>
  );
};
