import React, { useEffect } from "react";
import { useState } from "react";
import { Modal } from "../Modal/Modal";
import { BotonesArriba } from "../Botones/BotonesArriba";
import { useDispatch, useSelector } from "react-redux";
import { obtenerGrados } from "../../store/slicers/gradosActions";
import { Spinner } from "../Spinner/Spinner";
import { ListaGrados } from "./ListaGrados";
import { AgregarGrado } from "./AgregarGrado";

export const GradosScreen = () => {
  const [modalAgregar, setModalAgregar] = useState(false);

  const modalOpen = () => {
    setModalAgregar(false);
  };
  const { isLoading, listaGrados } = useSelector((state) => state.grados);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(obtenerGrados());
  }, []);

  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          <h2 className="text-center">Grados</h2>
          <BotonesArriba accion={() => setModalAgregar(true)} />

          <ListaGrados grados={listaGrados} />

          <Modal
            show={modalAgregar}
            dismiss={modalOpen}
            header={"Agregar Grado"}
            body={<AgregarGrado cerrarModales={modalOpen} />}
          />
        </>
      )}
    </>
  );
};
