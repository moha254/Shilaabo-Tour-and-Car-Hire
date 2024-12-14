import React, { useState } from 'react';
import { Tour } from '../../types';
import { Clock, Check, MapPin } from 'lucide-react';
import { Modal } from '../common/Modal';
import { TourBookingForm } from './TourBookingForm';
import Swal from 'sweetalert2';

interface TourCardProps {
  tour: Tour;
}

export function TourCard({ tour }: TourCardProps) {
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  const handleBooking = async (formData: any) => {
    try {
      // The form will handle the API call and success message
      setIsBookingModalOpen(false);
    } catch (error) {
      console.error('Error in tour booking:', error);
      Swal.fire({
        title: "Error",
        text: "There was an error processing your booking. Please try again.",
        icon: "error",
      });
    }
  };

  return (
    <>
      <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
        <div className="relative">
          <img
            src={tour.imageUrl}
            alt={tour.name}
            className="w-full h-48 object-cover"
          />
          <div className="absolute top-4 right-4 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
            {tour.type === 'day-tour' ? 'Day Tour' : 'Multi-day Tour'}
          </div>
        </div>
        
        <div className="p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-2">{tour.name}</h3>
          
          <div className="flex items-center space-x-4 text-gray-600 mb-3">
            <div className="flex items-center">
              <Clock className="h-5 w-5 mr-2" />
              <span>{tour.duration}</span>
            </div>
            <div className="flex items-center">
              <MapPin className="h-5 w-5 mr-2" />
              <span>{tour.destination}</span>
            </div>
          </div>

          <p className="mt-4 text-gray-600 line-clamp-3">{tour.description}</p>

          <div className="mt-4">
            <h4 className="font-semibold text-gray-900 mb-2">Highlights:</h4>
            <ul className="space-y-1">
              {tour.highlights.slice(0, 4).map((highlight, index) => (
                <li key={index} className="flex items-center text-gray-600">
                  <Check className="h-4 w-4 mr-2 text-green-500 flex-shrink-0" />
                  <span className="line-clamp-1">{highlight}</span>
                </li>
              ))}
              {tour.highlights.length > 4 && (
                <li className="text-blue-600 text-sm mt-1">
                  +{tour.highlights.length - 4} more highlights
                </li>
              )}
            </ul>
          </div>

          <div className="mt-6 flex items-center justify-between">
            <div className="text-gray-900">
              <span className="text-2xl font-bold">KSh {tour.pricePerPerson.toLocaleString()}</span>
              <span className="text-gray-600">/person</span>
            </div>
            <button
              onClick={() => setIsBookingModalOpen(true)}
              className="px-6 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors duration-300 font-semibold"
            >
              Book Now
            </button>
          </div>
        </div>
      </div>

      <Modal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
        title={`Book ${tour.name}`}
      >
        <TourBookingForm 
          tour={tour} 
          onSubmit={handleBooking}
          onClose={() => setIsBookingModalOpen(false)} 
        />
      </Modal>
    </>
  );
}