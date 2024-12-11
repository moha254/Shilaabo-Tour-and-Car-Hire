export interface Car {
  id: string;
  brand: string;
  model: string;
  year: number;
  transmission: 'Automatic' | 'Manual';
  seats: number;
  pricePerDay: number;
  imageUrl: string;
  features: string[];
}

export interface Tour {
  id: string;
  name: string;
  duration: string;
  price: number;
  description: string;
  imageUrl: string;
  highlights: string[];
  inclusions: string[];
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  comment: string;
  rating: number;
  imageUrl: string;
}

export interface Receipt {
  orderId: string;
  name: string;
  email: string;
  phone: string;
  pickupDate: string;
  returnDate: string;
  pickupTime: string;
  returnTime: string;
  driverRequired: boolean;
}