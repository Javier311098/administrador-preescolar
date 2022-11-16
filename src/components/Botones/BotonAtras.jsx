import { BsFillArrowLeftCircleFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
export const BotonAtras = () => {
  const navigate = useNavigate();
  const irAtras = () => {
    navigate(-1);
  };
  return (
    <div className="d-flex justify-content-start mt-3 mb-3">
      <button className="btn btn-dark btn-sm" onClick={irAtras}>
        <BsFillArrowLeftCircleFill size={22} /> Regresar
      </button>
    </div>
  );
};
