import React from "react";
import { NavLink } from "react-router-dom";
import { useAuthStore } from "../../hooks/useAuthStore";
import { MdOutlineLogout } from "react-icons/md";
import { useSelector } from "react-redux";

export const Items = () => {
  const { startLogout } = useAuthStore();
  const { user } = useSelector((state) => state.auth);
  const cerrarSesion = () => {
    startLogout();
  };
  return (
    <>
      {user.role === 1 && (
        <>
          <NavLink to="docentes" className="nav-link">
            Docentes
          </NavLink>
          <NavLink to="padres" className="nav-link">
            Padres
          </NavLink>
        </>
      )}

      <NavLink to="alumnos" className="nav-link">
        {user.role === 4 ? "Mi Hijo/a" : "Alumnos"}
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

      {user.role !== 4 && (
        <>
          <NavLink to="/periodos" className="nav-link">
            Periodos
          </NavLink>
          <NavLink to="/grados" className="nav-link">
            Grados
          </NavLink>
        </>
      )}

      <button onClick={cerrarSesion} className="btn btn-dark ">
        <MdOutlineLogout />
      </button>
    </>
  );
};
