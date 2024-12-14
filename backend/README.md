# Shilaabo Car Hire Backend

This is the backend service for Shilaabo Car Hire, handling car and tour bookings.

## Environment Variables

The following environment variables are required:

- `MONGO_URI`: MongoDB connection string
- `PORT`: Port number for the server (defaults to 8080)

## API Endpoints

### Car Bookings
- POST `/api/car-bookings`: Create a new car booking
- GET `/api/car-bookings`: Get all car bookings

### Tour Bookings
- POST `/api/tour-bookings`: Create a new tour booking
- GET `/api/tour-bookings`: Get all tour bookings

## Development

```bash
# Install dependencies
npm install

# Run in development mode
npm run dev

# Run in production mode
npm start
```
