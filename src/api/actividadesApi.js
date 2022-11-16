import axios from "axios";

const actividadesApi = axios.create({
  baseURL: `${process.env.REACT_APP_API_URL}/actividades`,
});

// materiasApi.interceptors.request.use((config) => {
//   config.headers = {
//     ...config.headers,
//     "x-token": localStorage.getItem("token"),
//   };
//   return config;
// });

export default actividadesApi;
