import { createSlice } from "@reduxjs/toolkit";

export const navSlice = createSlice({
  name: "navbar",
  initialState: {
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
  },
});

export const { cargando, abrirModal, cerrarModal } = navSlice.actions;
