import { useEffect, useRef } from "react";
import { useState } from "react";
import { BotonAtras } from "../Botones/BotonAtras";
import { Spinner } from "../Spinner/Spinner";
import "./material_didactico.css";

export const MaterialDidactico = () => {
  const [actividad, setActividad] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const referenciaImagen1 = useRef();
  const referenciaImagen2 = useRef();

  useEffect(() => {
    setActividad(JSON.parse(localStorage.getItem("actividad")));
    setIsLoading(false);
  }, []);

  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          <h2 className="text-center">
            {actividad.nombre_actividad.toUpperCase()}
          </h2>
          <BotonAtras />
          <div className="mt-5 ms-4">
            <h4 className="text-center">Materiales Necesarios:</h4>
            <p className="text-center">{actividad.material}</p>

            <h4 className="text-center">Objectivo</h4>
            <p className="text-center">{actividad.objectivo}</p>

            <h3 className="mt-3 text-center">Intrucciones</h3>
            <p className="text-center">{actividad.instrucciones}</p>

            {actividad.imagen_1 && (
              <>
                <h4 className="text-center mt-3">
                  Puedes hacer click sobre la imagen para descargarla
                </h4>
                <div className="material-img-container">
                  <a
                    href={actividad.imagen_2}
                    download
                    className="btn btn-primary"
                    style={{ display: "none" }}
                    ref={referenciaImagen1}
                  ></a>
                  <img
                    id="image"
                    src={actividad.imagen_1}
                    className="img-fluid  mostrar-imagen me-3 mt-3"
                    style={{ border: "2px solid black" }}
                    data-bs-toggle="tooltip"
                    data-bs-placement="bottom"
                    title="Click para descargar imagen"
                    alt="imagen1"
                    onClick={() => referenciaImagen1.current.click()}
                  />
                  <a
                    href={actividad.imagen_2}
                    ref={referenciaImagen2}
                    download
                    style={{ display: "none" }}
                    className="btn btn-primary"
                  ></a>
                  {actividad.imagen_2 && (
                    <img
                      className="img-fluid  mostrar-imagen mt-3"
                      style={{ border: "2px solid black" }}
                      data-bs-toggle="tooltip"
                      data-bs-placement="bottom"
                      title="Click para descargar imagen"
                      src={actividad.imagen_2}
                      alt="imagen2"
                      onClick={() => referenciaImagen2.current.click()}
                    />
                  )}
                </div>
              </>
            )}
          </div>

          {actividad.video && (
            <>
              <h4 className="mt-4 text-center">Video de Guia</h4>
              <div className="ratio ratio-16x9">
                <iframe
                  width="560"
                  height="315"
                  src={actividad.video.replace("watch?v=", "embed/")}
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
