const CarBooking = require("../models/carBookingModel");

const createCarBooking = async (req, res, next) => {
  try {
    console.log('Received car booking request with body:', req.body);
    
    const newCarBooking = new CarBooking(req.body);
    console.log('Created new car booking instance:', newCarBooking);
    
    const savedBooking = await newCarBooking.save();
    console.log('Successfully saved car booking:', savedBooking);
    
    res.status(201).json(savedBooking);
  } catch (err) {
    console.error('Error in createCarBooking:', err);
    next(err);
  }
};

const getAllCarBookings = async (req, res, next) => {
  try {
    const bookings = await CarBooking.find().sort({ bookingDate: -1 });
    res.status(200).json(bookings);
  } catch (err) {
    next(err);
  }
};

const getCarBookingById = async (req, res, next) => {
  try {
    const booking = await CarBooking.findById(req.params.id);
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }
    res.status(200).json(booking);
  } catch (err) {
    next(err);
  }
};

const updateCarBooking = async (req, res, next) => {
  try {
    const booking = await CarBooking.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true, runValidators: true }
    );
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }
    res.status(200).json(booking);
  } catch (err) {
    next(err);
  }
};

const deleteCarBooking = async (req, res, next) => {
  try {
    const booking = await CarBooking.findByIdAndDelete(req.params.id);
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }
    res.status(200).json({ message: "Booking deleted successfully" });
  } catch (err) {
    next(err);
  }
};

const getCarBookingsByEmail = async (req, res, next) => {
  try {
    const bookings = await CarBooking.find({ email: req.params.email }).sort({ bookingDate: -1 });
    res.status(200).json(bookings);
  } catch (err) {
    next(err);
  }
};

module.exports = { 
  createCarBooking, 
  getAllCarBookings,
  getCarBookingById,
  updateCarBooking,
  deleteCarBooking,
  getCarBookingsByEmail
};
