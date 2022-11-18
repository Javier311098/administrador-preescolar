import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { Modal } from "../Modal/Modal";
import { ModalEliminar } from "../Modal/ModalEliminar";
import { MdVisibility, MdDelete, MdModeEdit, MdSchool } from "react-icons/md";
import { seleccionarAlumno } from "../../store/slicers/alumnosSlice";
import moment from "moment";
import "./alumno.css";
import { EditarAlumno } from "./EditarAlumno";
import {
  comenzarBajaAlumno,
  comenzarCrearAlumno,
} from "../../store/slicers/alumnosActions";

export const ListaAlumnos = ({ alumnos = [] }) => {
  const [modalEditar, setModalEditar] = useState(false);
  const [modalEliminar, setModalEliminar] = useState(false);
  const { alumnoSeleccionado } = useSelector((state) => state.alumnos);
  const [data, setData] = useState([]);
  const [term, setTerm] = useState("");

  useEffect(() => {
    setData(alumnos);
  }, [term, alumnos]);

  const dispatch = useDispatch();
  const modalOpen = () => {
    setModalEditar(false);
    setModalEliminar(false);
  };

  const seleccionAlumnoEliminar = (value) => {
    setModalEliminar(true);
    dispatch(seleccionarAlumno(value));
    localStorage.setItem("alumno", JSON.stringify(value));
  };

  const seleccionAlumnoEditar = (value) => {
    setModalEditar(true);
    dispatch(seleccionarAlumno(value));
  };

  const eliminar = () => {
    dispatch(comenzarBajaAlumno(alumnoSeleccionado.id_usuario));
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
        placeholder={`Buscar Alumno...`}
        value={term}
        name="term"
        onChange={({ target }) => setTerm(target.value)}
      />
      <div className="body-container">
        {alumnos.length > 0 ? (
          data.filter(searchingTerm(term)).map((alumno) => (
            <div
              className="card mt-2"
              style={{ width: "18rem" }}
              key={alumno.id_usuario}
            >
              <div className="imagen-container mt-3">
                {alumno.foto_usuario.length > 0 ? (
                  <img
                    src={alumno.foto_usuario}
                    className="alumno-imagen"
                    alt="alumno"
                  />
                ) : (
                  <MdSchool className="alumno-imagen" />
                )}
              </div>

              <div className="card-body">
                <h5 className="card-title">
                  {alumno.nombre_usuario.toUpperCase()}
                </h5>

                <p className="card-text">
                  Direccion:{alumno.direccion_residencia}
                </p>
                <p className="card-text">Edad:{alumno.edad}</p>
                <p className="card-text">
                  Tel.Emergencia:{alumno.telefono_emergencia_1}
                </p>
                <p className="card-text">
                  Fecha de Nacimiento:
                  {moment(alumno.fecha_nacimiento).format("D/MM/yyyy")}
                </p>
                <p className="card-text">Grado:{alumno.id_grado}</p>
                <div className="d-flex justify-content-evenly">
                  <NavLink
                    to="/alumnos/calificaciones"
                    className="btn btn-primary "
                  >
                    <MdVisibility />
                  </NavLink>

                  <button
                    className="btn btn-warning "
                    onClick={() => seleccionAlumnoEditar(alumno)}
                  >
                    <MdModeEdit />
                  </button>
                  <button
                    className="btn btn-danger justify-content-between"
                    onClick={() => seleccionAlumnoEliminar(alumno)}
                  >
                    <MdDelete />
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <h2>no hay alumnos</h2>
        )}
      </div>
      <Modal
        show={modalEditar}
        dismiss={modalOpen}
        header={"Editar Alumno"}
        body={<EditarAlumno cerrarModales={modalOpen} />}
      />

      <ModalEliminar
        show={modalEliminar}
        dismiss={modalOpen}
        accionEliminar={eliminar}
      />
    </>
  );
};