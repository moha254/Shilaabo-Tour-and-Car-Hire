import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

interface BookingData {
  pickupDate: string;
  returnDate: string;
  pickupTime: string;
  returnTime: string;
  driverRequired: boolean;
  name: string;
  email: string;
  phone: string;
  carModel: string;
  price: number;
  totalPrice: number;
  rentalDuration: number;
}

class CarBookingService {
  private apiUrl = `${API_BASE_URL}/api/bookings`;

  async createBooking(bookingData: BookingData) {
    try {
      const response = await axios.post(this.apiUrl, bookingData);
      return response.data;
    } catch (error) {
      console.error('Error creating booking:', error);
      throw error;
    }
  }

  async getBookings() {
    try {
      const response = await axios.get(this.apiUrl);
      return response.data;
    } catch (error) {
      console.error('Error fetching bookings:', error);
      throw error;
    }
  }
}

export const carBookingService = new CarBookingService();
