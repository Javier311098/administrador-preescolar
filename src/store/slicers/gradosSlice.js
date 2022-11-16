import { createSlice } from "@reduxjs/toolkit";

export const gradosSlice = createSlice({
  name: "grados",
  initialState: {
    listaGrados: [],
    gradoSeleccionado: {},
    isLoading: false,
    isModalOpen: false,
  },

  reducers: {
    cargando: (state) => {
      state.isLoading = true;
    },
    setGrados: (state, { payload }) => {
      state.isLoading = false;
      state.listaGrados = payload;
    },
    crearGrado: (state, { payload }) => {
      state.listaGrados = [...state.listaGrados, payload];
      state.isModalOpen = false;
    },
    seleccionarGrado: (state, { payload }) => {
      state.gradoSeleccionado = payload;
    },
    editarGrado: (state, { payload }) => {
      state.listaGrados = state.listaGrados.map((grado) =>
        grado.id_grado === payload.id_grado ? payload : grado
      );
    },
    darBaja: (state, { payload }) => {
      state.listaGrados = state.listaGrados.filter(
        (grado) => grado.id_grado !== payload
      );

      state.isModalOpen = false;
    },
  },
});

export const {
  cargando,
  setGrados,
  crearGrado,
  darBaja,
  editarGrado,
  seleccionarGrado,
} = gradosSlice.actions;
