import React from "react";
import reactDom from "react-dom";
import { ModalBodyEliminar } from "./ModalBodyEliminar";
import "./modal.css";

export const ModalEliminar = ({ show, dismiss, accionEliminar }) => {
  const modal = (
    <>
      <div className="modal-background">
        <div className="modal-container">
          <div className="modal-header text-danger d-flex justify-content-end">
            ADVERTENCIA
          </div>
          <div className="modal-body">
            <ModalBodyEliminar
              dismiss={dismiss}
              accionEliminar={accionEliminar}
            />
          </div>
        </div>
      </div>
    </>
  );

  return (
    <>
      {show &&
        reactDom.createPortal(modal, document.getElementById("modal-root"))}
    </>
  );
};
