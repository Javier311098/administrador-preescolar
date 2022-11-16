import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  cargando,
  seleccionarActividad,
} from "../../store/slicers/actividadesSlice";
import { BotonAtras } from "../Botones/BotonAtras";
import { Spinner } from "../Spinner/Spinner";
import "./material_didactico.css";

export const MaterialDidactico = () => {
  const { isLoading, actividadSeleccionada, listaActividades } = useSelector(
    (state) => state.actividades
  );

  const { idActividad } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    console.log(listaActividades);
    console.log(idActividad);
  }, [actividadSeleccionada]);

  const descargarImagen = () => {};

  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          <h2 className="text-center">
            {actividadSeleccionada.nombre_actividad.toUpperCase()}
          </h2>
          <BotonAtras />
          <div className="mt-5 ms-4">
            <h4 className="text-center">Materiales Necesarios:</h4>
            <p className="text-center">{actividadSeleccionada.material}</p>

            <h4 className="text-center">Objectivo</h4>
            <p className="text-center">{actividadSeleccionada.objectivo}</p>

            <h3 className="mt-3 text-center">Intrucciones</h3>
            <p className="text-center">{actividadSeleccionada.instrucciones}</p>

            {actividadSeleccionada.imagen_1 && (
              <div className="material-img-container">
                <img
                  id="image"
                  src="http://localhost:5000/historia/material3.jpeg"
                  className="img-fluid  mostrar-imagen me-3"
                  data-bs-toggle="tooltip"
                  data-bs-placement="bottom"
                  title="Click para descargar imagen"
                  alt="imagen1"
                />

                {actividadSeleccionada.imagen_2 && (
                  <img
                    className="img-fluid  mostrar-imagen"
                    data-bs-toggle="tooltip"
                    data-bs-placement="bottom"
                    title="Click para descargar imagen"
                    src={actividadSeleccionada.imagen_2}
                    alt="imagen2"
                  />
                )}
              </div>
            )}
          </div>

          {actividadSeleccionada.video && (
            <>
              <h4 className="mt-4 text-center">Video de Guia</h4>
              <div className="ratio ratio-16x9">
                <iframe
                  width="560"
                  height="315"
                  src={actividadSeleccionada.video.replace(
                    "watch?v=",
                    "embed/"
                  )}
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            </>
          )}
        </>
      )}
    </>
  );
};
