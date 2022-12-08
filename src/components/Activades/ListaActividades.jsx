import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Modal } from "../Modal/Modal";
import { ModalEliminar } from "../Modal/ModalEliminar";
import {
  MdDelete,
  MdModeEdit,
  MdVisibility,
  MdAutoStories,
} from "react-icons/md";
import { EditarActividad } from "./EditarActividad";
import { comenzarBajaActividad } from "../../store/slicers/actividadesActions";
import { seleccionarActividad } from "../../store/slicers/actividadesSlice";
import { useNavigate } from "react-router-dom";

export const ListaActividades = ({ actividades = [] }) => {
  const { user } = useSelector((state) => state.auth);
  const [modalEditar, setModalEditar] = useState(false);
  const [modalEliminar, setModalEliminar] = useState(false);
  const { actividadSeleccionada } = useSelector((state) => state.actividades);
  const { listaMaterias } = useSelector((state) => state.materias);
  const [data, setData] = useState([]);
  const [term, setTerm] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    setData(actividades);
  }, [term, actividades]);

  const dispatch = useDispatch();
  const modalOpen = () => {
    setModalEditar(false);
    setModalEliminar(false);
  };

  const seleccionActividadEliminar = (value) => {
    setModalEliminar(true);
    dispatch(seleccionarActividad(value));
  };

  const seleccionActividadEditar = (value) => {
    setModalEditar(true);
    dispatch(seleccionarActividad(value));
  };

  const navegarActividad = (value) => {
    navigate(`/actividades/${value.id_actividad}`);
    localStorage.setItem("actividad", JSON.stringify(value));
    dispatch(seleccionarActividad(value));
  };

  const eliminar = () => {
    dispatch(comenzarBajaActividad(actividadSeleccionada.id_actividad));
    setModalEliminar(false);
  };

  const searchingTerm = (term) => {
    return function (x) {
      return (
        (x.nombre_actividad &&
          x.nombre_actividad.toLowerCase().includes(term.toLowerCase())) ||
        !term
      );
    };
  };

  return (
    <>
      <input
        className="w-50 rounded-2 ms-3 me-3 "
        type="text"
        placeholder={`Buscar Actividad...`}
        value={term}
        name="term"
        onChange={({ target }) => setTerm(target.value)}
      />
      <div className="actividad-container">
        {actividades.length > 0 ? (
          data.filter(searchingTerm(term)).map((actividad) => (
            <div
              className="card mt-2"
              style={{ width: "18rem" }}
              key={actividad.id_actividad}
            >
              <div className="imagen-container mt-3">
                {actividad.imagen_1.length > 0 ? (
                  <img
                    src={actividad.imagen_1}
                    alt="actividad"
                    className="actividad-imagen"
                  />
                ) : (
                  <MdAutoStories className="actividad-imagen" />
                )}
              </div>

              <div className="card-body">
                <h4 className="card-title">{actividad.nombre_actividad}</h4>
                <p className="card-text">
                  {" "}
                  <b>Materia: </b>
                  {listaMaterias.map((materia) => {
                    if (actividad.id_materia === materia.id_materia) {
                      return materia.nombre_materia;
                    }
                  })}
                </p>
                <p className="card-text">
                  <b>Objectivo: </b> {actividad.objectivo}
                </p>
                <div className="d-flex justify-content-around mt-2">
                  <button
                    onClick={() => navegarActividad(actividad)}
                    className="btn btn-primary me-2 btn-sm"
                  >
                    <MdVisibility />
                  </button>

                  {user.role !== 4 && (
                    <>
                      <button
                        className="btn btn-warning "
                        onClick={() => seleccionActividadEditar(actividad)}
                      >
                        <MdModeEdit />
                      </button>
                      <button
                        className="btn btn-danger "
                        onClick={() => seleccionActividadEliminar(actividad)}
                      >
                        <MdDelete />
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))
        ) : (
          <h2>no hay actividades</h2>
        )}
      </div>
      <Modal
        show={modalEditar}
        dismiss={modalOpen}
        header={"Editar Actividad"}
        body={<EditarActividad cerrarModales={modalOpen} />}
      />

      <ModalEliminar
        show={modalEliminar}
        dismiss={modalOpen}
        accionEliminar={eliminar}
      />
    </>
  );
};
