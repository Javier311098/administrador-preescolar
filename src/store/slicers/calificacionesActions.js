import Swal from "sweetalert2";
import calificacionesApi from "../../api/calificacionesApi";
import {
  cargando,
  crearCalificacion,
  darBaja,
  editarCalificacion,
  setCalificaciones,
} from "./calificacionesSlice";

export const obtenerCalificaciones = (idAlumno, idPeriodo) => {
  return async (dispatch) => {
    dispatch(cargando());

    try {
      const { data } = await calificacionesApi.get(
        `/alumno/${idAlumno}/${idPeriodo}`
      );
      dispatch(setCalificaciones(data.calificaciones));
    } catch (error) {
      Swal.fire("Error en la carga", "Contacte al administrador", "error");
    }
  };
};

export const comenzarCrearCalificacion = (calificacion) => {
  return async (dispatch) => {
    try {
      const { data } = await calificacionesApi.post("/", {
        ...calificacion,
      });
      console.log(data);
      dispatch(crearCalificacion(data.calificacion));
      Swal.fire(
        "Calificacion Creado",
        "se creo el Calificacion correctamente",
        "success"
      );
    } catch (error) {
      Swal.fire("Error en la carga", error.response.data.msg, "error");
      console.log(error);
    }
  };
};

export const comenzarEditarCalificacion = (calificacion, id) => {
  return async (dispatch) => {
    try {
      const { data } = await calificacionesApi.put(`/${id}`, {
        ...calificacion,
      });

      dispatch(editarCalificacion(data.usuario[1][0]));

      Swal.fire(
        "Calificacion Editado",
        "se edito la Calificacion correctamente",
        "success"
      );
    } catch (error) {
      Swal.fire("Error en la carga", "No se pudo editar el registro", "error");
    }
  };
};

export const comenzarBajaCalificacion = (id) => {
  return async (dispatch) => {
    try {
      await calificacionesApi.put(`/baja/${id}`);
      dispatch(darBaja(id));
      Swal.fire(
        "La Calificacion se dio de baja correctate",
        "Se dio de baja correctamente",
        "success"
      );
    } catch (error) {
      Swal.fire("Error", "No se pudo eliminar la Calificacion", "error");
    }
  };
};
