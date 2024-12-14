import axios from 'axios';

// Default to production API URL, fallback to localhost for development
const baseURL = import.meta.env.VITE_API_URL || 'https://shilaabo-car-hire.onrender.com/api' || 'http://localhost:5000/api';

const api = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

// Add response interceptor for error handling
api.interceptors.response.use(
  response => response,
  error => {
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export default api;
