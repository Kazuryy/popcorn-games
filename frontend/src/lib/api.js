import axios from "axios";

// 🔁 Utilisation dynamique de l'URL API
const baseURL = window?.env?.VITE_API_URL;

// 🔧 Crée une instance Axios réutilisable
const api = axios.create({
  baseURL,
  withCredentials: true,  // ⚠️ Important si tu gères des cookies
});

export default api;