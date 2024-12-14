const CarBooking = require('../models/carBookingModel');

// Create a new car booking
const createCarBooking = async (req, res) => {
  try {
    const booking = new CarBooking(req.body);
    const savedBooking = await booking.save();
    res.status(201).json(savedBooking);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all car bookings
const getAllCarBookings = async (req, res) => {
  try {
    const bookings = await CarBooking.find();
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a specific car booking by ID
const getCarBookingById = async (req, res) => {
  try {
    const booking = await CarBooking.findById(req.params.id);
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }
    res.json(booking);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a car booking
const updateCarBooking = async (req, res) => {
  try {
    const booking = await CarBooking.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }
    res.json(booking);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a car booking
const deleteCarBooking = async (req, res) => {
  try {
    const booking = await CarBooking.findByIdAndDelete(req.params.id);
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }
    res.json({ message: 'Booking deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get bookings by email
const getCarBookingsByEmail = async (req, res) => {
  try {
    const bookings = await CarBooking.find({ customerEmail: req.params.email });
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
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