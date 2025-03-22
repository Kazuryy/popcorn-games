import axios from "axios";

// 💡 Choix dynamique : runtime (window.env) ou build-time (import.meta.env)
const baseURL =
  window?.env?.VITE_API_URL || import.meta.env.VITE_API_URL || "http://localhost:8000";

const api = axios.create({
  baseURL,
  withCredentials: true,
});

export default api;