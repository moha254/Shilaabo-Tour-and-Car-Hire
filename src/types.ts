export interface Tour {
  id: string;
  name: string;
  type: 'day-tour' | 'multi-day' | 'custom';
  destination: string;
  duration: string;
  description: string;
  highlights: string[];
  imageUrl: string;
  pricePerPerson: number;
}

export interface TourBooking {
  id?: string;
  name: string;
  email: string;
  phone: string;
  tourName: string;
  tourType: 'day-tour' | 'multi-day' | 'custom';
  destination: string;
  startDate: string;
  endDate: string;
  participants: number;
  pricePerPerson: number;
  totalPrice: number;
  specialRequirements?: string;
  status: 'pending' | 'confirmed' | 'cancelled';
  createdAt?: Date;
  updatedAt?: Date;
}

export interface Car {
  id: string;
  brand: string;
  model: string;
  year: number;
  transmission: 'automatic' | 'manual';
  fuelType: 'petrol' | 'diesel' | 'hybrid' | 'electric';
  seats: number;
  pricePerDay: number;
  imageUrl: string;
  available: boolean;
}

export interface CarBooking {
  id?: string;
  name: string;
  email: string;
  phone: string;
  pickupDate: string;
  returnDate: string;
  pickupTime: string;
  returnTime: string;
  driverRequired: boolean;
  carModel: string;
  price: number;
  totalPrice: number;
  rentalDuration: number;
  status: 'pending' | 'confirmed' | 'cancelled';
  createdAt?: Date;
  updatedAt?: Date;
}
