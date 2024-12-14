const mongoose = require("mongoose");

const TourBookingSchema = new mongoose.Schema({
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
  tourType: {
    type: String,
    required: true,
    enum: ['day-tour', 'multi-day', 'custom']
  },
  tourName: {
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
  specialRequirements: { 
    type: String,
    default: '' 
  },
  pricePerPerson: { 
    type: Number, 
    required: true 
  },
  totalPrice: { 
    type: Number, 
    required: true 
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'cancelled'],
    default: 'pending'
  },
  destination: {
    type: String,
    required: true
  }
}, { 
  timestamps: true 
});

// Add indexes for common queries
TourBookingSchema.index({ status: 1, createdAt: -1 });
TourBookingSchema.index({ email: 1 });
TourBookingSchema.index({ startDate: 1 });
TourBookingSchema.index({ tourType: 1 });

module.exports = mongoose.model("TourBooking", TourBookingSchema);
