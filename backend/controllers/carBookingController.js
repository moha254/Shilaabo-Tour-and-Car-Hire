const CarBooking = require("../models/carBookingModel");

const createCarBooking = async (req, res, next) => {
  try {
    console.log('Received car booking request with body:', req.body);
    
    // Validate required fields
    const requiredFields = ['name', 'email', 'phone', 'pickupDate', 'returnDate', 'pickupTime', 'returnTime', 'carModel', 'price', 'rentalDuration'];
    const missingFields = requiredFields.filter(field => !req.body[field]);
    
    if (missingFields.length > 0) {
      return res.status(400).json({
        message: 'Missing required fields',
        fields: missingFields
      });
    }

    // Validate dates
    const pickupDate = new Date(req.body.pickupDate);
    const returnDate = new Date(req.body.returnDate);
    
    if (isNaN(pickupDate.getTime()) || isNaN(returnDate.getTime())) {
      return res.status(400).json({
        message: 'Invalid date format',
        details: 'Dates must be in YYYY-MM-DD format'
      });
    }

    if (returnDate <= pickupDate) {
      return res.status(400).json({
        message: 'Invalid date range',
        details: 'Return date must be after pickup date'
      });
    }

    // Create booking
    const newCarBooking = new CarBooking(req.body);
    console.log('Created new car booking instance:', newCarBooking);
    
    const savedBooking = await newCarBooking.save();
    console.log('Successfully saved car booking:', savedBooking);
    
    res.status(201).json(savedBooking);
  } catch (err) {
    console.error('Error in createCarBooking:', {
      name: err.name,
      message: err.message,
      stack: err.stack,
      validationErrors: err.errors
    });
    next(err);
  }
};

const getAllCarBookings = async (req, res, next) => {
  try {
    const bookings = await CarBooking.find().sort({ createdAt: -1 });
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
    const bookings = await CarBooking.find({ email: req.params.email }).sort({ createdAt: -1 });
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
