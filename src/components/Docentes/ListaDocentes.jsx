import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { Modal } from "../Modal/Modal";
import { ModalEliminar } from "../Modal/ModalEliminar";
import { MdVisibility, MdDelete, MdModeEdit, MdSchool } from "react-icons/md";
import { seleccionarDocente } from "../../store/slicers/docentesSlice";
import moment from "moment";
import "./docente.css";
import { EditarDocente } from "./EditarDocente";
import { comenzarBajaDocente } from "../../store/slicers/docentesActions";

export const ListaDocentes = ({ docentes = [] }) => {
  const [modalEditar, setModalEditar] = useState(false);
  const [modalEliminar, setModalEliminar] = useState(false);
  const { docenteSeleccionado } = useSelector((state) => state.docentes);
  const [data, setData] = useState([]);
  const [term, setTerm] = useState("");

  useEffect(() => {
    setData(docentes);
  }, []);

  const dispatch = useDispatch();
  const modalOpen = () => {
    setModalEditar(false);
    setModalEliminar(false);
  };

  const seleccionDocenteEliminar = (value) => {
    setModalEliminar(true);
    dispatch(seleccionarDocente(value));
    localStorage.setItem("docente", JSON.stringify(value));
  };

  const seleccionDocenteEditar = (value) => {
    setModalEditar(true);
    dispatch(seleccionarDocente(value));
  };

  const eliminar = () => {
    dispatch(comenzarBajaDocente(docenteSeleccionado.id_usuario));
    setModalEliminar(false);
  };

  const searchingTerm = (term) => {
    return function (x) {
      return (
        (x.nombre_usuario &&
          x.nombre_usuario.toLowerCase().includes(term.toLowerCase())) ||
        !term
      );
    };
  };

  return (
    <>
      <input
        className="w-50 rounded-2 ms-3 me-3 "
        type="text"
        placeholder={`Buscar Docente...`}
        value={term}
        name="term"
        onChange={({ target }) => setTerm(target.value)}
      />
      <div className="body-container">
        {docentes.length > 0 ? (
          data.filter(searchingTerm(term)).map((docente) => (
            <div
              className="card mt-2"
              style={{ width: "18rem" }}
              key={docente.id_usuario}
            >
              <div className="imagen-container mt-3">
                {docente.foto_usuario.length > 0 ? (
                  <img
                    src={docente.foto_usuario}
                    className="docente-imagen"
                    alt="docente"
                  />
                ) : (
                  <MdSchool className="docente-imagen" />
                )}
              </div>

              <div className="card-body">
                <h5 className="card-title">
                  {docente.nombre_usuario.toUpperCase()}
                </h5>

                <p className="card-text">
                  Direccion:{docente.direccion_residencia}
                </p>
                <p className="card-text">Edad:{docente.edad}</p>
                <p className="card-text">
                  Tel.Emergencia:{docente.telefono_emergencia_1}
                </p>
                <p className="card-text">
                  Fecha de Nacimiento:
                  {moment(docente.fecha_nacimiento).format("D/MM/yyyy")}
                </p>
                <p className="card-text">Grado:{docente.id_grado}</p>
                <div className="d-flex justify-content-evenly">
                  {/* <NavLink
                    to="/docentes/calificaciones"
                    className="btn btn-primary "
                  >
                    <MdVisibility />
                  </NavLink> */}

                  <button
                    className="btn btn-warning "
                    onClick={() => seleccionDocenteEditar(docente)}
                  >
                    <MdModeEdit />
                  </button>
                  <button
                    className="btn btn-danger justify-content-between"
                    onClick={() => seleccionDocenteEliminar(docente)}
                  >
                    <MdDelete />
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <h2>no hay docentes</h2>
        )}
      </div>
      <Modal
        show={modalEditar}
        dismiss={modalOpen}
        header={"Editar Docente"}
        body={<EditarDocente cerrarModales={modalOpen} />}
      />

      <ModalEliminar
        show={modalEliminar}
        dismiss={modalOpen}
        accionEliminar={eliminar}
      />
    </>
  );
};
