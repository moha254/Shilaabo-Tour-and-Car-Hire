const mongoose = require("mongoose");

const CarBookingSchema = new mongoose.Schema({
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
  carModel: { 
    type: String, 
    required: true 
  },
  rentalDuration: { 
    type: Number, 
    required: true,
    min: 1 
  },
  price: { 
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
  }
}, { 
  timestamps: true 
});

// Add indexes for common queries
CarBookingSchema.index({ status: 1, createdAt: -1 });
CarBookingSchema.index({ email: 1 });
CarBookingSchema.index({ phone: 1 });

module.exports = mongoose.model("CarBooking", CarBookingSchema);
