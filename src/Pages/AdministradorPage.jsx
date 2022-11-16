import React from "react";
import { RegistroScreen } from "../components/Administradores/RegistroScreen";
import { Navbar } from "../components/Navbar/Navbar";

export const AdministradorPage = () => {
  return (
    <>
      <Navbar permiso={"admin"} />
      <RegistroScreen />
    </>
  );
};
