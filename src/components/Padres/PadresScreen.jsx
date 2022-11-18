import React, { useEffect } from "react";
import { useState } from "react";
import { Modal } from "../Modal/Modal";

import { BotonesArriba } from "../Botones/BotonesArriba";
import { useDispatch, useSelector } from "react-redux";

import { Spinner } from "../Spinner/Spinner";
import { ListaPadres } from "./ListaPadres";
import { obtenerPadres } from "../../store/slicers/padreActions";
import { AgregarPadre } from "./AgregarPadre";
import { obtenerAlumnos } from "../../store/slicers/alumnosActions";

export const PadresScreen = () => {
  const [modalAgregar, setModalAgregar] = useState(false);

  const modalOpen = () => {
    setModalAgregar(false);
  };
  const { isLoading, listaPadres } = useSelector((state) => state.padres);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(obtenerPadres());
    dispatch(obtenerAlumnos());
  }, []);

  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          <h2 className="text-center">Padres</h2>
          <BotonesArriba accion={() => setModalAgregar(true)} />

          <ListaPadres padres={listaPadres} />

          <Modal
            show={modalAgregar}
            dismiss={modalOpen}
            header={"Agregar padre"}
            estiloContainer={"padre-modal"}
            body={<AgregarPadre cerrarModales={modalOpen} />}
          />
        </>
      )}
    </>
  );
};
