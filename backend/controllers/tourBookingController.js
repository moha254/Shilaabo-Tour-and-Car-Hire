const TourBooking = require('../models/tourBookingModel');

// Create a new tour booking
const createTourBooking = async (req, res) => {
  try {
    const booking = new TourBooking(req.body);
    const savedBooking = await booking.save();
    res.status(201).json(savedBooking);
  } catch (error) {
    console.error('Error creating tour booking:', error);
    res.status(400).json({ message: error.message });
  }
};

// Get all tour bookings
const getAllTourBookings = async (req, res) => {
  try {
    const bookings = await TourBooking.find().sort({ createdAt: -1 });
    res.json(bookings);
  } catch (error) {
    console.error('Error getting tour bookings:', error);
    res.status(500).json({ message: error.message });
  }
};

// Get a specific tour booking by ID
const getTourBookingById = async (req, res) => {
  try {
    const booking = await TourBooking.findById(req.params.id);
    if (!booking) {
      return res.status(404).json({ message: 'Tour booking not found' });
    }
    res.json(booking);
  } catch (error) {
    console.error('Error getting tour booking:', error);
    res.status(500).json({ message: error.message });
  }
};

// Update a tour booking
const updateTourBooking = async (req, res) => {
  try {
    const booking = await TourBooking.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!booking) {
      return res.status(404).json({ message: 'Tour booking not found' });
    }
    res.json(booking);
  } catch (error) {
    console.error('Error updating tour booking:', error);
    res.status(400).json({ message: error.message });
  }
};

// Delete a tour booking
const deleteTourBooking = async (req, res) => {
  try {
    const booking = await TourBooking.findByIdAndDelete(req.params.id);
    if (!booking) {
      return res.status(404).json({ message: 'Tour booking not found' });
    }
    res.json({ message: 'Tour booking deleted successfully' });
  } catch (error) {
    console.error('Error deleting tour booking:', error);
    res.status(500).json({ message: error.message });
  }
};

// Get bookings by email
const getTourBookingsByEmail = async (req, res) => {
  try {
    const bookings = await TourBooking.find({ email: req.params.email })
      .sort({ createdAt: -1 });
    res.json(bookings);
  } catch (error) {
    console.error('Error getting tour bookings by email:', error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createTourBooking,
  getAllTourBookings,
  getTourBookingById,
  updateTourBooking,
  deleteTourBooking,
  getTourBookingsByEmail
};
