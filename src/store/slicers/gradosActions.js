import Swal from "sweetalert2";
import gradosApi from "../../api/gradosApi";
import {
  cargando,
  crearGrado,
  darBaja,
  editarGrado,
  setGrados,
} from "./gradosSlice";

export const obtenerGrados = () => {
  return async (dispatch) => {
    dispatch(cargando());

    try {
      const { data } = await gradosApi.get("/");
      dispatch(setGrados(data.grados));
    } catch (error) {
      Swal.fire("Error en la carga", "Contacte al administrador", "error");
    }
  };
};

export const comenzarCrearGrado = (nombre) => {
  return async (dispatch) => {
    try {
      const { data } = await gradosApi.post("/", {
        nombre_grado: nombre,
      });
      dispatch(crearGrado(data.grado));
      Swal.fire("Grado Creado", "se creo el grado correctamente", "success");
    } catch (error) {
      Swal.fire("Error al crear", error.response.data.msg, "error");
    }
  };
};

export const comenzarEditarGrado = (nombre, id) => {
  return async (dispatch) => {
    try {
      const { data } = await gradosApi.put(`/${id}`, {
        nombre_grado: nombre,
      });
      dispatch(editarGrado(data.grado));
      Swal.fire("Grado Editada", "se edito el grado correctamente", "success");
    } catch (error) {
      Swal.fire("Error en la carga", "No se pudo editar el registro", "error");
      console.log(error);
    }
  };
};

export const comenzarBajaGrado = (id) => {
  return async (dispatch) => {
    try {
      await gradosApi.put(`/baja/${id}`);
      dispatch(darBaja(id));
      Swal.fire(
        "El grado se dio de baja",
        "Se dio de baja correctamente",
        "success"
      );
    } catch (error) {
      Swal.fire("Error", "No se pudo eliminar el grado", "error");
    }
  };
};
