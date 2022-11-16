import axios from "axios";

const calificacionesApi = axios.create({
  baseURL: `${process.env.REACT_APP_API_URL}/calificaciones`,
});

export default calificacionesApi;
