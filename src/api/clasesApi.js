import axios from "axios";

const clasesApi = axios.create({
  baseURL: `${process.env.REACT_APP_API_URL}/clases`,
});

export default clasesApi;
