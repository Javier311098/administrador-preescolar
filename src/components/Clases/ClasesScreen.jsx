import React, { useEffect } from "react";
import { useState } from "react";
import { Modal } from "../Modal/Modal";
import { BotonesArriba } from "../Botones/BotonesArriba";
import { useDispatch, useSelector } from "react-redux";
import { Spinner } from "../Spinner/Spinner";
import { AgregarClase } from "./AgregarClase";
import {
  obtenerClasePorGrado,
  obtenerClases,
} from "../../store/slicers/clasesActions";
import { ListaClases } from "./ListaClases";
import { obtenerPeriodos } from "../../store/slicers/periodosActions";
import { obtenerActividades } from "../../store/slicers/actividadesActions";
import { obtenerGrados } from "../../store/slicers/gradosActions";

export const ClasesScreen = () => {
  const [modalAgregar, setModalAgregar] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const modalOpen = () => {
    setModalAgregar(false);
  };
  const { isLoading, listaClases } = useSelector((state) => state.clases);
  const dispatch = useDispatch();

  useEffect(() => {
    if (user.role !== 1) {
      dispatch(obtenerClasePorGrado(user.uid, user.role));
    } else {
      dispatch(obtenerClases(user.role));
    }
    dispatch(obtenerGrados(user.role));
    dispatch(obtenerPeriodos(user.role));
    dispatch(obtenerActividades(user.role));
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
