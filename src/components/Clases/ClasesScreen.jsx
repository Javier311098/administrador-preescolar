import React, { useEffect } from "react";
import { useState } from "react";
import { Modal } from "../Modal/Modal";
import { BotonesArriba } from "../Botones/BotonesArriba";
import { useDispatch, useSelector } from "react-redux";
import { Spinner } from "../Spinner/Spinner";
import { AgregarClase } from "./AgregarClase";
import { obtenerClases } from "../../store/slicers/clasesActions";
import { ListaClases } from "./ListaClases";
import { obtenerPeriodos } from "../../store/slicers/periodosActions";
import { obtenerActividades } from "../../store/slicers/actividadesActions";
import { obtenerGrados } from "../../store/slicers/gradosActions";

export const ClasesScreen = () => {
  const [modalAgregar, setModalAgregar] = useState(false);

  const modalOpen = () => {
    setModalAgregar(false);
  };
  const { isLoading, listaClases } = useSelector((state) => state.clases);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(obtenerClases());
    dispatch(obtenerGrados());
    dispatch(obtenerPeriodos());
    dispatch(obtenerActividades());
  }, []);

  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          <h2 className="text-center">Clases</h2>
          <BotonesArriba accion={() => setModalAgregar(true)} />

          <ListaClases clases={listaClases} />

          <Modal
            show={modalAgregar}
            dismiss={modalOpen}
            header={"Agregar Clase"}
            body={<AgregarClase cerrarModales={modalOpen} />}
          />
        </>
      )}
    </>
  );
};
