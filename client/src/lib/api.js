import axios from "axios";
// console.log(process.env.NEXT_PUBLIC_API_BASE_URL);
const API = axios.create({
  // baseURL: "https://health-gainer-backend-mwfq.onrender.com/api/v1",
  // baseURL: "http://localhost:5000/api/v1",

  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});
// Request interceptor to attach token
API.interceptors.request.use((config) => {
  let token = localStorage.getItem("token");
  // console.log("Token from localStorage:", token);

  // Remove extra double quotes if present
  if (token && token.startsWith('"') && token.endsWith('"')) {
    token = token.slice(1, -1);
  }

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor to handle errors globally
API.interceptors.response.use(
  (response) => response,
  (error) => {
    return Promise.reject(error.response?.data || "Something went wrong");
  }
);

export default API;
