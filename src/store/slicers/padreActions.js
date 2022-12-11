import Swal from "sweetalert2";
import usuarioApi from "../../api/usuarioApi";
import {
  cargando,
  cargandoData,
  crearPadre,
  darBaja,
  editarPadre,
  seleccionarAlumno,
  setPadres,
} from "./padresSlice";

export const obtenerPadres = () => {
  return async (dispatch) => {
    dispatch(cargando());

    try {
      const { data } = await usuarioApi.get("/rol/4");
      dispatch(setPadres(data.usuario));
    } catch (error) {
      Swal.fire("Error en la carga", "Contacte al administrador", "error");
    }
  };
};

export const obtenerAlumnosSinRelacion = () => {
  return async (dispatch, getState) => {
    try {
      const { data } = await usuarioApi.get(`/relaciones/padre`);
      const relaciones = data.relaciones;
      const alumnos = getState().alumnos.listaAlumnos;

      console.log(relaciones);
      const temp = [];
      relaciones.forEach((relacion) => {
        alumnos.find((alumno) => {
          if (relacion.id_usuario_estudiante !== alumno.id_usuario) {
            temp.push(alumno);
          }
        });
      });

      //   updatedAnnotationList.forEach((annotation) => {
      //     // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
      //     this.unitsList.find((item: Unit) => {
      //       if (item.annotation.id === annotation.id) {
      //         item.annotation.target = annotation.target;
      //         tempList.push(item);
      //       }
      //       return null;
      //     });
      //   });

      console.log(temp);
      //   dispatch(seleccionarAlumno(data.alumno));
    } catch (error) {
      Swal.fire("Error en la carga", "Contacte al administrador", "error");
    }
  };
};

export const obtenerRelacionPadre = (id) => {
  return async (dispatch) => {
    dispatch(cargandoData());
    try {
      const { data } = await usuarioApi.get(`/relacion/padre/${id}`);

      dispatch(seleccionarAlumno(data.hijo));
    } catch (error) {
      Swal.fire("Error en la carga", "Contacte al administrador", "error");
    }
  };
};

export const comenzarCrearPadre = (padre, idAlumno) => {
  return async (dispatch) => {
    try {
      const { data } = await usuarioApi.post("/", {
        ...padre,
      });

      dispatch(crearPadre(data.usuario));

      await usuarioApi.post("/relacion/tutor", {
        id_usuario_estudiante: idAlumno,
        id_usuario_tutor: data.usuario.id_usuario,
      });

      Swal.fire("Padre Creado", "se creo el Padre correctamente", "success");
    } catch (error) {
      Swal.fire("Error en la carga", error.response.data.msg, "error");
      console.log(error);
    }
  };
};

export const comenzarEditarPadre = (padre, id, idAlumno) => {
  return async (dispatch) => {
    try {
      const { data } = await usuarioApi.put(`/${id}`, {
        ...padre,
      });
      await usuarioApi.put(`/relacion/tutor/${id}`, {
        id_usuario_estudiante: idAlumno,
        id_usuario_tutor: id,
      });

      dispatch(editarPadre(data.usuario[1][0]));

      Swal.fire("Padre Editado", "se edito el Padre correctamente", "success");
    } catch (error) {
      console.log(error);
      Swal.fire("Error en la carga", error.response.data.msg, "error");
    }
  };
};

export const comenzarBajaPadre = (id) => {
  return async (dispatch) => {
    try {
      await usuarioApi.put(`/baja/${id}`);
      await usuarioApi.put(`/baja/relacion/tutor/${id}`);
      dispatch(darBaja(id));
      Swal.fire(
        "El Padre se dio de baja correctate",
        "Se dio de baja correctamente",
        "success"
      );
    } catch (error) {
      console.log(error);
      Swal.fire("Error", "No se pudo eliminar el Padre", "error");
    }
  };
};
