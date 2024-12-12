// import express from 'express';
// import mongoose from 'mongoose';
// import cors from 'cors';
// import dotenv from 'dotenv';
// import CarBooking from './models/CarBooking.js';
// import TourBooking from './models/TourBooking.js';

// dotenv.config();

// const app = express();

// // CORS Middleware
// app.use(cors({
//   origin: 'http://localhost:3000', // Allow requests from the frontend
//   methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
//   allowedHeaders: ['Content-Type', 'Authorization'],
// }));

// app.use(express.json());

// // MongoDB Connection
// const uri = 'mongodb+srv://mohamedabukar412:IgA3vUwamvfD5Y9Z@cluster1.0c3ka.mongodb.net/?retryWrites=true&w=majority&appName=Cluster1';
// mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(() => {
//     console.log('Connected to MongoDB');
//   })
//   .catch((err) => {
//     console.error('MongoDB connection error:', err.message);
//     process.exit(1);  // Exit if database connection fails
//   });

// // Car Booking Routes
// app.post('/car-bookings', async (req, res) => {
//   console.log('Incoming booking data:', req.body); // Log incoming data
//   try {
//     const carBooking = new CarBooking(req.body);
//     await carBooking.save();
//     res.status(201).json(carBooking);
//   } catch (error) {
//     console.error('Error saving booking:', error); // Log the error
//     res.status(400).json({ error: error.message });
//   }
// });

// app.get('/car-bookings', async (req, res) => {
//   try {
//     const carBookings = await CarBooking.find().sort({ createdAt: -1 });
//     res.json(carBookings);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// // Tour Booking Routes
// app.post('/tour-bookings', async (req, res) => {
//   try {
//     const tourBooking = new TourBooking(req.body);
//     await tourBooking.save();
//     res.status(201).json(tourBooking);
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// });

// app.get('/tour-bookings', async (req, res) => {
//   try {
//     const tourBookings = await TourBooking.find().sort({ createdAt: -1 });
//     res.json(tourBookings);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}`);
// });
