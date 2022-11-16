import React from "react";

export const ModalBodyEliminar = ({ dismiss, accionEliminar }) => {
  return (
    <>
      <p>
        La siguiente accion eliminara el registro seleccionado y
        <b> no es reversible.</b>
        <br />
        ¿Desea continuar?
      </p>
      <div className="d-flex justify-content-end">
        <button className="btn btn-primary me-4" onClick={dismiss}>
          Cancelar
        </button>
        <button className="btn btn-danger" onClick={accionEliminar}>
          Eliminar
        </button>
      </div>
    </>
  );
};
