import React, { useEffect } from "react";
import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import { MaterialDidactico } from "../components/Activades/MaterialDidactico";
import { MaterialDidacticoLista } from "../components/Activades/MaterialDidacticoLista";
import { ListaAlumnos } from "../components/Alumnos/ListaAlumnos";
import { ListaMaestros } from "../components/Docentes/ListaMaestros";
import { LoginScreen } from "../components/Login/LoginScreen";
import { MateriaScreen } from "../components/Materia/MateriaScreen";
import { ListaPadres } from "../components/Padres/ListaPadres";
import { Spinner } from "../components/Spinner/Spinner";
import { useAuthStore } from "../hooks/useAuthStore";
import { DashboardRoutes } from "./DashboardRoutes";
import { PrivateRoute } from "./PrivateRoute";

export default function AppRouter() {
  const { status, checkAuthToken } = useAuthStore();

  useEffect(() => {
    checkAuthToken();
  }, []);

  if (status === "checando") {
    return <Spinner />;
  }

  return (
    <Routes>
      {status === "no-autenticado" ? (
        <>
          <Route path="/login" element={<LoginScreen />} />
          <Route path="/*" element={<Navigate to="/login" />} />
        </>
      ) : (
        <>
          <Route
            path="/*"
            element={
              <PrivateRoute>
                <DashboardRoutes />
              </PrivateRoute>
            }
          />
        </>
      )}
    </Routes>
  );
}
