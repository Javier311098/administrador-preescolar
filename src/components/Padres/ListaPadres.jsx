import React, { useState } from "react";
import { Modal } from "../Modal/Modal";
import { Tabla } from "../Tabla/Tabla";
import { EditarPadre } from "./EditarPadre";
import { ModalEliminar } from "../Modal/ModalEliminar";
import { BotonesArriba } from "../Botones/BotonesArriba";
import { Navbar } from "../Navbar/Navbar";

export const ListaPadres = () => {
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

  const [showModal, setShowModal] = useState(false);
  const [modalEliminar, setModalEliminar] = useState(false);

  const modalOpen = () => {
    setShowModal(false);
    setModalEliminar(false);
  };
  return (
    <>
      <h2 className="text-center">Padres</h2>
      <BotonesArriba buscar={"padre"} />
      <Tabla
        headers={columnas}
        data={maestras}
        accionEliminar={() => setModalEliminar(true)}
        accionEditar={() => setShowModal(true)}
      />

      <Modal
        show={showModal}
        dismiss={modalOpen}
        header={"Editar Padre"}
        body={<EditarPadre />}
      />

      <ModalEliminar show={modalEliminar} dismiss={modalOpen} />
    </>
  );
};
