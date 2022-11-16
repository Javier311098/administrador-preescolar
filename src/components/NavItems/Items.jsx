import React from "react";
import { NavLink } from "react-router-dom";
import { useAuthStore } from "../../hooks/useAuthStore";
import { MdOutlineLogout } from "react-icons/md";

export const Items = () => {
  const { startLogout } = useAuthStore();
  const cerrarSesion = () => {
    startLogout();
  };
  return (
    <>
      <NavLink to="docentes" className="nav-link">
        Docentes
      </NavLink>

      <NavLink to="alumnos" className="nav-link">
        Alumnos
      </NavLink>

      <NavLink to="padres" className="nav-link">
        Padres
      </NavLink>

      <NavLink to="/" className="nav-link">
        Materias
      </NavLink>

      <NavLink to="/actividades" className="nav-link">
        Actividades
      </NavLink>

      <NavLink to="/clases" className="nav-link">
        Clases
      </NavLink>

      <NavLink to="/calificaciones" className="nav-link">
        Calificaciones
      </NavLink>

      <NavLink to="/periodos" className="nav-link">
        Periodos
      </NavLink>
      <NavLink to="/grados" className="nav-link">
        Grados
      </NavLink>
      <button onClick={cerrarSesion} className="btn btn-dark ">
        <MdOutlineLogout />
      </button>
    </>
  );
};
