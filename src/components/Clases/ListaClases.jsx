import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { seleccionarClase } from "../../store/slicers/clasesSlice";
import { Modal } from "../Modal/Modal";
import { ModalEliminar } from "../Modal/ModalEliminar";
import { EditarClase } from "./EditarClase";
import { comenzarBajaClase } from "../../store/slicers/clasesActions";
import { MdDelete, MdModeEdit } from "react-icons/md";
import claseImg from "../../imagenes/clase.jpeg";

export const ListaClases = ({ clases = [] }) => {
  const [modalEditar, setModalEditar] = useState(false);
  const [modalEliminar, setModalEliminar] = useState(false);
  const { claseSeleccionada } = useSelector((state) => state.clases);
  const [data, setData] = useState([]);
  const [term, setTerm] = useState("");
  const {
    grados: { listaGrados },
    periodos: { listaPeriodos },
    actividades: { listaActividades },
  } = useSelector((state) => state);

  useEffect(() => {
    setData(clases);
  }, [clases]);

  const dispatch = useDispatch();
  const modalOpen = () => {
    setModalEditar(false);
    setModalEliminar(false);
  };

  const seleccionClaseEliminar = (value) => {
    setModalEliminar(true);
    dispatch(seleccionarClase(value));
  };

  const seleccionClaseEditar = (value) => {
    setModalEditar(true);
    dispatch(seleccionarClase(value));
  };

  const eliminar = () => {
    dispatch(comenzarBajaClase(claseSeleccionada.id_clase));
    setModalEliminar(false);
  };

  //seria por fecha
  const searchingTerm = (term) => {
    return function (x) {
      return (
        x.id_clase &&
        listaActividades.filter((actividad) => {
          if (actividad.id_actividad === x.id_actividad) {
            return (
              actividad.nombre_actividad
                .toLowerCase()
                .includes(term.toLowerCase()) || !term
            );
          }
        })
      );
    };
  };

  return (
    <>
      <input
        className="w-50 rounded-2 ms-3 me-3  "
        type="text"
        placeholder={`Buscar activad de la clase...`}
        value={term}
        name="term"
        onChange={({ target }) => setTerm(target.value)}
      />
      <div className="body-container ">
        {clases.length > 0 ? (
          data.filter(searchingTerm(term)).map((clase) => (
            <div
              className="card"
              style={{ width: "18rem" }}
              key={clase.id_clase}
            >
              <img src={claseImg} className="card-img-top" alt="clase" />
              <div className="card-body">
                <h5 className="card-title">Clase</h5>
                <p className="card-text">
                  <b> Actividad: </b>
                  {listaActividades.map((actividad) => {
                    if (clase.id_actividad === actividad.id_actividad) {
                      return actividad.nombre_actividad;
                    }
                  })}
                </p>
                <p className="card-text">
                  <b>Grado: </b>
                  {listaGrados.map((grado) => {
                    if (clase.id_grado === grado.id_grado) {
                      return grado.nombre_grado;
                    }
                  })}
                </p>

                <p className="card-text">
                  <b> Periodo: </b>
                  {listaPeriodos.map((periodo) => {
                    if (clase.id_periodo === periodo.id_periodo) {
                      return periodo.nombre_periodo;
                    }
                  })}
                </p>

                <div className="d-flex justify-content-between">
                  <button
                    className="btn btn-warning"
                    onClick={() => seleccionClaseEditar(clase)}
                  >
                    <MdModeEdit />
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() => seleccionClaseEliminar(clase)}
                  >
                    <MdDelete />
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <h2>no hay clases</h2>
        )}
      </div>
      <Modal
        show={modalEditar}
        dismiss={modalOpen}
        header={"Editar Clase"}
        body={<EditarClase cerrarModales={modalOpen} />}
      />

      <ModalEliminar
        show={modalEliminar}
        dismiss={modalOpen}
        accionEliminar={eliminar}
      />
    </>
  );
};
