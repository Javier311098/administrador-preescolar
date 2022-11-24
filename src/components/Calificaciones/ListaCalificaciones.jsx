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
import { GiSchoolBag } from "react-icons/gi";
import "./calificacion.css";

export const ListaCalificaciones = ({ calificaciones = [] }) => {
  const [modalEditar, setModalEditar] = useState(false);
  const [modalEliminar, setModalEliminar] = useState(false);
  const { calificacionSeleccionado } = useSelector(
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
  }, [term]);

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
    dispatch(
      comenzarBajaCalificacion(calificacionSeleccionado.id_calificacion)
    );
    setModalEliminar(false);
  };

  const searchingTerm = (term) => {
    return function (x) {
      return (
        (x.calificacion &&
          x.calificacion.toLowerCase().includes(term.toLowerCase())) ||
        !term
      );
    };
  };

  return (
    <>
      <input
        className="w-50 rounded-2 ms-3 me-3  "
        type="text"
        placeholder={`Buscar calificacion ejemplo (muy bien)...`}
        value={term}
        name="term"
        onChange={({ target }) => setTerm(target.value)}
      />

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

      <div className="calificacion-container">
        {calificaciones.length > 0 ? (
          data.filter(searchingTerm(term)).map((calificacion) => (
            <div
              className="card"
              style={{ width: "18rem" }}
              key={calificacion.id_calificacion}
            >
              <div className="imagen-container mt-3">
                <GiSchoolBag className="calificacion-imagen" />
              </div>
              <div className="card-body">
                <h4 className="card-title">
                  <b>Materia: </b>
                  {listaMaterias.map((materia) => {
                    if (calificacion.id_materia === materia.id_materia) {
                      return materia.nombre_materia;
                    }
                  })}
                </h4>
                <h5 className="card-text">
                  <b>Periodo: </b>
                  {listaPeriodos.map((periodo) => {
                    if (calificacion.id_periodo === periodo.id_periodo) {
                      return periodo.nombre_periodo;
                    }
                  })}
                </h5>
                <h5 className="card-text">
                  <b>Calificacion: </b>
                  {calificacion.calificacion}
                </h5>

                <div className="d-flex justify-content-between">
                  <button
                    className="btn btn-warning"
                    onClick={() => seleccionCalificacionEditar(calificacion)}
                  >
                    <MdModeEdit />
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() => seleccionCalificacionEliminar(calificacion)}
                  >
                    <MdDelete />
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <h2>no hay calificaciones</h2>
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
