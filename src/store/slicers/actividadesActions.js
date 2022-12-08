import Swal from "sweetalert2";
import actividadesApi from "../../api/actividadesApi";
import materiasApi from "../../api/materiasApi";
import {
  cargando,
  cerrarModal,
  crearActividad,
  darBaja,
  editarActividad,
  seleccionarActividad,
  setActividades,
} from "./actividadesSlice";

export const obtenerActividades = (role) => {
  return async (dispatch) => {
    dispatch(cargando());

    try {
      const { data } = await actividadesApi.get(`/${role}`);
      dispatch(setActividades(data.actividades));
    } catch (error) {
      Swal.fire("Error en la carga", "Contacte al administrador", "error");
    }
  };
};

export const comenzarCrearActividad = (actividad) => {
  return async (dispatch) => {
    try {
      const { data } = await actividadesApi.post("/", {
        ...actividad,
      });
      console.log(data);
      dispatch(crearActividad(data.actividad));
      Swal.fire(
        "Actividad Creada",
        "se creo la actividad correctamente",
        "success"
      );
    } catch (error) {
      Swal.fire("Error en la carga", "No se pudo crear el registro", "error");
      console.log(error);
    }
  };
};

export const comenzarEditarActividad = (actividad, id) => {
  return async (dispatch) => {
    try {
      // const rutaResp = await actividadesApi.put(
      //   `/subir/archivo/${actividad.id_materia}/${actividad.nombre_actividad}`,
      //   file
      // );
      // const rutaImagen = rutaResp.data.ruta;
      // console.log(rutaImagen);
      // console.log({
      //   ...actividad,
      //   imagen_2: rutaImagen,
      // });
      const { data } = await actividadesApi.put(`/${id}`, {
        ...actividad,
      });

      dispatch(editarActividad(data.actividad[1][0]));
      // dispatch(cerrarModal());
      Swal.fire(
        "Actividad Editada",
        "se edito la actividad correctamente",
        "success"
      );
    } catch (error) {
      Swal.fire("Error en la carga", "No se pudo editar el registro", "error");
    }
  };
};

export const comenzarBajaActividad = (id) => {
  return async (dispatch) => {
    try {
      await actividadesApi.put(`/baja/${id}`);
      dispatch(darBaja(id));
      Swal.fire(
        "La actividad se dio de baja",
        "Se dio de baja correctamente",
        "success"
      );
    } catch (error) {
      Swal.fire("Error", "No se pudo eliminar la actividad", "error");
    }
  };
};
