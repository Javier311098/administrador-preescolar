import { useEffect, useState } from "react";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { seleccionarCalificacion } from "../../store/slicers/calificacionesSlice";
import { Modal } from "../Modal/Modal";
import { ModalEliminar } from "../Modal/ModalEliminar";
import { EditarCalificacion } from "./EditarCalificacion";
import { comenzarBajaCalificacion } from "../../store/slicers/calificacionesActions";
import { MdDelete, MdModeEdit } from "react-icons/md";

export const ListaCalificaciones = ({ calificaciones = [] }) => {
  const [modalEditar, setModalEditar] = useState(false);
  const [modalEliminar, setModalEliminar] = useState(false);
  const { calificacionSeleccionado } = useSelector(
    (state) => state.calificaciones
  );
  const [data, setData] = useState([]);
  const [term, setTerm] = useState("");

  useEffect(() => {
    setData(calificaciones);
  }, []);

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
        (x.nombre_calificacion &&
          x.nombre_calificacion.toLowerCase().includes(term.toLowerCase())) ||
        !term
      );
    };
  };

  return (
    <>
      <input
        className="w-50 rounded-2 ms-3 me-3  "
        type="text"
        placeholder={`Buscar calificaciones...`}
        value={term}
        name="term"
        onChange={({ target }) => setTerm(target.value)}
      />
      <div className="body-container ">
        {calificaciones.length > 0 ? (
          data.filter(searchingTerm(term)).map((calificacion) => (
            <div
              className="card"
              style={{ width: "18rem" }}
              key={calificacion.id_calificacion}
            >
              {/* <img
                src={calificacionImg}
                className="card-img-top"
                alt="calificacion"
              /> */}
              <div className="card-body">
                <h5 className="card-title">
                  {calificacion.nombre_calificacion.toUpperCase()}
                </h5>
                <p className="card-text">
                  Fecha de Inicio:
                  {moment(calificacion.inicio_calificacion).format("D/MM/yyyy")}
                </p>
                <p className="card-text">
                  Fecha de Fin:
                  {moment(calificacion.fin_calificacion).format("D/MM/yyyy")}
                </p>

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
