import axios from "axios";

const gradosApi = axios.create({
  baseURL: `${process.env.REACT_APP_API_URL}/grados`,
});

export default gradosApi;
