import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  comenzarBajaActividad,
  obtenerActividades,
} from "../../store/slicers/actividadesActions";
import {
  abrirModal,
  seleccionarActividad,
} from "../../store/slicers/actividadesSlice";
import { obtenerMaterias } from "../../store/slicers/materiasActions";
import { BotonesArriba } from "../Botones/BotonesArriba";
import { Modal } from "../Modal/Modal";
import { ModalEliminar } from "../Modal/ModalEliminar";
import { Spinner } from "../Spinner/Spinner";
import { Tabla } from "../Tabla/Tabla";
import { AgregarActividad } from "./AgregarActividad";
import { EditarActividad } from "./EditarActividad";

const columnas = [
  "id_actividad",
  "nombre_actividad",
  "material",
  "objectivo",
  "instrucciones",
];

export const MaterialDidacticoLista = () => {
  const { user } = useSelector((state) => state.auth);
  const { isLoading, listaActividades, isModalOpen } = useSelector(
    (state) => state.actividades
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(obtenerActividades());
    dispatch(obtenerMaterias(user.role));
  }, []);

  const [modalAgregar, setModalAgregar] = useState(false);
  const [modalEliminar, setModalEliminar] = useState(false);
  const [modalEditar, setModalEditar] = useState(false);
  const modalOpen = () => {
    setModalEditar(false);
    setModalAgregar(false);
    setModalEliminar(false);
  };

  const paginaActividad = () => {};

  return (
    <>
      <h2 className="text-center">Actividades</h2>
      <BotonesArriba accion={() => setModalAgregar(true)} />
      {isLoading ? (
        <Spinner />
      ) : (
        <Tabla
          headers={columnas}
          buscador="nombre_actividad"
          data={listaActividades}
          accionEliminar={(value) => comenzarBajaActividad(value)}
          accionVer={paginaActividad}
          Children={<EditarActividad cerrarModales={modalOpen} />}
          seleccionar={(value) => seleccionarActividad(value)}
          navegacion="/actividades"
        />
      )}

      <Modal
        show={modalAgregar}
        dismiss={modalOpen}
        header={"Agregar Actividad"}
        body={<AgregarActividad cerrarModales={modalOpen} />}
      />
      <ModalEliminar show={modalEliminar} dismiss={modalOpen} />
    </>
  );
};
