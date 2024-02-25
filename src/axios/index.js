import axios from "axios";
import baseUrl from "../utils/baseUrl";
import AsyncStorage from "@react-native-async-storage/async-storage";

const axiosInstance = axios.create({
  baseURL: baseUrl,
});

axiosInstance.interceptors.request.use(
  async function (config) {
    const user = localStorage.getItem("userToken");
    const token = AsyncStorage.getItem("userToken");
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
