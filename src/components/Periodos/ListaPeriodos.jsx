import { useEffect, useState } from "react";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { seleccionarPeriodo } from "../../store/slicers/periodosSlice";
import { Modal } from "../Modal/Modal";
import { ModalEliminar } from "../Modal/ModalEliminar";
import { EditarPeriodo } from "./EditarPeriodo";
import periodoImg from "../../imagenes/periodo.jpeg";
import { comenzarBajaPeriodo } from "../../store/slicers/periodosActions";
import { MdDelete, MdModeEdit } from "react-icons/md";

export const ListaPeriodos = ({ periodos = [] }) => {
  const [modalEditar, setModalEditar] = useState(false);
  const [modalEliminar, setModalEliminar] = useState(false);
  const { periodoSeleccionado } = useSelector((state) => state.periodos);
  const [data, setData] = useState([]);
  const [term, setTerm] = useState("");

  useEffect(() => {
    setData(periodos);
  }, [term, periodos]);

  const dispatch = useDispatch();
  const modalOpen = () => {
    setModalEditar(false);
    setModalEliminar(false);
  };

  const seleccionPeriodoEliminar = (value) => {
    setModalEliminar(true);
    dispatch(seleccionarPeriodo(value));
  };

  const seleccionPeriodoEditar = (value) => {
    setModalEditar(true);
    dispatch(seleccionarPeriodo(value));
  };

  const eliminar = () => {
    dispatch(comenzarBajaPeriodo(periodoSeleccionado.id_periodo));
    setModalEliminar(false);
  };

  const searchingTerm = (term) => {
    return function (x) {
      return (
        (x.nombre_periodo &&
          x.nombre_periodo.toLowerCase().includes(term.toLowerCase())) ||
        !term
      );
    };
  };

  return (
    <>
      <input
        className="w-50 rounded-2 ms-3 me-3  "
        type="text"
        placeholder={`Buscar Periodos...`}
        value={term}
        name="term"
        onChange={({ target }) => setTerm(target.value)}
      />
      <div className="body-container ">
        {periodos.length > 0 ? (
          data.filter(searchingTerm(term)).map((periodo) => (
            <div
              className="card"
              style={{ width: "18rem" }}
              key={periodo.id_periodo}
            >
              <img src={periodoImg} className="card-img-top" alt="periodo" />
              <div className="card-body">
                <h5 className="card-title">
                  {periodo.nombre_periodo.toUpperCase()}
                </h5>
                <p className="card-text">
                  Fecha de Inicio:
                  {moment(periodo.inicio_periodo).format("D/MM/yyyy")}
                </p>
                <p className="card-text">
                  Fecha de Fin:
                  {moment(periodo.fin_periodo).format("D/MM/yyyy")}
                </p>

                <div className="d-flex justify-content-between">
                  <button
                    className="btn btn-warning"
                    onClick={() => seleccionPeriodoEditar(periodo)}
                  >
                    <MdModeEdit />
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() => seleccionPeriodoEliminar(periodo)}
                  >
                    <MdDelete />
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <h2>no hay periodos</h2>
        )}
      </div>
      <Modal
        show={modalEditar}
        dismiss={modalOpen}
        estiloContainer="periodo-modal"
        header={"Editar Periodo"}
        body={<EditarPeriodo cerrarModales={modalOpen} />}
      />

      <ModalEliminar
        show={modalEliminar}
        dismiss={modalOpen}
        accionEliminar={eliminar}
      />
    </>
  );
};
