import { useState } from "react";
import { Toast } from "react-bootstrap";

export const ToastComponent = ({ mensaje, titulo }) => {
  const [show, setShow] = useState(true);

  return (
    <div className="fixed-top ">
      <Toast onClose={() => setShow(!show)} autohide show={show} delay={4500}>
        <Toast.Header className="d-flex justify-content-between fw-bold ">
          <strong>{titulo}</strong>
        </Toast.Header>
        <Toast.Body className="fs-6">{mensaje}</Toast.Body>
      </Toast>
    </div>
  );
};
