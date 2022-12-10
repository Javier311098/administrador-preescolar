import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Modal } from "../Modal/Modal";
import { ModalEliminar } from "../Modal/ModalEliminar";
import { MdDelete, MdModeEdit } from "react-icons/md";
import { FaChalkboardTeacher } from "react-icons/fa";
import { seleccionarDocente } from "../../store/slicers/docentesSlice";
import "./docente.css";
import { EditarDocente } from "./EditarDocente";
import { comenzarBajaDocente } from "../../store/slicers/docentesActions";

export const ListaDocentes = ({ docentes = [] }) => {
  const [modalEditar, setModalEditar] = useState(false);
  const [modalEliminar, setModalEliminar] = useState(false);
  const { docenteSeleccionado } = useSelector((state) => state.docentes);
  const { listaGrados } = useSelector((state) => state.grados);
  const [data, setData] = useState([]);
  const [term, setTerm] = useState("");

  useEffect(() => {
    setData(docentes);
  }, [docentes, term]);

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
                {docente.foto_usuario?.length > 0 ? (
                  <img
                    src={docente.foto_usuario}
                    className="docente-imagen"
                    alt="docente"
                  />
                ) : (
                  <FaChalkboardTeacher className="docente-imagen" />
                )}
              </div>

              <div className="card-body">
                <h5 className="card-title">
                  {docente.nombre_usuario.toUpperCase()}
                </h5>

                <p className="card-text">
                  <b> Grado: </b>
                  {listaGrados.map((grado) => {
                    if (docente.id_grado === grado.id_grado) {
                      return grado.nombre_grado;
                    }
                  })}
                </p>
                <p className="card-text">
                  <b>Edad: </b>
                  {docente.edad}
                </p>
                <p className="card-text">
                  <b>Telefono: </b>
                  {docente.telefono}
                </p>
                <p className="card-text">
                  <b>Correo: </b>
                  {docente.correo_electronico}
                </p>

                <div className="d-flex justify-content-evenly">
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
