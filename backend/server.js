const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");
const connectDB = require("./config/db");
const carBookingRoutes = require("./routes/carBookingRoutes");
const tourBookingRoutes = require("./routes/tourBookingRoutes");
const errorHandler = require("./middleware/errorHandler");

dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// CORS configuration
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:3000',
  'http://localhost:5001'
];

app.use(cors({
  origin: function(origin, callback) {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));

// Middleware
app.use(express.json());

// API Routes
app.use('/api/bookings', carBookingRoutes);
app.use('/api/tours', tourBookingRoutes);

// Serve static files from the React app
const distPath = path.join(__dirname, '..', 'dist');
app.use(express.static(distPath));

// Handle React routing, return all requests to React app
app.get('*', (req, res) => {
  res.sendFile(path.join(distPath, 'index.html'));
});

// Error handling middleware
app.use(errorHandler);

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Static files being served from: ${distPath}`);
});
