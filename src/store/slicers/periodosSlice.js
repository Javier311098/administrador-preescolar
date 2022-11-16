import { createSlice } from "@reduxjs/toolkit";

export const periodosSlice = createSlice({
  name: "periodos",
  initialState: {
    listaPeriodos: [],
    periodoSeleccionado: {},
    isLoading: false,
    isModalOpen: false,
  },

  reducers: {
    cargando: (state) => {
      state.isLoading = true;
    },
    setPeriodos: (state, { payload }) => {
      state.isLoading = false;
      state.listaPeriodos = payload;
    },
    crearPeriodo: (state, { payload }) => {
      state.listaPeriodos = [...state.listaPeriodos, payload];
      state.isModalOpen = false;
    },
    seleccionarPeriodo: (state, { payload }) => {
      state.periodoSeleccionado = payload;
    },
    editarPeriodo: (state, { payload }) => {
      state.listaPeriodos = state.listaPeriodos.map((periodo) =>
        periodo.id_periodo === payload.id_periodo ? payload : periodo
      );
    },
    darBaja: (state, { payload }) => {
      state.listaPeriodos = state.listaPeriodos.filter(
        (periodo) => periodo.id_periodo !== payload
      );

      state.isModalOpen = false;
    },
  },
});

export const {
  cargando,
  setPeriodos,
  crearPeriodo,
  darBaja,
  editarPeriodo,
  seleccionarPeriodo,
} = periodosSlice.actions;
