const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");
const fs = require('fs');
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
  'https://shilaabo-tour-and-car-hire-1.onrender.com'
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

// API routes
app.use("/api/car-bookings", carBookingRoutes);
app.use("/api/tour-bookings", tourBookingRoutes);

// Find the dist directory
const possibleDistPaths = [
  path.join(__dirname, 'dist'),
  path.join(__dirname, '../dist'),
  path.join(process.cwd(), 'dist'),
  path.join(process.cwd(), '../dist')
];

let distPath;
for (const path of possibleDistPaths) {
  console.log('Checking path:', path);
  if (fs.existsSync(path)) {
    distPath = path;
    console.log('Found dist directory at:', distPath);
    break;
  }
}

if (!distPath) {
  console.error('Could not find dist directory. Checked paths:', possibleDistPaths);
} else {
  // List contents of the dist directory
  try {
    const files = fs.readdirSync(distPath);
    console.log('Contents of dist directory:', files);
  } catch (error) {
    console.error('Error reading dist directory:', error);
  }
}

// Serve static files from the dist directory
if (distPath) {
  app.use(express.static(distPath));
}

// Handle React routing, return all requests to React app
app.get('*', (req, res) => {
  if (!distPath) {
    return res.status(404).send('Frontend build not found. Please check deployment configuration.');
  }

  const indexPath = path.join(distPath, 'index.html');
  console.log('Attempting to serve:', indexPath);
  
  if (!fs.existsSync(indexPath)) {
    console.error('index.html not found at:', indexPath);
    return res.status(404).send('Frontend build not found. Please check deployment configuration.');
  }
  
  res.sendFile(indexPath);
});

// Error handler middleware for handling errors globally
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  if (distPath) {
    console.log('Static files being served from:', distPath);
  } else {
    console.log('Warning: No static files are being served!');
  }
});
