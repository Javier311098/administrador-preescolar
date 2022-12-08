import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { comenzarBajaMateria } from "../../store/slicers/materiasActions";
import { seleccionarMateria } from "../../store/slicers/materiasSlice";
import { Modal } from "../Modal/Modal";
import { ModalEliminar } from "../Modal/ModalEliminar";
import { EditarMateria } from "./EditarMateria";
import { MdDelete, MdModeEdit } from "react-icons/md";
import { TbMath } from "react-icons/tb";
import "./materias.css";

export const ListaMaterias = ({ materias = [] }) => {
  const { user } = useSelector((state) => state.auth);
  const [modalEditar, setModalEditar] = useState(false);
  const [modalEliminar, setModalEliminar] = useState(false);
  const { materiaSeleccionada } = useSelector((state) => state.materias);
  const [data, setData] = useState([]);
  const [term, setTerm] = useState("");

  useEffect(() => {
    setData(materias);
  }, [term, materias]);

  const dispatch = useDispatch();
  const modalOpen = () => {
    setModalEditar(false);
    setModalEliminar(false);
  };

  const seleccionMateriaEliminar = (value) => {
    setModalEliminar(true);
    dispatch(seleccionarMateria(value));
  };

  const seleccionMateriaEditar = (value) => {
    setModalEditar(true);
    dispatch(seleccionarMateria(value));
  };

  const eliminar = () => {
    dispatch(comenzarBajaMateria(materiaSeleccionada.id_materia));
    setModalEliminar(false);
  };

  const searchingTerm = (term) => {
    return function (x) {
      return (
        (x.nombre_materia &&
          x.nombre_materia.toLowerCase().includes(term.toLowerCase())) ||
        !term
      );
    };
  };

  return (
    <>
      <input
        className="w-50 rounded-2 ms-3 me-3 "
        type="text"
        placeholder={`Buscar Materia...`}
        value={term}
        name="term"
        onChange={({ target }) => setTerm(target.value)}
      />
      <div className="materia-container">
        {materias.length > 0 ? (
          data.filter(searchingTerm(term)).map((materia) => (
            <div
              className="card mt-2"
              style={{ width: "18rem" }}
              key={materia.id_materia}
            >
              <div className="imagen-container mt-3">
                <TbMath className=" materia-imagen" />
              </div>

              <div className="card-body">
                <h5 className="card-title">{materia.nombre_materia}</h5>
                <p className="card-text">{materia.descripcion}</p>

                {user.role !== 4 && (
                  <div className="d-flex justify-content-around">
                    <button
                      className="btn btn-warning mt-2"
                      onClick={() => seleccionMateriaEditar(materia)}
                    >
                      <MdModeEdit />
                    </button>
                    <button
                      className="btn btn-danger mt-2"
                      onClick={() => seleccionMateriaEliminar(materia)}
                    >
                      <MdDelete />
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))
        ) : (
          <h2>no hay materias</h2>
        )}
      </div>
      <Modal
        show={modalEditar}
        dismiss={modalOpen}
        header={"Editar Materia"}
        body={<EditarMateria cerrarModales={modalOpen} />}
      />

      <ModalEliminar
        show={modalEliminar}
        dismiss={modalOpen}
        accionEliminar={eliminar}
      />
    </>
  );
};
