import Swal from "sweetalert2";
import clasesApi from "../../api/clasesApi";
import {
  cargando,
  crearClase,
  darBaja,
  editarClase,
  setClases,
} from "./clasesSlice";

export const obtenerClases = () => {
  return async (dispatch) => {
    dispatch(cargando());

    try {
      const { data } = await clasesApi.get();
      dispatch(setClases(data.clases));
    } catch (error) {
      Swal.fire("Error en la carga", "Contacte al administrador", "error");
    }
  };
};

export const comenzarCrearClase = (clase) => {
  return async (dispatch) => {
    try {
      const { data } = await clasesApi.post("/", {
        ...clase,
      });

      dispatch(crearClase(data.clase));
      Swal.fire("Clase Creada", "se creo el Clase correctamente", "success");
    } catch (error) {
      Swal.fire("Error en la carga", error.response.data.msg, "error");
      console.log(error);
    }
  };
};

export const comenzarEditarClase = (clase, id) => {
  return async (dispatch) => {
    try {
      const { data } = await clasesApi.put(`/${id}`, {
        ...clase,
      });
      console.log(data.clase[1][0]);
      dispatch(editarClase(data.clase[1][0]));

      Swal.fire("Clase Editada", "se edito la Clase correctamente", "success");
    } catch (error) {
      Swal.fire("Error en la carga", "No se pudo editar el registro", "error");
    }
  };
};

export const comenzarBajaClase = (id) => {
  return async (dispatch) => {
    try {
      await clasesApi.put(`/baja/${id}`);
      dispatch(darBaja(id));
      Swal.fire(
        "La Clase se dio de baja correctate",
        "Se dio de baja correctamente",
        "success"
      );
    } catch (error) {
      Swal.fire("Error", "No se pudo eliminar la Clase", "error");
    }
  };
};
