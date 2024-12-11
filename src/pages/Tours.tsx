import React from 'react';
import { TourCard } from '../components/tours/TourCard';
import { Tour } from '../types';

const tours: Tour[] = [
  {
    id: '1',
    name: 'Masai Mara Safari Adventure',
    duration: '3 Days, 2 Nights',
    price: 35000,
    description: 'Experience the wonder of the Masai Mara, home to the great wildebeest migration and diverse wildlife.',
    imageUrl: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
    highlights: ['Game Drives', 'Luxury Tented Camp', 'Professional Guide', 'All Meals Included'],
    inclusions: ['Transport', 'Accommodation', 'Meals', 'Park Fees'],
  },
  {
    id: '2',
    name: 'Mount Kenya Hiking Expedition',
    duration: '4 Days, 3 Nights',
    price: 45000,
    description: 'Summit Africa\'s second-highest peak through scenic routes and unique alpine landscapes.',
    imageUrl: 'https://images.unsplash.com/photo-1589182373726-e4f658ab50f0?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
    highlights: ['Professional Guides', 'Camping Equipment', 'Mountain Permits', 'Safety Equipment'],
    inclusions: ['Transport', 'Camping', 'Meals', 'Guide'],
  },
  {
    id: '3',
    name: 'Diani Beach Getaway',
    duration: '5 Days, 4 Nights',
    price: 55000,
    description: 'Relax on pristine white sandy beaches and enjoy water sports in the Indian Ocean.',
    imageUrl: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
    highlights: ['Beach Resort', 'Water Sports', 'Snorkeling', 'Sunset Cruise'],
    inclusions: ['Flights', 'Resort Stay', 'Breakfast', 'Airport Transfers'],
  },
];

export function Tours() {
  return (
    <div className="pt-16 min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Our Tours</h1>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {tours.map((tour) => (
            <TourCard key={tour.id} tour={tour} />
          ))}
        </div>
      </div>
    </div>
  );
}