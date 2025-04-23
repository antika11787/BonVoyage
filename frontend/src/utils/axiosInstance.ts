import axios from "axios";
import dotenv from "dotenv";
import appConfig from "../config/constants";
dotenv.config();


console.log("API Base URL:", appConfig.nextPublicApiBaseUrl);

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  timeout: 10000,
});

const axiosInstanceToken = axios.create({
  baseURL: appConfig.nextPublicApiBaseUrl,
  timeout: 10000,
});

axiosInstanceToken.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export { axiosInstance, axiosInstanceToken };
