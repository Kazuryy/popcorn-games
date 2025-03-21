import axios from "axios";

const baseURL =
  window?.env?.VITE_API_URL || import.meta.env.VITE_API_URL || "http://localhost:8000";

const api = axios.create({
  baseURL,
  withCredentials: true,
});

export default api;