import { Navbar } from "../components/Navbar/Navbar";
import { Routes, Route, Navigate } from "react-router-dom";

import { MateriaScreen } from "../components/Materia/MateriaScreen";

import { ListaMaestros } from "../components/Docentes/ListaMaestros";
import { ListaAlumnos } from "../components/Alumnos/ListaAlumnos";
import { ListaPadres } from "../components/Padres/ListaPadres";
import { MaterialDidactico } from "../components/Activades/MaterialDidactico";
import { MaterialDidacticoLista } from "../components/Activades/MaterialDidacticoLista";
import { GradosScreen } from "../components/Grados/GradosScreen";
import { PeriodosScreen } from "../components/Periodos/PeriodosScreen";

export const DashboardRoutes = () => {
  return (
    <>
      <Navbar />
      <div className="container">
        <Routes>
          <Route path="/" element={<MateriaScreen />} />
          <Route path="materiales" element={<MaterialDidactico />} />
          <Route path="docentes" element={<ListaMaestros />} />
          <Route path="alumnos" element={<ListaAlumnos />} />
          <Route path="padres" element={<ListaPadres />} />
          <Route path="actividades" element={<MaterialDidacticoLista />} />
          <Route path="grados" element={<GradosScreen />} />
          <Route path="periodos" element={<PeriodosScreen />} />
          <Route
            path="/actividades/:idActividad"
            element={<MaterialDidactico />}
          />
          <Route path="/*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </>
  );
};
