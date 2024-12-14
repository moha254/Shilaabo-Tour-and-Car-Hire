const mongoose = require('mongoose');

const tourBookingSchema = new mongoose.Schema({
  tourName: {
    type: String,
    required: true
  },
  tourType: {
    type: String,
    required: true,
    enum: ['day-tour', 'multi-day', 'custom']
  },
  destination: {
    type: String,
    required: true
  },
  startDate: {
    type: Date,
    required: true
  },
  endDate: {
    type: Date,
    required: true
  },
  participants: {
    type: Number,
    required: true,
    min: 1
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
  specialRequirements: {
    type: String
  },
  totalPrice: {
    type: Number,
    required: true
  },
  pricePerPerson: {
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
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Add indexes for common queries
tourBookingSchema.index({ tourName: 1, startDate: 1 });
tourBookingSchema.index({ email: 1 });
tourBookingSchema.index({ status: 1 });
tourBookingSchema.index({ createdAt: -1 });

// Update the updatedAt field on save
tourBookingSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

const TourBooking = mongoose.model('TourBooking', tourBookingSchema);

module.exports = TourBooking;
