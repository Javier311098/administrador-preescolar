import { createSlice } from "@reduxjs/toolkit";

export const padresSlice = createSlice({
  name: "padres",
  initialState: {
    listaPadres: [],
    listaAlumnos: [],
    padreSeleccionado: {},
    alumnoSeleccionado: {},
    isLoading: false,
    isLoadingData: false,
    isModalOpen: false,
  },

  reducers: {
    cargando: (state) => {
      state.isLoading = true;
    },
    cargandoData: (state) => {
      state.isLoadingData = true;
    },
    abrirModal: (state) => {
      state.isModalOpen = true;
    },
    cerrarModal: (state) => {
      state.isModalOpen = false;
    },
    setPadres: (state, { payload }) => {
      state.isLoading = false;
      state.listaPadres = payload;
    },
    setAlumnos: (state, { payload }) => {
      state.listaAlumnos = payload;
    },
    crearPadre: (state, { payload }) => {
      state.listaPadres = [...state.listaPadres, payload];
      state.isModalOpen = false;
    },
    seleccionarPadre: (state, { payload }) => {
      state.padreSeleccionado = payload;
      state.isLoadingData = false;
    },
    seleccionarAlumno: (state, { payload }) => {
      state.isLoadingData = false;
      state.alumnoSeleccionado = payload;
    },
    editarPadre: (state, { payload }) => {
      state.listaPadres = state.listaPadres.map((padre) =>
        padre.id_usuario === payload.id_usuario ? payload : padre
      );
    },
    darBaja: (state, { payload }) => {
      state.listaPadres = state.listaPadres.filter(
        (padre) => padre.id_usuario !== payload
      );

      state.isModalOpen = false;
    },
  },
});

export const {
  cargando,
  cargandoData,
  abrirModal,
  cerrarModal,
  setPadres,
  crearPadre,
  darBaja,
  editarPadre,
  seleccionarPadre,
  seleccionarAlumno,
  setAlumnos,
} = padresSlice.actions;
