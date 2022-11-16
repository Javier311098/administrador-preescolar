import React from "react";
import reactDom from "react-dom";
import { IoIosCloseCircle } from "react-icons/io";
import "./modal.css";

export const Modal = ({ show, dismiss, header, body }) => {
  const modal = (
    <>
      <div className="modal-background">
        <div className="modal-container">
          <div className="modal-header">
            <button className="modal-dismiss" onClick={dismiss}>
              <IoIosCloseCircle />
            </button>
            {header}
          </div>
          <div className="modal-body"> {body}</div>
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
