const TourBooking = require("../models/tourBookingModel");

const createTourBooking = async (req, res, next) => {
  try {
    const newTourBooking = new TourBooking(req.body);
    const savedBooking = await newTourBooking.save();
    res.status(201).json(savedBooking);
  } catch (err) {
    next(err);
  }
};

const getAllTourBookings = async (req, res, next) => {
  try {
    const bookings = await TourBooking.find().sort({ createdAt: -1 });
    res.status(200).json(bookings);
  } catch (err) {
    next(err);
  }
};

const getTourBookingById = async (req, res, next) => {
  try {
    const booking = await TourBooking.findById(req.params.id);
    if (!booking) {
      return res.status(404).json({ message: "Tour booking not found" });
    }
    res.status(200).json(booking);
  } catch (err) {
    next(err);
  }
};

const updateTourBooking = async (req, res, next) => {
  try {
    const booking = await TourBooking.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true, runValidators: true }
    );
    if (!booking) {
      return res.status(404).json({ message: "Tour booking not found" });
    }
    res.status(200).json(booking);
  } catch (err) {
    next(err);
  }
};

const deleteTourBooking = async (req, res, next) => {
  try {
    const booking = await TourBooking.findByIdAndDelete(req.params.id);
    if (!booking) {
      return res.status(404).json({ message: "Tour booking not found" });
    }
    res.status(200).json({ message: "Tour booking deleted successfully" });
  } catch (err) {
    next(err);
  }
};

const getTourBookingsByEmail = async (req, res, next) => {
  try {
    const bookings = await TourBooking.find({ email: req.params.email }).sort({ createdAt: -1 });
    res.status(200).json(bookings);
  } catch (err) {
    next(err);
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
