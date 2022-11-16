import Swal from "sweetalert2";
import materiasApi from "../../api/materiasApi";
import {
  cargando,
  crearMateria,
  darBaja,
  editarMateria,
  setMaterias,
} from "./materiasSlice";

export const obtenerMaterias = () => {
  return async (dispatch) => {
    dispatch(cargando());

    try {
      const { data } = await materiasApi.get("/");
      dispatch(setMaterias(data.materias));
    } catch (error) {
      Swal.fire("Error en la carga", "Contacte al administrador", "error");
    }
  };
};

export const comenzarCrearMateria = (nombre, descripcion) => {
  return async (dispatch) => {
    try {
      const { data } = await materiasApi.post("/", {
        nombre_materia: nombre,
        descripcion,
      });
      dispatch(crearMateria(data.materia));
      Swal.fire(
        "Materia Creada",
        "se creo la materia correctamente",
        "success"
      );
    } catch (error) {
      Swal.fire("Error en la carga", "No se pudo crear el registro", "error");
    }
  };
};

export const comenzarEditarMateria = (nombre, descripcion, id) => {
  return async (dispatch) => {
    try {
      const { data } = await materiasApi.put(`/${id}`, {
        nombre_materia: nombre,
        descripcion,
      });
      dispatch(editarMateria(data.materia[1][0]));
      console.log(data.materia[1][0]);
      Swal.fire(
        "Materia Editada",
        "se edito la materia correctamente",
        "success"
      );
    } catch (error) {
      Swal.fire("Error en la carga", "No se pudo editar el registro", "error");
      console.log(error);
    }
  };
};

export const comenzarBajaMateria = (id) => {
  return async (dispatch) => {
    try {
      await materiasApi.put(`/baja/${id}`);
      dispatch(darBaja(id));
      Swal.fire(
        "La materia se dio de baja",
        "Se dio de baja correctamente",
        "success"
      );
    } catch (error) {
      Swal.fire("Error", "No se pudo eliminar la materia", "error");
    }
  };
};
