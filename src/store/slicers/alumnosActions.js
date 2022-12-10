import Swal from "sweetalert2";
import usuarioApi from "../../api/usuarioApi";
import {
  cargando,
  crearAlumno,
  darBaja,
  editarAlumno,
  setAlumnos,
} from "./alumnosSlice";

export const obtenerAlumnos = (id, role) => {
  return async (dispatch) => {
    dispatch(cargando());
    try {
      if (id) {
        if (role === 4) {
          const { data } = await usuarioApi.get(`/relacion/padre/${id}`);

          dispatch(setAlumnos([data.hijo]));
        }
        if (role === 2) {
          const { data } = await usuarioApi.get(`/relacion/docente/${id}`);

          dispatch(setAlumnos(data.estudiantes));
        }
      } else {
        const { data } = await usuarioApi.get("/rol/3");
        dispatch(setAlumnos(data.usuario));
      }
    } catch (error) {
      Swal.fire("Error en la carga", "Contacte al administrador", "error");
    }
  };
};

export const comenzarCrearAlumno = (alumno) => {
  return async (dispatch) => {
    try {
      const { data } = await usuarioApi.post("/", {
        ...alumno,
      });
      dispatch(crearAlumno(data.usuario));
      Swal.fire("Alumno Creado", "se creo el Alumno correctamente", "success");
    } catch (error) {
      Swal.fire("Error en la carga", "No se pudo crear el registro", "error");
      console.log(error);
    }
  };
};

export const comenzarEditarAlumno = (alumno, id) => {
  return async (dispatch) => {
    try {
      const { data } = await usuarioApi.put(`/${id}`, {
        ...alumno,
      });

      dispatch(editarAlumno(data.usuario[1][0]));

      Swal.fire(
        "Alumno Editado",
        "se edito el Alumno correctamente",
        "success"
      );
    } catch (error) {
      Swal.fire("Error en la carga", "No se pudo editar el registro", "error");
    }
  };
};

export const comenzarBajaAlumno = (id) => {
  return async (dispatch) => {
    try {
      await usuarioApi.put(`/baja/${id}`);
      dispatch(darBaja(id));
      Swal.fire(
        "El alumno se dio de baja correctate",
        "Se dio de baja correctamente",
        "success"
      );
    } catch (error) {
      Swal.fire("Error", "No se pudo eliminar el alumno", "error");
    }
  };
};
