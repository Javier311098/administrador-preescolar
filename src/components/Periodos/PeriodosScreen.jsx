import React, { useEffect } from "react";
import { useState } from "react";
import { Modal } from "../Modal/Modal";
import { BotonesArriba } from "../Botones/BotonesArriba";
import { useDispatch, useSelector } from "react-redux";
import { Spinner } from "../Spinner/Spinner";
import { ListaPeriodos } from "./ListaPeriodos";
import { AgregarPeriodo } from "./AgregarPeriodo";
import { obtenerPeriodos } from "../../store/slicers/periodosActions";
import "./periodo.css";

export const PeriodosScreen = () => {
  const [modalAgregar, setModalAgregar] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const modalOpen = () => {
    setModalAgregar(false);
  };
  const { isLoading, listaPeriodos } = useSelector((state) => state.periodos);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(obtenerPeriodos(user.role));
  }, []);

  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          <h2 className="text-center">Periodos</h2>
          <BotonesArriba accion={() => setModalAgregar(true)} />

          <ListaPeriodos periodos={listaPeriodos} />

          <Modal
            show={modalAgregar}
            dismiss={modalOpen}
            estiloContainer="periodo-modal"
            header={"Agregar Periodo"}
            body={<AgregarPeriodo cerrarModales={modalOpen} />}
          />
        </>
      )}
    </>
  );
};
