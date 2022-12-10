import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Modal } from "../Modal/Modal";
import { ModalEliminar } from "../Modal/ModalEliminar";
import { MdVisibility, MdDelete, MdModeEdit, MdSchool } from "react-icons/md";
import { seleccionarAlumno } from "../../store/slicers/alumnosSlice";
import moment from "moment";
import "./alumno.css";
import { EditarAlumno } from "./EditarAlumno";
import { comenzarBajaAlumno } from "../../store/slicers/alumnosActions";

export const ListaAlumnos = ({ alumnos = [] }) => {
  const { user } = useSelector((state) => state.auth);
  const [modalEditar, setModalEditar] = useState(false);
  const [modalEliminar, setModalEliminar] = useState(false);
  const { alumnoSeleccionado } = useSelector((state) => state.alumnos);
  const { listaGrados } = useSelector((state) => state.grados);
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
    localStorage.setItem("alumno", JSON.stringify(value));
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
                  <b>Direccion: </b> {alumno.direccion_residencia}
                </p>
                <p className="card-text">
                  <b>Edad: </b>
                  {alumno.edad}
                </p>
                <p className="card-text">
                  <b>Tel.Emergencia: </b> {alumno.telefono_emergencia_1}
                </p>
                <p className="card-text">
                  <b>Fecha de Nacimiento: </b>
                  {moment(alumno.fecha_nacimiento).format("D/MM/yyyy")}
                </p>
                <p className="card-text">
                  <b>Grado: </b>
                  {listaGrados.map((grado) => {
                    if (alumno.id_grado === grado.id_grado) {
                      return grado.nombre_grado;
                    }
                  })}
                </p>
                <div className="d-flex justify-content-evenly">
                  <Link
                    onClick={() => seleccionAlumnoEditar(alumno)}
                    to="calificaciones"
                    className="btn btn-primary "
                  >
                    <MdVisibility />
                  </Link>

                  {user.role !== 4 && (
                    <>
                      <button
                        className="btn btn-warning "
                        onClick={() => seleccionAlumnoEditar(alumno)}
                        disabled={user.role !== 1 ? true : false}
                      >
                        <MdModeEdit />
                      </button>
                      <button
                        className="btn btn-danger justify-content-between"
                        onClick={() => seleccionAlumnoEliminar(alumno)}
                        disabled={user.role !== 1 ? true : false}
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
