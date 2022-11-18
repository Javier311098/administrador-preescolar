import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./auth/authSlice";
import { actividadesSlice } from "./slicers/actividadesSlice";
import { alumnosSlice } from "./slicers/alumnosSlice";
import { calificacionesSlice } from "./slicers/calificacionesSlice";
import { docentesSlice } from "./slicers/docentesSlice";
import { gradosSlice } from "./slicers/gradosSlice";
import { materiasSlice } from "./slicers/materiasSlice";
import { padresSlice } from "./slicers/padresSlice";
import { periodosSlice } from "./slicers/periodosSlice";

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    alumnos: alumnosSlice.reducer,
    docentes: docentesSlice.reducer,
    padres: padresSlice.reducer,
    materias: materiasSlice.reducer,
    actividades: actividadesSlice.reducer,
    periodos: periodosSlice.reducer,
    grados: gradosSlice.reducer,
    calificaciones: calificacionesSlice.reducer,
  },
});
