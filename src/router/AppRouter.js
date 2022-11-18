import React, { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import { LoginScreen } from "../components/Login/LoginScreen";
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
