import React, { useEffect } from "react";
import { useState } from "react";
import { Modal } from "../Modal/Modal";

import { BotonesArriba } from "../Botones/BotonesArriba";
import { useDispatch, useSelector } from "react-redux";

import { Spinner } from "../Spinner/Spinner";
import { ListaAlumnos } from "./ListaAlumnos";
import {
  obtenerAlumnos,
  obtenerEstudiantes,
} from "../../store/slicers/alumnosActions";
import { AgregarAlumno } from "./AgregarAlumno";
import { obtenerGrados } from "../../store/slicers/gradosActions";
import { reiniciarCalificaciones } from "../../store/slicers/calificacionesSlice";

export const AlumnosScreen = () => {
  const [modalAgregar, setModalAgregar] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const modalOpen = () => {
    setModalAgregar(false);
  };
  const { isLoading, listaAlumnos } = useSelector((state) => state.alumnos);
  const dispatch = useDispatch();

  useEffect(() => {
    if (user.role === 4 || user.role === 2) {
      dispatch(obtenerAlumnos(user.uid, user.role));
    } else {
      dispatch(obtenerAlumnos());
    }
    dispatch(reiniciarCalificaciones());
    dispatch(obtenerGrados(user.role));
  }, []);

  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          <h2 className="text-center">Alumnos</h2>
          <BotonesArriba accion={() => setModalAgregar(true)} />

          <ListaAlumnos alumnos={listaAlumnos} />

          <Modal
            show={modalAgregar}
            dismiss={modalOpen}
            header={"Agregar Alumno"}
            estiloContainer={"alumno-modal"}
            body={<AgregarAlumno cerrarModales={modalOpen} />}
          />
        </>
      )}
    </>
  );
};
