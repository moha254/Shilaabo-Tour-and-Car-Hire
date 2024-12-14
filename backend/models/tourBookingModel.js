const mongoose = require("mongoose");

const TourBookingSchema = new mongoose.Schema({
  tourName: { type: String, required: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  startDate: { type: Date, required: true },
  participants: { type: Number, required: true },
  specialRequirements: { type: String },
}, { timestamps: true });

module.exports = mongoose.model("TourBooking", TourBookingSchema);
