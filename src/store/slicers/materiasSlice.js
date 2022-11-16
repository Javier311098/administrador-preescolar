import { createSlice } from "@reduxjs/toolkit";

export const materiasSlice = createSlice({
  name: "materias",
  initialState: {
    listaMaterias: [],
    materiaSeleccionada: {},
    isLoading: false,
    isModalOpen: false,
  },

  reducers: {
    cargando: (state) => {
      state.isLoading = true;
    },
    setMaterias: (state, { payload }) => {
      state.isLoading = false;
      state.listaMaterias = payload;
    },
    crearMateria: (state, { payload }) => {
      state.listaMaterias = [...state.listaMaterias, payload];
      state.isModalOpen = false;
    },
    seleccionarMateria: (state, { payload }) => {
      state.materiaSeleccionada = payload;
    },
    editarMateria: (state, { payload }) => {
      state.listaMaterias = state.listaMaterias.map((materia) =>
        materia.id_materia === payload.id_materia ? payload : materia
      );
    },
    darBaja: (state, { payload }) => {
      state.listaMaterias = state.listaMaterias.filter(
        (materia) => materia.id_materia !== payload
      );

      state.isModalOpen = false;
    },
  },
});

export const {
  cargando,
  setMaterias,
  crearMateria,
  darBaja,
  editarMateria,
  seleccionarMateria,
} = materiasSlice.actions;
