import React from "react";
import { Routes, Route, Navigate, BrowserRouter } from "react-router-dom";
import { AlumnosScreen } from "../components/Alumnos/AlumnosScreen";
import { CalendarioScreen } from "../components/Calendario/CalendarioScreen";
import { LoginScreen } from "../components/Login/LoginScreen";
import { MateriaScreen } from "../components/Materia/MateriaScreen";
import { AdministradorPage } from "../Pages/AdministradorPage";
import { EstudiantesPage } from "../Pages/EstudiantesPage";
import { MaestrosPage } from "../Pages/MaestrosPage";

export default function AppRouter() {
  return (
    // <BrowserRouter>
    <Routes>
      <Route path="/" element={<LoginScreen />} />
      <Route path="maestros" element={<MaestrosPage />} />
      <Route path="estudiantes" element={<EstudiantesPage />} />
      <Route path="administradores" element={<AdministradorPage />} />
      <Route path="maestros/calendario" element={<CalendarioScreen />} />
      <Route path="maestros/materias" element={<MateriaScreen />} />
      <Route path="maestros/alumnos" element={<AlumnosScreen />} />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
    //  </BrowserRouter>
  );
}
