const express = require("express");
const { 
  createCarBooking, 
  getAllCarBookings,
  getCarBookingById,
  updateCarBooking,
  deleteCarBooking,
  getCarBookingsByEmail
} = require("../controllers/carBookingController");

const router = express.Router();

router.post("/", createCarBooking);
router.get("/", getAllCarBookings);
router.get("/:id", getCarBookingById);
router.put("/:id", updateCarBooking);
router.delete("/:id", deleteCarBooking);
router.get("/user/:email", getCarBookingsByEmail);

module.exports = router;
