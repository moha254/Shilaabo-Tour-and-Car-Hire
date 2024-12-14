import api from './api';

export interface TourBooking {
  _id?: string;
  tourName: string;
  name: string;
  email: string;
  phone: string;
  startDate: Date;
  participants: number;
  specialRequirements?: string;
}

export const tourBookingService = {
  createBooking: async (booking: Omit<TourBooking, '_id'>) => {
    const response = await api.post('/tour-bookings', booking);
    return response.data;
  },

  getAllBookings: async () => {
    const response = await api.get('/tour-bookings');
    return response.data;
  },

  getBookingById: async (id: string) => {
    const response = await api.get(`/tour-bookings/${id}`);
    return response.data;
  },

  updateBooking: async (id: string, booking: Partial<TourBooking>) => {
    const response = await api.put(`/tour-bookings/${id}`, booking);
    return response.data;
  },

  deleteBooking: async (id: string) => {
    const response = await api.delete(`/tour-bookings/${id}`);
    return response.data;
  },

  getBookingsByEmail: async (email: string) => {
    const response = await api.get(`/tour-bookings/user/${email}`);
    return response.data;
  },
};
