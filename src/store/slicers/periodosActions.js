import Swal from "sweetalert2";
import periodosApi from "../../api/periodosApi";
import {
  cargando,
  crearPeriodo,
  darBaja,
  editarPeriodo,
  setPeriodos,
} from "./periodosSlice";

export const obtenerPeriodos = (role) => {
  return async (dispatch) => {
    dispatch(cargando());

    try {
      const { data } = await periodosApi.get(`/${role}`);
      dispatch(setPeriodos(data.periodos));
    } catch (error) {
      Swal.fire("Error en la carga", "Contacte al administrador", "error");
    }
  };
};

export const comenzarCrearPeriodo = (nombre, inicio, fin) => {
  return async (dispatch) => {
    try {
      const { data } = await periodosApi.post("/", {
        nombre_periodo: nombre,
        inicio_periodo: inicio,
        fin_periodo: fin,
      });
      dispatch(crearPeriodo(data.periodo));
      Swal.fire(
        "Periodo Creado",
        "se creo el periodo correctamente",
        "success"
      );
    } catch (error) {
      Swal.fire("Error al crear", error.response.data.msg, "error");
    }
  };
};

export const comenzarEditarPeriodo = (nombre, inicio, fin, id, estatus) => {
  return async (dispatch) => {
    try {
      const { data } = await periodosApi.put(`/${id}`, {
        nombre_periodo: nombre,
        inicio_periodo: inicio,
        fin_periodo: fin,
        estatus: estatus,
      });
      dispatch(editarPeriodo(data.periodo[1][0]));
      Swal.fire(
        "Periodo Editada",
        "se edito el periodo correctamente",
        "success"
      );
    } catch (error) {
      Swal.fire("Error en la carga", "No se pudo editar el registro", "error");
      console.log(error);
    }
  };
};

export const comenzarBajaPeriodo = (id) => {
  return async (dispatch) => {
    try {
      await periodosApi.put(`/baja/${id}`);
      dispatch(darBaja(id));
      Swal.fire(
        "El periodo se dio de baja",
        "Se dio de baja correctamente",
        "success"
      );
    } catch (error) {
      Swal.fire("Error", "No se pudo eliminar el periodo", "error");
    }
  };
};
