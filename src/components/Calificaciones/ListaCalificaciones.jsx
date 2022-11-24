import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { seleccionarCalificacion } from "../../store/slicers/calificacionesSlice";
import { Modal } from "../Modal/Modal";
import { ModalEliminar } from "../Modal/ModalEliminar";
import { EditarCalificacion } from "./EditarCalificacion";
import {
  comenzarBajaCalificacion,
  obtenerCalificaciones,
} from "../../store/slicers/calificacionesActions";
import { MdDelete, MdModeEdit } from "react-icons/md";
import "./calificacion.css";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

export const ListaCalificaciones = ({ calificaciones = [] }) => {
  const [modalEditar, setModalEditar] = useState(false);
  const [modalEliminar, setModalEliminar] = useState(false);
  const { calificacionSeleccionada } = useSelector(
    (state) => state.calificaciones
  );
  const {
    materias: { listaMaterias },
    periodos: { listaPeriodos },
  } = useSelector((state) => state);

  const [data, setData] = useState([]);
  const [term, setTerm] = useState("");
  const alumno = JSON.parse(localStorage.getItem("alumno"));
  useEffect(() => {
    setData(calificaciones);
  }, [term, calificaciones]);

  const dispatch = useDispatch();
  const modalOpen = () => {
    setModalEditar(false);
    setModalEliminar(false);
  };

  const seleccionCalificacionEliminar = (value) => {
    setModalEliminar(true);
    dispatch(seleccionarCalificacion(value));
  };

  const seleccionCalificacionEditar = (value) => {
    setModalEditar(true);
    dispatch(seleccionarCalificacion(value));
  };

  const eliminar = () => {
    console.log(calificacionSeleccionada);
    dispatch(
      comenzarBajaCalificacion(calificacionSeleccionada.id_calificacion)
    );
    setModalEliminar(false);
  };

  return (
    <>
      <div className="d-flex mt-3 mb-3 justify-content-center ">
        {listaPeriodos.map((periodo) => (
          <button
            key={periodo.id_periodo}
            className="btn btn-primary me-3"
            onClick={() => {
              dispatch(
                obtenerCalificaciones(alumno.id_usuario, periodo.id_periodo)
              );
            }}
          >
            {periodo.nombre_periodo}
          </button>
        ))}
      </div>

      <div>
        {calificaciones.length > 0 ? (
          <>
            <TableContainer
              component={Paper}
              className="lista-container"
              style={{ height: "460px", width: "100%" }}
            >
              <Table
                sx={{ minWidth: 1150 }}
                size="small"
                aria-label="a dense table"
              >
                <TableHead>
                  <TableRow>
                    <TableCell scope="col">Materia</TableCell>
                    <TableCell scope="col">Calificacion</TableCell>
                    <TableCell scope="col">Acciones</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {calificaciones.map((calificacion) => (
                    <TableRow
                      key={calificacion.id_materia}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell scope="col">
                        {listaMaterias.map((materia) => {
                          if (calificacion.id_materia === materia.id_materia) {
                            return materia.nombre_materia;
                          }
                        })}
                      </TableCell>
                      <TableCell scope="col">
                        {calificacion.calificacion}
                      </TableCell>
                      <TableCell scope="col">
                        <button
                          className="btn btn-warning me-2"
                          onClick={() =>
                            seleccionCalificacionEditar(calificacion)
                          }
                        >
                          <MdModeEdit />
                        </button>
                        <button
                          className="btn btn-danger"
                          onClick={() =>
                            seleccionCalificacionEliminar(calificacion)
                          }
                        >
                          <MdDelete />
                        </button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </>
        ) : (
          <div
            className="lista-container"
            style={{ height: "460px", width: "100%" }}
          >
            <h2>no hay calificaciones</h2>
          </div>
        )}
      </div>
      <Modal
        show={modalEditar}
        dismiss={modalOpen}
        header={"Editar calificacion"}
        body={<EditarCalificacion cerrarModales={modalOpen} />}
      />

      <ModalEliminar
        show={modalEliminar}
        dismiss={modalOpen}
        accionEliminar={eliminar}
      />
    </>
  );
};
