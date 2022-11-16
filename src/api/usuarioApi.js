import axios from "axios";

const usuarioApi = axios.create({
  baseURL: `${process.env.REACT_APP_API_URL}/usuario`,
});

usuarioApi.interceptors.request.use((config) => {
  config.headers = {
    ...config.headers,
    "x-token": localStorage.getItem("token"),
  };
  return config;
});

export default usuarioApi;
