import { Navbar } from "../components/Navbar/Navbar";
import { Routes, Route, Navigate } from "react-router-dom";

import { MateriaScreen } from "../components/Materia/MateriaScreen";
import { MaterialDidactico } from "../components/Activades/MaterialDidactico";
import { MaterialDidacticoLista } from "../components/Activades/MaterialDidacticoLista";
import { GradosScreen } from "../components/Grados/GradosScreen";
import { PeriodosScreen } from "../components/Periodos/PeriodosScreen";
import { AlumnosScreen } from "../components/Alumnos/AlumnosScreen";
import { PadresScreen } from "../components/Padres/PadresScreen";
import { DocentesScreen } from "../components/Docentes/DocentesScreen";
import { CalificacionesScreen } from "../components/Calificaciones/CalificacionesScreen";
import { ClasesScreen } from "../components/Clases/ClasesScreen";

export const DashboardRoutes = () => {
  return (
    <>
      <Navbar />
      <div className="container">
        <Routes>
          <Route path="/" element={<MateriaScreen />} />
          <Route path="materiales" element={<MaterialDidactico />} />
          <Route path="docentes" element={<DocentesScreen />} />
          <Route path="alumnos" element={<AlumnosScreen />} />
          <Route path="padres" element={<PadresScreen />} />
          <Route path="actividades" element={<MaterialDidacticoLista />} />
          <Route path="grados" element={<GradosScreen />} />
          <Route
            path="alumnos/calificaciones"
            element={<CalificacionesScreen />}
          />
          <Route path="clases" element={<ClasesScreen />} />
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
