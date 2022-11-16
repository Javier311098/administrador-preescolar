import React, { useEffect } from "react";
import { useState } from "react";
import { Modal } from "../Modal/Modal";
import { AgregarMateria } from "./AgregarMateria";
import { ListaMaterias } from "./ListaMaterias";
import { BotonesArriba } from "../Botones/BotonesArriba";
import { useDispatch, useSelector } from "react-redux";
import { obtenerMaterias } from "../../store/slicers/materiasActions";
import { Spinner } from "../Spinner/Spinner";

export const MateriaScreen = () => {
  const [modalAgregar, setModalAgregar] = useState(false);

  const modalOpen = () => {
    setModalAgregar(false);
  };
  const { isLoading, listaMaterias } = useSelector((state) => state.materias);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(obtenerMaterias());
  }, []);

  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          <h2 className="text-center">Materias</h2>
          <BotonesArriba
            accion={() => setModalAgregar(true)}
            buscar={"materia"}
            lista={listaMaterias}
          />

          <ListaMaterias materias={listaMaterias} />

          <Modal
            show={modalAgregar}
            dismiss={modalOpen}
            header={"Agregar Materia"}
            body={<AgregarMateria cerrarModales={modalOpen} />}
          />
        </>
      )}
    </>
  );
};
