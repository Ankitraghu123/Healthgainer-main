import axios from "axios";
<<<<<<< HEAD
// console.log(process.env.NEXT_PUBLIC_API_BASE_URL);
const API = axios.create({
  // baseURL: "https://healthgainer-main.onrender.com/api/v1", // Fallback base URL for local development
=======
const API = axios.create({
  // baseURL: "https://healthgainer-main.onrender.com/api/v1",
>>>>>>> completed

  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});
<<<<<<< HEAD

// Response interceptor to handle errors globally
=======
API.interceptors.request.use((config) => {
  let token = localStorage.getItem("token");

  if (token && token.startsWith('"') && token.endsWith('"')) {
    token = token.slice(1, -1);
  }

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

>>>>>>> completed
API.interceptors.response.use(
  (response) => response,
  (error) => {
    return Promise.reject(error.response?.data || "Something went wrong");
  }
);

export default API;
