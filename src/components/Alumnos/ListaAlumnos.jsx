import { useState } from "react";
import { BotonesArriba } from "../Botones/BotonesArriba";
import { ModalEliminar } from "../Modal/ModalEliminar";
import { Tabla } from "../Tabla/Tabla";

export const ListaAlumnos = () => {
  const columnas = ["Nombre", "Grado", "Turno"];
  const alumnos = [
    {
      nombre: "juana",
      grado: "1",
      turno: "matutino",
      celular: "1234567890",
    },
    {
      nombre: "angelica",
      grado: "3",
      turno: "matutino",
    },
    {
      nombre: "karina",
      grado: "2",
      turno: "matutino",
    },
    {
      nombre: "Karen",
      grado: "2",
      turno: "matutino",
    },
  ];
  const [modalEliminar, setModalEliminar] = useState(false);
  const modalOpen = () => {
    setModalEliminar(false);
  };
  return (
    <>
      <h2 className="text-center">Alumnos</h2>
      <BotonesArriba buscar={"alumno"} />
      <Tabla
        headers={columnas}
        data={alumnos}
        accionEliminar={() => setModalEliminar(true)}
      />

      <ModalEliminar show={modalEliminar} dismiss={modalOpen} />
    </>
  );
};
