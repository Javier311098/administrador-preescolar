import Swal from "sweetalert2";
import usuarioApi from "../../api/usuarioApi";
import {
  cargando,
  crearDocente,
  darBaja,
  editarDocente,
  setDocentes,
} from "./docentesSlice";

export const obtenerDocentes = () => {
  return async (dispatch) => {
    dispatch(cargando());

    try {
      const { data } = await usuarioApi.get("/rol/2");
      dispatch(setDocentes(data.usuario));
    } catch (error) {
      Swal.fire("Error en la carga", "Contacte al administrador", "error");
    }
  };
};

export const comenzarCrearDocente = (docente, idAlumno) => {
  return async (dispatch) => {
    try {
      const { data } = await usuarioApi.post("/", {
        ...docente,
      });
      await usuarioApi.post("/relacion/tutor/", {
        id_usuario_estudiante: idAlumno,
        id_usuario_tutor: data.usuario.id_usuario,
      });

      dispatch(crearDocente(data.usuario));
      Swal.fire(
        "Docente Creado",
        "se creo el Docente correctamente",
        "success"
      );
    } catch (error) {
      Swal.fire("Error en la carga", error.response.data.msg, "error");
      console.log(error);
    }
  };
};

export const comenzarEditarDocente = (docente, id) => {
  return async (dispatch) => {
    try {
      const { data } = await usuarioApi.put(`/${id}`, {
        ...docente,
      });

      dispatch(editarDocente(data.usuario[1][0]));

      Swal.fire(
        "Docente Editado",
        "se edito el Docente correctamente",
        "success"
      );
    } catch (error) {
      Swal.fire("Error en la carga", "No se pudo editar el registro", "error");
    }
  };
};

export const comenzarBajaDocente = (id) => {
  return async (dispatch) => {
    try {
      await usuarioApi.put(`/baja/${id}`);
      dispatch(darBaja(id));
      Swal.fire(
        "El Docente se dio de baja correctate",
        "Se dio de baja correctamente",
        "success"
      );
    } catch (error) {
      Swal.fire("Error", "No se pudo eliminar el Docente", "error");
    }
  };
};
