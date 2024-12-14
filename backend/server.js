const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
const carBookingRoutes = require("./routes/carBookingRoutes");
const tourBookingRoutes = require("./routes/tourBookingRoutes");
const errorHandler = require("./middleware/errorHandler");

dotenv.config();  // Load environment variables from .env file

// Connect to MongoDB Atlas using the URI stored in the environment variable
connectDB();

const app = express();

// Enable CORS for frontend requests
app.use(cors({
  origin: process.env.FRONTEND_URL || "http://localhost:5173", // Vite's default port
  credentials: true
}));

app.use(express.json());  // Parse incoming JSON requests

// Routes for car bookings and tour bookings
app.use("/api/car-bookings", carBookingRoutes);
app.use("/api/tour-bookings", tourBookingRoutes);

// Error handler middleware for handling errors globally
app.use(errorHandler);

const PORT = process.env.PORT || 5000;  // Use the port from .env or default to 5000
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
