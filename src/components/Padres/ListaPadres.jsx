import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Modal } from "../Modal/Modal";
import { ModalEliminar } from "../Modal/ModalEliminar";
import { MdDelete, MdModeEdit } from "react-icons/md";
import { RiParentFill } from "react-icons/ri";
import "./padre.css";
import { EditarPadre } from "./EditarPadre";

import {
  comenzarBajaPadre,
  obtenerRelacionPadre,
} from "../../store/slicers/padreActions";
import { seleccionarPadre } from "../../store/slicers/padresSlice";

export const ListaPadres = ({ padres = [] }) => {
  const [modalEditar, setModalEditar] = useState(false);
  const [modalEliminar, setModalEliminar] = useState(false);
  const { padreSeleccionado } = useSelector((state) => state.padres);
  const [data, setData] = useState([]);
  const [term, setTerm] = useState("");

  useEffect(() => {
    setData(padres);
  }, [term, padres]);

  const dispatch = useDispatch();
  const modalOpen = () => {
    setModalEditar(false);
    setModalEliminar(false);
  };

  const seleccionPadreEliminar = (value) => {
    setModalEliminar(true);
    dispatch(seleccionarPadre(value));
    localStorage.setItem("padre", JSON.stringify(value));
  };

  const seleccionPadreEditar = (value) => {
    setModalEditar(true);
    dispatch(obtenerRelacionPadre(value.id_usuario));
    dispatch(seleccionarPadre(value));
  };

  const eliminar = () => {
    dispatch(comenzarBajaPadre(padreSeleccionado.id_usuario));
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
        placeholder={`Buscar Padre...`}
        value={term}
        name="term"
        onChange={({ target }) => setTerm(target.value)}
      />
      <div className="body-container">
        {padres.length > 0 ? (
          data.filter(searchingTerm(term)).map((padre) => (
            <div
              className="card mt-2"
              style={{ width: "18rem" }}
              key={padre.id_usuario}
            >
              <div className="imagen-container mt-3">
                {padre.foto_usuario.length > 0 ? (
                  <img
                    src={padre.foto_usuario}
                    className="padre-imagen"
                    alt="padre"
                  />
                ) : (
                  <RiParentFill className="padre-imagen" />
                )}
              </div>

              <div className="card-body">
                <h5 className="card-title">
                  {padre.nombre_usuario.toUpperCase()}
                </h5>

                <p className="card-text">
                  <b>Correo:</b> {padre.correo_electronico}
                </p>
                <p className="card-text">
                  <b>Edad:</b> {padre.edad}
                </p>
                <p className="card-text">
                  <b>Telefono:</b> {padre.telefono}
                </p>

                <div className="d-flex justify-content-evenly">
                  <button
                    className="btn btn-warning "
                    onClick={() => seleccionPadreEditar(padre)}
                  >
                    <MdModeEdit />
                  </button>
                  <button
                    className="btn btn-danger justify-content-between"
                    onClick={() => seleccionPadreEliminar(padre)}
                  >
                    <MdDelete />
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <h2>no hay padres</h2>
        )}
      </div>
      <Modal
        show={modalEditar}
        dismiss={modalOpen}
        header={"Editar Padre"}
        body={<EditarPadre cerrarModales={modalOpen} />}
      />

      <ModalEliminar
        show={modalEliminar}
        dismiss={modalOpen}
        accionEliminar={eliminar}
      />
    </>
  );
};
