const mongoose = require('mongoose');

const carBookingSchema = new mongoose.Schema({
  pickupDate: {
    type: Date,
    required: true
  },
  returnDate: {
    type: Date,
    required: true
  },
  pickupTime: {
    type: String,
    required: true
  },
  returnTime: {
    type: String,
    required: true
  },
  driverRequired: {
    type: Boolean,
    default: false
  },
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  carModel: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  totalPrice: {
    type: Number,
    required: true
  },
  rentalDuration: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'cancelled'],
    default: 'pending'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Add indexes for common queries
carBookingSchema.index({ status: 1, createdAt: -1 });
carBookingSchema.index({ email: 1 });
carBookingSchema.index({ phone: 1 });

const CarBooking = mongoose.model('CarBooking', carBookingSchema);

module.exports = CarBooking;
