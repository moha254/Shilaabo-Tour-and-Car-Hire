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

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({ 
    status: 'healthy',
    mongodb: connectDB.readyState === 1 ? 'connected' : 'disconnected',
    environment: process.env.NODE_ENV,
    timestamp: new Date().toISOString()
  });
});

// API routes
app.use("/api/car-bookings", carBookingRoutes);
app.use("/api/tour-bookings", tourBookingRoutes);

// Function to find the dist directory
const findDistDirectory = () => {
  const possiblePaths = [
    path.join(__dirname, 'dist'),
    path.join(__dirname, '../dist'),
    path.join(process.cwd(), 'dist'),
    path.join(process.cwd(), '../dist')
  ];

  console.log('Looking for dist directory in:');
  possiblePaths.forEach(p => console.log('- ' + p));

  for (const p of possiblePaths) {
    try {
      const stats = fs.statSync(p);
      if (stats.isDirectory()) {
        console.log('Found dist directory at:', p);
        return p;
      }
    } catch (error) {
      console.log(`Directory ${p} not found:`, error.message);
    }
  }
  return null;
};

// Serve static files
const distPath = findDistDirectory();
if (distPath) {
  console.log('Serving static files from:', distPath);
  app.use(express.static(distPath));

  // Serve index.html for all non-API routes
  app.get('*', (req, res) => {
    if (req.path.startsWith('/api')) {
      return res.status(404).json({ message: 'API endpoint not found' });
    }

    const indexPath = path.join(distPath, 'index.html');
    console.log('Serving index.html from:', indexPath);
    
    try {
      if (fs.existsSync(indexPath)) {
        res.sendFile(indexPath);
      } else {
        console.error('index.html not found at:', indexPath);
        res.status(404).send('Frontend build not found');
      }
    } catch (error) {
      console.error('Error serving index.html:', error);
      res.status(500).send('Error serving application');
    }
  });
} else {
  console.error('Could not find dist directory');
}

// Error handler middleware
app.use(errorHandler);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  if (distPath) {
    console.log('Static files being served from:', distPath);
  } else {
    console.log('Warning: No static files are being served!');
  }
});
