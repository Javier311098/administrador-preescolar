import { createSlice } from "@reduxjs/toolkit";

export const actividadesSlice = createSlice({
  name: "materias",
  initialState: {
    listaActividades: [],
    actividadSeleccionada: {},
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
    setActividades: (state, { payload }) => {
      state.isLoading = false;
      state.listaActividades = payload;
    },
    crearActividad: (state, { payload }) => {
      state.listaActividades = [...state.listaActividades, payload];
      state.isModalOpen = false;
    },
    seleccionarActividad: (state, { payload }) => {
      state.isLoading = false;
      state.actividadSeleccionada = payload;
    },
    editarActividad: (state, { payload }) => {
      state.listaActividades = state.listaActividades.map((actividad) =>
        actividad.id_actividad === payload.id_actividad ? payload : actividad
      );
    },
    darBaja: (state, { payload }) => {
      state.listaActividades = state.listaActividades.filter(
        (actividad) => actividad.id_actividad !== payload
      );

      state.isModalOpen = false;
    },
  },
});

export const {
  cargando,
  abrirModal,
  cerrarModal,
  setActividades,
  crearActividad,
  darBaja,
  editarActividad,
  seleccionarActividad,
} = actividadesSlice.actions;
