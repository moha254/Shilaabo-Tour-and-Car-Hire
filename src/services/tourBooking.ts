import axios from 'axios';

const API_URL = 'http://localhost:5001/api';

export const tourBookingService = {
  bookTour: async (bookingData: {
    tourId: string;
    date: string;
    numberOfPeople: number;
    customerName: string;
    customerEmail: string;
    customerPhone: string;
  }) => {
    try {
      const response = await axios.post(`${API_URL}/tour-bookings`, bookingData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  getTourBookings: async (tourId: string) => {
    try {
      const response = await axios.get(`${API_URL}/tour-bookings/${tourId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
};
