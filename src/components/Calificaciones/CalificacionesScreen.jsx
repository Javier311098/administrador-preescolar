import React, { useEffect } from "react";
import { useState } from "react";
import { Modal } from "../Modal/Modal";
import { BotonesArriba } from "../Botones/BotonesArriba";
import { useDispatch, useSelector } from "react-redux";
import { Spinner } from "../Spinner/Spinner";
import { AgregarCalificacion } from "./AgregarCalificacion";
import { obtenerCalificaciones } from "../../store/slicers/calificacionesActions";
import { ListaCalificaciones } from "./ListaCalificaciones";
import { obtenerAlumnos } from "../../store/slicers/alumnosActions";
import { obtenerPeriodos } from "../../store/slicers/periodosActions";
import { obtenerMaterias } from "../../store/slicers/materiasActions";

export const CalificacionesScreen = () => {
  const [modalAgregar, setModalAgregar] = useState(false);

  const modalOpen = () => {
    setModalAgregar(false);
  };
  const { isLoading, listaCalificaciones } = useSelector(
    (state) => state.calificaciones
  );
  const dispatch = useDispatch();
  const alumno = JSON.parse(localStorage.getItem("alumno"));
  useEffect(() => {
    dispatch(obtenerCalificaciones());
    dispatch(obtenerAlumnos());
    dispatch(obtenerPeriodos());
    dispatch(obtenerMaterias());
  }, []);

  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          <h2 className="text-center">
            Calificaciones para {alumno.nombre_usuario}
          </h2>

          <BotonesArriba accion={() => setModalAgregar(true)} />

          <ListaCalificaciones calificaciones={listaCalificaciones} />

          <Modal
            show={modalAgregar}
            dismiss={modalOpen}
            header={"Agregar Calificacion"}
            body={<AgregarCalificacion cerrarModales={modalOpen} />}
          />
        </>
      )}
    </>
  );
};
