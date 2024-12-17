export interface Car {
  id: string;
  brand: string;
  model: string;
  year: number;
  transmission: string;
  seats: number;
  price: number;
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
