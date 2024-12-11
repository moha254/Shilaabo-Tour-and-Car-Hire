export interface Car {
    id: string;
    brand: string; // Updated to align with provided data
    model: string;
    year: number;
    transmission: string; // Added to match provided data
    seats: number; // Added to match provided data
    pricePerDay: number;
    imageUrl: string;
    features: string[];
  }
  
  export interface Booking {
    bookingId: string;
    carId: string;
    userId: string;
    startDate: string;
    endDate: string;
  }
  
  export interface User {
    id: string;
    name: string;
    email: string;
    phone: string;
  }
  