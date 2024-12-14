const express = require("express");
const { 
  createTourBooking, 
  getAllTourBookings,
  getTourBookingById,
  updateTourBooking,
  deleteTourBooking,
  getTourBookingsByEmail
} = require("../controllers/tourBookingController");

const router = express.Router();

// Routes
router.post("/", createTourBooking);
router.get("/", getAllTourBookings);
router.get("/:id", getTourBookingById);
router.put("/:id", updateTourBooking);
router.delete("/:id", deleteTourBooking);
router.get("/user/:email", getTourBookingsByEmail);

module.exports = router;
