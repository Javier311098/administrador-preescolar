import { createSlice } from "@reduxjs/toolkit";

export const calificacionesSlice = createSlice({
  name: "calificaciones",
  initialState: {
    listaCalificaciones: [],
    calificacionSeleccionada: {},
    isLoading: false,
    isModalOpen: false,
  },

  reducers: {
    cargando: (state) => {
      state.isLoading = true;
    },
    setCalificaciones: (state, { payload }) => {
      state.isLoading = false;
      state.listaCalificaciones = payload;
    },
    reiniciarCalificaciones: (state) => {
      state.listaCalificaciones = [];
    },
    crearCalificacion: (state, { payload }) => {
      state.listaCalificaciones = [...state.listaCalificaciones, payload];
      state.isModalOpen = false;
    },
    seleccionarCalificacion: (state, { payload }) => {
      state.calificacionSeleccionada = payload;
    },
    editarCalificacion: (state, { payload }) => {
      state.listaCalificaciones = state.listaCalificaciones.map(
        (calificacion) =>
          calificacion.id_calificacion === payload.id_calificacion
            ? payload
            : calificacion
      );
    },
    darBaja: (state, { payload }) => {
      state.listaCalificaciones = state.listaCalificaciones.filter(
        (calificacion) => calificacion.id_calificacion !== payload
      );

      state.isModalOpen = false;
    },
  },
});

export const {
  cargando,
  setCalificaciones,
  reiniciarCalificaciones,
  crearCalificacion,
  darBaja,
  editarCalificacion,
  seleccionarCalificacion,
} = calificacionesSlice.actions;
