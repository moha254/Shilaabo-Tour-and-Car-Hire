import React from 'react';
import { CarCard } from '../components/cars/CarCard';
import { Car } from '../types';

const cars: Car[] = [
  {
    id: '1',
    brand: 'Toyota',
    model: 'Land Cruiser Prado',
    year: 2022,
    transmission: 'Automatic',
    seats: 7,
    pricePerDay: 15000,
    imageUrl: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
    features: ['4x4', 'GPS Navigation', 'Bluetooth', 'Leather Seats', 'Reverse Camera'],
  },
  {
    id: '2',
    brand: 'Mercedes-Benz',
    model: 'E-Class',
    year: 2023,
    transmission: 'Automatic',
    seats: 5,
    pricePerDay: 20000,
    imageUrl: 'https://images.unsplash.com/photo-1617531653332-bd46c24f2068?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
    features: ['Luxury Interior', 'Premium Sound System', 'Sunroof', 'Smart Display'],
  },
  {
    id: '3',
    brand: 'Toyota',
    model: 'Fortuner',
    year: 2022,
    transmission: 'Automatic',
    seats: 7,
    pricePerDay: 12000,
    imageUrl: 'https://images.unsplash.com/photo-1559416523-140ddc3d238c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
    features: ['4x4', 'Hill Assist', 'Cruise Control', 'Climate Control'],
  },
  {
    id: '4',
    brand: 'Toyota',
    model: 'AXIO',
    year: 2015,
    transmission: 'Petrol',
    seats: 5,
    pricePerDay: 4500,
    imageUrl: '/img/TOYOTA AXIO.png',
    features: ['Fuel Efficient'],
  },
  {
    id: '5',
    brand: 'Toyota',
    model: 'PREMIO',
    year: 2015,
    transmission: 'Petrol',
    seats: 5,
    pricePerDay: 4500,
    imageUrl: '/img/TOYOTA PREMIO.png',
    features: ['Comfortable Interior'],
  },
  {
    id: '6',
    brand: 'Toyota',
    model: 'VITZ',
    year: 2017,
    transmission: 'Petrol',
    seats: 5,
    pricePerDay: 3500,
    imageUrl: '/img/TOYOTA VITZ.png',
    features: ['Compact', 'Fuel Efficient'],
  },
  {
    id: '7',
    brand: 'MAZDA',
    model: 'DEMIO',
    year: 2020,
    transmission: 'Petrol',
    seats: 5,
    pricePerDay: 3500,
    imageUrl: '/img/MAZDA DEMIO.png',
    features: ['Modern Design'],
  },
  {
    id: '8',
    brand: 'Toyota',
    model: 'MARK X',
    year: 2019,
    transmission: 'Petrol',
    seats: 5,
    pricePerDay: 6000,
    imageUrl: '/img/TOYOTA MARK X.png',
    features: ['Sporty Performance'],
  },
  {
    id: '9',
    brand: 'Toyota',
    model: 'CROWN',
    year: 2023,
    transmission: 'Petrol',
    seats: 5,
    pricePerDay: 7000,
    imageUrl: '/img/crown.png',
    features: ['Premium Features'],
  },
  // Add more car objects here following the same structure.
];

export function Cars() {
  return (
    <div className="pt-16 min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Our Fleet</h1>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {cars.map((car) => (
            <CarCard key={car.id} car={car} />
          ))}
        </div>
      </div>
    </div>
  );
}
