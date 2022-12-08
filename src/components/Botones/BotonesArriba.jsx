import { useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { BsFillArrowLeftCircleFill } from "react-icons/bs";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export const BotonesArriba = ({ accion }) => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const irAtras = () => {
    navigate(-1);
  };
  return (
    <div className="d-flex justify-content-between mt-5 mb-3">
      <button className="btn btn-dark btn-sm " onClick={irAtras}>
        <BsFillArrowLeftCircleFill size={22} /> Regresar
      </button>
      {user.role !== 4 && (
        <button className="btn btn-success btn-sm " onClick={accion}>
          Agregar
          <AiOutlinePlus size={22} />
        </button>
      )}
    </div>
  );
};
