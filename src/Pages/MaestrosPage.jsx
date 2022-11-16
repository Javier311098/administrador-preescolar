import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

import grupoImg from "../imagenes/docentes/grupo.webp";
export const MaestrosPage = () => {
  return (
    <>
      <div className="d-flex">
        <div className="card mt-5 me-4" style={{ width: "300px" }}>
          <img src={grupoImg} class="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title">Alumnos</h5>
            <p className="card-text">Ingresar a los grupos disponibles</p>
            <Link className="btn btn-primary " to="/alumnos">
              Ingresar
            </Link>
          </div>
        </div>
        <div className="card mt-5 me-4" style={{ width: "300px" }}>
          <img src={grupoImg} class="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title">Clases</h5>
            <p className="card-text">Ingresar a los grupos disponibles</p>
            <Link className="btn btn-primary " to="/alumnos">
              Ingresar
            </Link>
          </div>
        </div>
        <div className="card mt-5 me-4" style={{ width: "300px" }}>
          <img src={grupoImg} class="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title">Materias</h5>
            <p className="card-text">Ingresar a los grupos disponibles</p>
            <Link className="btn btn-primary " to="/">
              Ingresar
            </Link>
          </div>
        </div>
        <div className="card mt-5 me-4" style={{ width: "300px" }}>
          <img src={grupoImg} class="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title">Calificaciones</h5>
            <p className="card-text">Ingresar a los grupos disponibles</p>
            <Link className="btn btn-primary " to="/alumnos">
              Ingresar
            </Link>
          </div>
        </div>
        <div className="card mt-5 me-4" style={{ width: "300px" }}>
          <img src={grupoImg} class="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title">Grados</h5>
            <p className="card-text">Ingresar a los grupos disponibles</p>
            <Link className="btn btn-primary " to="/alumnos">
              Ingresar
            </Link>
          </div>
        </div>

        <div className="card mt-5" style={{ width: "300px" }}>
          <img src={grupoImg} class="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title">Periodos</h5>
            <p className="card-text">Ingresar a los grupos disponibles</p>
            <Link className="btn btn-primary " to="/alumnos">
              Ingresar
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};
