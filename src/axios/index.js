import axios from "axios";
import baseUrl from "../utils/baseUrl";
import { useSelector } from "react-redux";

const axiosInstance = axios.create({
  baseURL: baseUrl,
});

axiosInstance.interceptors.request.use(
  async function (config) {
    const { token } = useSelector((state)=> state.user);
    console.log("TOKEN: ", token)

    if (user) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  function (err) {
    return Promise.reject(err);
  }
);

axiosInstance.interceptors.response.use(function (config) {
  return config;
});

export default axiosInstance;
