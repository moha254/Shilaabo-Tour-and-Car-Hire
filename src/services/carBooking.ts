import api from './api';

export interface CarBooking {
  _id?: string;
  name: string;
  email: string;
  phone: string;
  pickupDate: Date;
  returnDate: Date;
  pickupTime: string;
  returnTime: string;
  driverRequired: boolean;
  carModel: string;
  rentalDuration: number;
  price: number;
}

export const carBookingService = {
  createBooking: async (booking: Omit<CarBooking, '_id'>) => {
    const response = await api.post('/car-bookings', booking);
    return response.data;
  },

  getAllBookings: async () => {
    const response = await api.get('/car-bookings');
    return response.data;
  },

  getBookingById: async (id: string) => {
    const response = await api.get(`/car-bookings/${id}`);
    return response.data;
  },

  updateBooking: async (id: string, booking: Partial<CarBooking>) => {
    const response = await api.put(`/car-bookings/${id}`, booking);
    return response.data;
  },

  deleteBooking: async (id: string) => {
    const response = await api.delete(`/car-bookings/${id}`);
    return response.data;
  },

  getBookingsByEmail: async (email: string) => {
    const response = await api.get(`/car-bookings/user/${email}`);
    return response.data;
  },
};
