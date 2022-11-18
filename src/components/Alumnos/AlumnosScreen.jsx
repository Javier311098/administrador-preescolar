import React, { useEffect } from "react";
import { useState } from "react";
import { Modal } from "../Modal/Modal";

import { BotonesArriba } from "../Botones/BotonesArriba";
import { useDispatch, useSelector } from "react-redux";

import { Spinner } from "../Spinner/Spinner";
import { ListaAlumnos } from "./ListaAlumnos";
import { obtenerAlumnos } from "../../store/slicers/alumnosActions";
import { AgregarAlumno } from "./AgregarAlumno";
import { obtenerGrados } from "../../store/slicers/gradosActions";

export const AlumnosScreen = () => {
  const [modalAgregar, setModalAgregar] = useState(false);

  const modalOpen = () => {
    setModalAgregar(false);
  };
  const { isLoading, listaAlumnos } = useSelector((state) => state.alumnos);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(obtenerAlumnos());
    dispatch(obtenerGrados());
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
