import { createSlice } from "@reduxjs/toolkit";

export const clasesSlice = createSlice({
  name: "clases",
  initialState: {
    listaClases: [],
    claseSeleccionada: {},
    isLoading: false,
    isModalOpen: false,
  },

  reducers: {
    cargando: (state) => {
      state.isLoading = true;
    },
    setClases: (state, { payload }) => {
      state.isLoading = false;
      state.listaClases = payload;
    },
    crearClase: (state, { payload }) => {
      state.listaClases = [...state.listaClases, payload];
      state.isModalOpen = false;
    },
    seleccionarClase: (state, { payload }) => {
      state.claseSeleccionada = payload;
    },
    editarClase: (state, { payload }) => {
      state.listaClases = state.listaClases.map((clase) =>
        clase.id_clase === payload.id_clase ? payload : clase
      );
    },
    darBaja: (state, { payload }) => {
      state.listaClases = state.listaClases.filter(
        (clase) => clase.id_clase !== payload
      );

      state.isModalOpen = false;
    },
  },
});

export const {
  cargando,
  setClases,
  crearClase,
  darBaja,
  editarClase,
  seleccionarClase,
} = clasesSlice.actions;
