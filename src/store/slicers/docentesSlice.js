import { createSlice } from "@reduxjs/toolkit";

export const docentesSlice = createSlice({
  name: "docentes",
  initialState: {
    listaDocentes: [],
    docenteSeleccionado: {},
    isLoading: false,
    isModalOpen: false,
  },

  reducers: {
    cargando: (state) => {
      state.isLoading = true;
    },

    abrirModal: (state) => {
      state.isModalOpen = true;
    },
    cerrarModal: (state) => {
      state.isModalOpen = false;
    },
    setDocentes: (state, { payload }) => {
      state.isLoading = false;
      state.listaDocentes = payload;
    },
    crearDocente: (state, { payload }) => {
      state.listaDocentes = [...state.listaDocentes, payload];
      state.isModalOpen = false;
    },
    seleccionarDocente: (state, { payload }) => {
      state.isLoading = false;
      state.docenteSeleccionado = payload;
    },
    editarDocente: (state, { payload }) => {
      state.listaDocentes = state.listaDocentes.map((docente) =>
        docente.id_usuario === payload.id_usuario ? payload : docente
      );
    },
    darBaja: (state, { payload }) => {
      state.listaDocentes = state.listaDocentes.filter(
        (docente) => docente.id_usuario !== payload
      );

      state.isModalOpen = false;
    },
  },
});

export const {
  cargando,
  abrirModal,
  cerrarModal,
  setDocentes,
  crearDocente,
  darBaja,
  editarDocente,
  seleccionarDocente,
} = docentesSlice.actions;
