import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:3000",
  withCredentials: true, //By adding adding this field the browser will automaticlly send cookies to the server along with every req
});

export default axiosInstance;
