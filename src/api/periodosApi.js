import axios from "axios";

const periodosApi = axios.create({
  baseURL: `${process.env.REACT_APP_API_URL}/periodos`,
});

export default periodosApi;
