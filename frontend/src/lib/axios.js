import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true, //By adding adding this field the browser will automaticlly send cookies to the server along with every req
});

export default axiosInstance;
