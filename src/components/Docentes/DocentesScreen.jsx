import React, { useEffect } from "react";
import { useState } from "react";
import { Modal } from "../Modal/Modal";

import { BotonesArriba } from "../Botones/BotonesArriba";
import { useDispatch, useSelector } from "react-redux";

import { Spinner } from "../Spinner/Spinner";
import { ListaDocentes } from "./ListaDocentes";
import { obtenerDocentes } from "../../store/slicers/docentesActions";
import { AgregarDocente } from "./AgregarDocente";
import { obtenerGrados } from "../../store/slicers/gradosActions";

export const DocentesScreen = () => {
  const [modalAgregar, setModalAgregar] = useState(false);

  const modalOpen = () => {
    setModalAgregar(false);
  };
  const { isLoading, listaDocentes } = useSelector((state) => state.docentes);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(obtenerDocentes());
    dispatch(obtenerGrados());
  }, []);

  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          <h2 className="text-center">Docentes</h2>
          <BotonesArriba accion={() => setModalAgregar(true)} />

          <ListaDocentes docentes={listaDocentes} />

          <Modal
            show={modalAgregar}
            dismiss={modalOpen}
            header={"Agregar Docente"}
            estiloContainer={"docente-modal"}
            body={<AgregarDocente cerrarModales={modalOpen} />}
          />
        </>
      )}
    </>
  );
};
