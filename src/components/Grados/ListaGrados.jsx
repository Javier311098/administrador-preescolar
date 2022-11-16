import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { seleccionarGrado } from "../../store/slicers/gradosSlice";
import { Modal } from "../Modal/Modal";
import { ModalEliminar } from "../Modal/ModalEliminar";
import { EditarGrado } from "./EditarGrado";
import gradoImg from "../../imagenes/grado.jpeg";
import { comenzarBajaGrado } from "../../store/slicers/gradosActions";
export const ListaGrados = ({ grados = [] }) => {
  const [modalEditar, setModalEditar] = useState(false);
  const [modalEliminar, setModalEliminar] = useState(false);
  const { gradoSeleccionado } = useSelector((state) => state.grados);
  const [data, setData] = useState([]);
  const [term, setTerm] = useState("");

  useEffect(() => {
    setData(grados);
  }, [term, grados]);

  const dispatch = useDispatch();
  const modalOpen = () => {
    setModalEditar(false);
    setModalEliminar(false);
  };

  const seleccionGradoEliminar = (value) => {
    setModalEliminar(true);
    dispatch(seleccionarGrado(value));
  };

  const seleccionGradoEditar = (value) => {
    setModalEditar(true);
    dispatch(seleccionarGrado(value));
  };

  const eliminar = () => {
    dispatch(comenzarBajaGrado(gradoSeleccionado.id_grado));
    setModalEliminar(false);
  };

  const searchingTerm = (term) => {
    return function (x) {
      return (
        (x.nombre_grado &&
          x.nombre_grado.toLowerCase().includes(term.toLowerCase())) ||
        !term
      );
    };
  };

  return (
    <>
      <input
        className="w-50 rounded-2 ms-3 me-3 "
        type="text"
        placeholder={`Buscar Grados...`}
        value={term}
        name="term"
        onChange={({ target }) => setTerm(target.value)}
      />
      <div className="body-container">
        {grados.length > 0 ? (
          data.filter(searchingTerm(term)).map((grado) => (
            <div
              className="card mt-2"
              style={{ width: "18rem" }}
              key={grado.id_grado}
            >
              <img src={gradoImg} className="card-img-top h-50 " alt="grados" />
              <div className="card-body">
                <h5 className="card-title">
                  {grado.nombre_grado.toUpperCase()}
                </h5>

                <div className="d-flex justify-content-between">
                  <button
                    className="btn btn-warning"
                    onClick={() => seleccionGradoEditar(grado)}
                  >
                    Editar
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() => seleccionGradoEliminar(grado)}
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <h2>no hay grados</h2>
        )}
      </div>
      <Modal
        show={modalEditar}
        dismiss={modalOpen}
        header={"Editar Grado"}
        body={<EditarGrado cerrarModales={modalOpen} />}
      />

      <ModalEliminar
        show={modalEliminar}
        dismiss={modalOpen}
        accionEliminar={eliminar}
      />
    </>
  );
};
