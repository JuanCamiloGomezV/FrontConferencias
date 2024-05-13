import axios from "axios";
import { getItem } from "../utils/useStorage";

export const baseURL = "http://localhost:3001";

const publicService = axios.create({
  baseURL,
});

publicService.interceptors.request.use(async (config) => {
  config.headers["Content-Type"] = "application/json"; // Cambiado a "Content-Type"
  return config;
});

const privateService = axios.create({
  baseURL: baseURL,
});
privateService.interceptors.request.use((config) => {
  if (!config.headers.token) {
    const token = getItem<string>("token");
    config.headers.token = token;
  }
  return config;
});

export { privateService, publicService };
