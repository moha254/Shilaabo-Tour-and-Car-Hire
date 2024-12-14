import axios from 'axios';

const baseURL = import.meta.env.VITE_API_URL || 
  (import.meta.env.MODE === 'production' 
    ? 'https://shilaabo-tour-and-car-hire-1.onrender.com/api'
    : 'http://localhost:5001/api');

console.log('API Base URL:', baseURL);
console.log('Environment:', import.meta.env.MODE);

const api = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  }
});

// Add request interceptor for debugging
api.interceptors.request.use(
  config => {
    console.log(`Making ${config.method?.toUpperCase()} request to: ${config.baseURL}${config.url}`);
    if (config.data) {
      console.log('Request data:', JSON.stringify(config.data, null, 2));
    }
    return config;
  },
  error => {
    console.error('Request error:', error);
    return Promise.reject(error);
  }
);

// Add response interceptor for debugging
api.interceptors.response.use(
  response => {
    console.log('Response:', response.data);
    return response;
  },
  error => {
    console.error('Response error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

// Car Booking API calls
export const createCarBooking = async (bookingData: any) => {
  const response = await api.post('/bookings', bookingData);
  return response.data;
};

export const getCarBookings = async () => {
  const response = await api.get('/bookings');
  return response.data;
};

export const getCarBookingById = async (id: string) => {
  const response = await api.get(`/bookings/${id}`);
  return response.data;
};

// Tour Booking API calls
export const createTourBooking = async (bookingData: any) => {
  const response = await api.post('/tours', bookingData);
  return response.data;
};

export const getTourBookings = async () => {
  const response = await api.get('/tours');
  return response.data;
};

export const getTourBookingById = async (id: string) => {
  const response = await api.get(`/tours/${id}`);
  return response.data;
};

export default api;
