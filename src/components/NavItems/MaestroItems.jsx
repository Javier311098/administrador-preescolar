import React from "react";
import { Routes, Route, NavLink } from "react-router-dom";
import { AdministradorPage } from "../../Pages/AdministradorPage";
import { CalendarioScreen } from "../Calendario/CalendarioScreen";

export const MaestroItems = () => {
  let isActive = true;
  return (
    <>
      {/* <li className="nav-item">
        <a className="nav-link active" aria-current="page" href="#">
          Calendario
        </a>
      </li>
      <li className="nav-item">
        <a className="nav-link" href="#">
          Materias
        </a>
      </li>
      <li className="nav-item">
        <a className="nav-link" href="#">
          Alumnos
        </a>
      </li> */}

      <NavLink to="/maestros/calendario" className="nav-link">
        Calendario
      </NavLink>
      <NavLink to="/maestros/materias" className="nav-link">
        Materias
      </NavLink>
      <NavLink to="/maestros/alumnos" className="nav-link">
        Alumnos
      </NavLink>
    </>
  );
};
