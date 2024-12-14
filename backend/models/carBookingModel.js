const mongoose = require("mongoose");

const CarBookingSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  pickupDate: { type: Date, required: true },
  returnDate: { type: Date, required: true },
  pickupTime: { type: String, required: true },
  returnTime: { type: String, required: true },
  driverRequired: { type: Boolean, required: true },
  carModel: { type: String, required: true },
  rentalDuration: { type: Number, required: true },
  price: { type: Number, required: true }
}, { timestamps: true });

module.exports = mongoose.model("CarBooking", CarBookingSchema);
