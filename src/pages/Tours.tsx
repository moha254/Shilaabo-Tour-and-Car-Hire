import React from 'react';
import { TourCard } from '../components/tours/TourCard';
import { Tour } from '../types';

const tours: Tour[] = [
  {
    id: '1',
    name: 'Masai Mara Safari Adventure',
    type: 'multi-day',
    destination: 'Masai Mara',
    duration: '3 Days, 2 Nights',
    description: 'Experience the wonder of the Masai Mara, home to the great wildebeest migration and diverse wildlife.',
    imageUrl: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
    highlights: [
      'Game Drives',
      'Luxury Tented Camp',
      'Professional Guide',
      'All Meals Included',
      'Transport',
      'Park Fees'
    ],
    pricePerPerson: 35000
  },
  {
    id: '2',
    name: 'Mount Kenya Hiking Expedition',
    type: 'multi-day',
    destination: 'Mount Kenya',
    duration: '4 Days, 3 Nights',
    description: 'Summit Africa\'s second-highest peak through scenic routes and unique alpine landscapes.',
    imageUrl: 'https://images.unsplash.com/photo-1589182373726-e4f658ab50f0?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
    highlights: [
      'Professional Guides',
      'Camping Equipment',
      'Mountain Permits',
      'Safety Equipment',
      'Transport',
      'All Meals'
    ],
    pricePerPerson: 45000
  },
  {
    id: '3',
    name: 'Diani Beach Getaway',
    type: 'multi-day',
    destination: 'Diani Beach',
    duration: '5 Days, 4 Nights',
    description: 'Relax on pristine white sandy beaches and enjoy water sports in the Indian Ocean.',
    imageUrl: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
    highlights: [
      'Beach Resort Stay',
      'Water Sports Activities',
      'Snorkeling Trip',
      'Sunset Cruise',
      'Airport Transfers',
      'Daily Breakfast'
    ],
    pricePerPerson: 55000
  },
  {
    id: '4',
    name: 'Nairobi National Park Day Tour',
    type: 'day-tour',
    destination: 'Nairobi',
    duration: '1 Day',
    description: 'Experience wildlife in their natural habitat just minutes from the city center.',
    imageUrl: 'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
    highlights: [
      'Game Drive',
      'Professional Guide',
      'Park Entry Fees',
      'Transport',
      'Picnic Lunch',
      'Bottled Water'
    ],
    pricePerPerson: 15000
  },
  {
    id: '5',
    name: 'Lake Nakuru Flamingo Tour',
    type: 'day-tour',
    destination: 'Lake Nakuru',
    duration: '1 Day',
    description: 'Witness the spectacular sight of thousands of flamingos and diverse wildlife at Lake Nakuru.',
    imageUrl: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
    highlights: [
      'Game Drive',
      'Bird Watching',
      'Park Entry Fees',
      'Transport',
      'Lunch',
      'Professional Guide'
    ],
    pricePerPerson: 18000
  }
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