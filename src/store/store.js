import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./auth/authSlice";
import { actividadesSlice } from "./slicers/actividadesSlice";
import { gradosSlice } from "./slicers/gradosSlice";
import { materiasSlice } from "./slicers/materiasSlice";
import { periodosSlice } from "./slicers/periodosSlice";

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    materias: materiasSlice.reducer,
    actividades: actividadesSlice.reducer,
    periodos: periodosSlice.reducer,
    grados: gradosSlice.reducer,
  },
});
