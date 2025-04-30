import axios from 'axios';
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL
const LOCALSTORAGE_NAME = import.meta.env.VITE_LOCALSTORAGE_NAME;

// Create axios instance
const axiosInstance = axios.create({
  baseURL: BACKEND_URL
});

// Request interceptor - add auth token
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem(LOCALSTORAGE_NAME);
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor - handle 401 errors
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem(LOCALSTORAGE_NAME);
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;