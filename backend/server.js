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

// Function to check and log directory contents
const checkDirectory = (dirPath) => {
  console.log(`Checking directory: ${dirPath}`);
  try {
    const stats = fs.statSync(dirPath);
    console.log(`Directory exists: ${stats.isDirectory()}`);
    const contents = fs.readdirSync(dirPath);
    console.log(`Contents of ${dirPath}:`, contents);
    return true;
  } catch (error) {
    console.log(`Error checking directory ${dirPath}:`, error.message);
    return false;
  }
};

// Find the dist directory
const possibleDistPaths = [
  path.join(__dirname, 'dist'),
  path.join(__dirname, '../dist'),
  path.join(process.cwd(), 'dist'),
  path.join(process.cwd(), '../dist')
];

console.log('Current working directory:', process.cwd());
console.log('__dirname:', __dirname);

let distPath;
for (const pathToCheck of possibleDistPaths) {
  if (checkDirectory(pathToCheck)) {
    distPath = pathToCheck;
    console.log('Found dist directory at:', distPath);
    break;
  }
}

if (!distPath) {
  console.error('Could not find dist directory in any of these locations:', possibleDistPaths);
} else {
  console.log('Using dist directory:', distPath);
  app.use(express.static(distPath));
}

// Handle React routing, return all requests to React app
app.get('*', (req, res) => {
  if (!distPath) {
    return res.status(404).send('Frontend build not found. Please check deployment configuration.');
  }

  const indexPath = path.join(distPath, 'index.html');
  console.log('Request path:', req.path);
  console.log('Attempting to serve:', indexPath);
  
  try {
    const indexExists = fs.existsSync(indexPath);
    console.log('index.html exists:', indexExists);
    if (!indexExists) {
      console.error('index.html not found at:', indexPath);
      return res.status(404).send('Frontend build not found. Please check deployment configuration.');
    }
    
    res.sendFile(indexPath);
  } catch (error) {
    console.error('Error serving index.html:', error);
    res.status(500).send('Error serving application');
  }
});

// Error handler middleware for handling errors globally
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  if (distPath) {
    console.log('Static files being served from:', distPath);
    checkDirectory(distPath);
  } else {
    console.log('Warning: No static files are being served!');
  }
});
