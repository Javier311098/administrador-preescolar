import { createSlice } from "@reduxjs/toolkit";

export const alumnosSlice = createSlice({
  name: "alumnos",
  initialState: {
    listaAlumnos: [],
    alumnoSeleccionado: {},
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
    setAlumnos: (state, { payload }) => {
      state.isLoading = false;
      state.listaAlumnos = payload;
    },
    crearAlumno: (state, { payload }) => {
      state.listaAlumnos = [...state.listaAlumnos, payload];
      state.isModalOpen = false;
    },
    seleccionarAlumno: (state, { payload }) => {
      state.isLoading = false;
      state.alumnoSeleccionado = payload;
    },
    editarAlumno: (state, { payload }) => {
      state.listaAlumnos = state.listaAlumnos.map((alumno) =>
        alumno.id_usuario === payload.id_usuario ? payload : alumno
      );
    },
    darBaja: (state, { payload }) => {
      state.listaAlumnos = state.listaAlumnos.filter(
        (alumno) => alumno.id_usuario !== payload
      );

      state.isModalOpen = false;
    },
  },
});

export const {
  cargando,
  abrirModal,
  cerrarModal,
  setAlumnos,
  crearAlumno,
  darBaja,
  editarAlumno,
  seleccionarAlumno,
} = alumnosSlice.actions;
