import React, { useEffect } from "react";
import { useState } from "react";
import { Modal } from "../Modal/Modal";
import { BotonesArriba } from "../Botones/BotonesArriba";
import { useDispatch, useSelector } from "react-redux";
import { Spinner } from "../Spinner/Spinner";
import { obtenerMaterias } from "../../store/slicers/materiasActions";
import { AgregarActividad } from "./AgregarActividad";
import { obtenerActividades } from "../../store/slicers/actividadesActions";
import { ListaActividades } from "./ListaActividades";
import "./material_didactico.css";

export const ActividadesScreen = () => {
  const [modalAgregar, setModalAgregar] = useState(false);

  const modalOpen = () => {
    setModalAgregar(false);
  };
  const { isLoading, listaActividades } = useSelector(
    (state) => state.actividades
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(obtenerMaterias());
    dispatch(obtenerActividades());
  }, []);

  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          <h2 className="text-center">Actividades</h2>

          <BotonesArriba accion={() => setModalAgregar(true)} />

          <ListaActividades actividades={listaActividades} />

          <Modal
            show={modalAgregar}
            dismiss={modalOpen}
            header={"Agregar Actividad"}
            body={<AgregarActividad cerrarModales={modalOpen} />}
          />
        </>
      )}
    </>
  );
};
