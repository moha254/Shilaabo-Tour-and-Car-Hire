const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");
const connectDB = require("./config/db");
const carBookingRoutes = require("./routes/carBookingRoutes");
const tourBookingRoutes = require("./routes/tourBookingRoutes");
const errorHandler = require("./middleware/errorHandler");

dotenv.config();  // Load environment variables from .env file

// Connect to MongoDB Atlas using the URI stored in the environment variable
connectDB();

const app = express();

// Enable CORS for all origins in development, or specific origins in production
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:3000',
  'https://shilaabo-tour-and-car-hire.vercel.app',
  'https://shilaabo-car-hire.vercel.app',
  'https://shilaabo-tour-and-car-hire.onrender.com'
];

app.use(cors({
  origin: function(origin, callback) {
    // allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  credentials: true
}));

app.use(express.json());  // Parse incoming JSON requests

// Routes for car bookings and tour bookings
app.use("/api/car-bookings", carBookingRoutes);
app.use("/api/tour-bookings", tourBookingRoutes);

// Serve static files from the dist directory
app.use(express.static(path.join(__dirname, '../dist')));

// Handle React routing, return all requests to React app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist', 'index.html'));
});

// Error handler middleware for handling errors globally
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
