import axios from "axios";
// console.log(process.env.NEXT_PUBLIC_API_BASE_URL);
const API = axios.create({
  // baseURL: "https://healthgainer-main.onrender.com/api/v1", // Fallback base URL for local development

  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

// Response interceptor to handle errors globally
API.interceptors.response.use(
  (response) => response,
  (error) => {
    return Promise.reject(error.response?.data || "Something went wrong");
  }
);

export default API;
