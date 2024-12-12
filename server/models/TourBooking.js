import mongoose from 'mongoose';

const tourBookingSchema = new mongoose.Schema({
  tourName: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  participants: {
    type: Number,
    default: 1,
  },
  specialRequirements: {
    type: String,
    default: 'None',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model('TourBooking', tourBookingSchema);