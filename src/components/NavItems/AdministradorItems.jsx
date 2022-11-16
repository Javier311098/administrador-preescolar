import React from "react";
import { NavLink } from "react-router-dom";

export const AdministradorItems = () => {
  return (
    <>
      <NavLink to="administradores/usuarios" className="nav-link">
        Usuarios
      </NavLink>
      <NavLink to="/maestros/calendario" className="nav-link">
        Materias
      </NavLink>
      <NavLink to="/maestros/calendario" className="nav-link">
        Docentes
      </NavLink>
    </>
  );
};
