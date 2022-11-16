import React from "react";
import { useState } from "react";
import { Modal } from "../Modal/Modal";
import { EditarMaestro } from "./EditarMaestro";

import { Tabla } from "../Tabla/Tabla";
import { ModalEliminar } from "../Modal/ModalEliminar";
import { AgregarDocente } from "./AgregarDocente";

import { BotonesArriba } from "../Botones/BotonesArriba";

export const ListaMaestros = () => {
  const [modalAgregar, setModalAgregar] = useState(false);
  const [modalEditar, setModalEditar] = useState(false);
  const [modalEliminar, setModalEliminar] = useState(false);

  const modalOpen = () => {
    setModalAgregar(false);
    setModalEditar(false);
    setModalEliminar(false);
  };
  const columnas = ["Nombre", "Grupo", "Correo", "Celular"];
  const maestras = [
    {
      nombre: "juana",
      grupo: "1",
      correo: "example@example.com",
      celular: "1234567890",
    },
    {
      nombre: "angelica",
      grupo: "3",
      correo: "example@example.com",
      celular: "1234567890",
    },
    {
      nombre: "karina",
      grupo: "2",
      correo: "example@example.com",
      celular: "1234567890",
    },
  ];
  return (
    <>
      <h2 className="text-center">Docentes</h2>
      <BotonesArriba
        nombre={"Agregar Docente"}
        accion={() => setModalAgregar(true)}
        buscar={"docente"}
      />

      <Tabla
        headers={columnas}
        data={maestras}
        accionEditar={() => setModalEditar(true)}
        accionEliminar={() => setModalEliminar(true)}
      />

      <Modal
        show={modalAgregar}
        dismiss={modalOpen}
        header={"Agregar Docente"}
        body={<AgregarDocente />}
      />
      <Modal
        show={modalEditar}
        dismiss={modalOpen}
        header={"Editar Docente"}
        body={<EditarMaestro />}
      />
      <ModalEliminar show={modalEliminar} dismiss={modalOpen} />
    </>
  );
};
