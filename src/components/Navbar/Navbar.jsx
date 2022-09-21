import React from "react";
import { useNavigate } from "react-router-dom";
import { AdministradorItems } from "../NavItems/AdministradorItems";
import { MaestroItems } from "../NavItems/MaestroItems";
import { Routes, Route } from "react-router-dom";
import { CalendarioScreen } from "../Calendario/CalendarioScreen";

export const Navbar = ({ permiso }) => {
  let navigate = useNavigate();
  const cerrarSesion = () => {
    navigate("/");
  };

  return (
    <>
      <Routes>
        <Route path="calendario" element={<CalendarioScreen />} />
      </Routes>

      <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
        <div class="container-fluid">
          <p className="text-white texto-center fs-5">Bienvenido Juan</p>
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
              {permiso === "admin" && <AdministradorItems />}
              {permiso === "maestro" && <MaestroItems />}
            </ul>
          </div>
          <button onClick={cerrarSesion} className="btn btn-dark">
            Cerrar Sesion
          </button>
        </div>
      </nav>
    </>
  );
};
