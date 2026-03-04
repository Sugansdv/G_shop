import axios from "axios";

/* ================= SAFE BASE URL ================= */

const baseURL = import.meta.env.VITE_API_URL;

if (!baseURL) {
  console.error("VITE_API_URL is not defined!");
}

const api = axios.create({
  baseURL: baseURL,
});


/* ================= REQUEST INTERCEPTOR ================= */

api.interceptors.request.use(
  (config) => {

    const token = localStorage.getItem("token");

    if (!config.headers) {
      config.headers = {};
    }

    if (token && token !== "undefined") {
      config.headers.Authorization = `Token ${token}`;
    }

    return config;

  },
  (error) => Promise.reject(error)
);


/* ================= RESPONSE INTERCEPTOR ================= */

api.interceptors.response.use(
  (response) => response,

  (error) => {

    if (error.response?.status === 401) {

      console.warn("Unauthorized. Clearing invalid token.");

      localStorage.removeItem("token");
      localStorage.removeItem("user");

      // optional redirect
      window.location.href = "/login";
    }

    return Promise.reject(error);
  }
);


export default api;