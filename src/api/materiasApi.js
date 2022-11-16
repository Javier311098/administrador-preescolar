import axios from "axios";

const materiasApi = axios.create({
  baseURL: `${process.env.REACT_APP_API_URL}/materias`,
});

// materiasApi.interceptors.request.use((config) => {
//   config.headers = {
//     ...config.headers,
//     "x-token": localStorage.getItem("token"),
//   };
//   return config;
// });

export default materiasApi;
