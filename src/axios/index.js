import axios from "axios";
import baseUrl from "../utils/baseUrl";
import AsyncStorage from "@react-native-async-storage/async-storage";

const axiosInstance = axios.create({
  baseURL: baseUrl,
});

axiosInstance.interceptors.request.use(
  async function (config) {
    // const user = JSON.parse(localStorage.getItem("Info"));
    const token = AsyncStorage.setItem("userToken");

    if (user) {
      config.headers["Authorization"] = token;
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
