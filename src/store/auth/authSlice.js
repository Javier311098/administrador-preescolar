import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    status: "noAutenticado",
    user: {},
    errorMessage: undefined,
  },

  reducers: {
    login: (state, { payload }) => {
      state.status = "autentificado";
      state.user = payload;
      state.errorMessage = undefined;
    },
    checkingCredentials: (state) => {
      state.status = "checando";
      state.user = {};
      state.errorMessage = undefined;
    },
    logout: (state, { payload }) => {
      state.status = "no-autenticado";
      state.user = {};
      state.errorMessage = payload;
    },
    limpiarError: (state) => {
      state.errorMessage = undefined;
    },
  },
});

export const { login, logout, checkingCredentials, limpiarError } =
  authSlice.actions;
