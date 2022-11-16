import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Items } from "../NavItems/Items";
import "./nav.css";

export const NavbarCelular = () => {
  let navigate = useNavigate();
  const cerrarSesion = () => {
    navigate("/login");
  };
  return (
    <div className="w-100 vh-100  position-absolute nav-cel ">
      <Items />
      <ul className="text-white"></ul>

      {/* <button onClick={cerrarSesion} className="btn btn-dark ">
        Cerrar Sesion
      </button> */}
    </div>
  );
};
