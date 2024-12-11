import React, { useState } from 'react';
import { Tour } from '../../types';
import { Clock, Check } from 'lucide-react';
import { Modal } from '../common/Modal';
import { TourBookingForm } from './TourBookingForm';
import Swal from 'sweetalert2';

interface TourCardProps {
  tour: Tour;
}

export function TourCard({ tour }: TourCardProps) {
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  const handleBooking = (formData: any) => {
    // Here you would typically send the booking data to your backend
    console.log('Tour Booking:', { tour, ...formData });
    setIsBookingModalOpen(false);
    Swal.fire({
      title: "Good job!",
      text: "Booking successful! Thank you for your reservation.",
      icon: "success",
    });
  };

  return (
    <>
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <img
          src={tour.imageUrl}
          alt={tour.name}
          className="w-full h-48 object-cover"
        />
        <div className="p-6">
          <h3 className="text-xl font-semibold text-gray-900">{tour.name}</h3>
          
          <div className="flex items-center mt-2 text-gray-600">
            <Clock className="h-5 w-5 mr-2" />
            <span>{tour.duration}</span>
          </div>

          <p className="mt-4 text-gray-600">{tour.description}</p>

          <div className="mt-4">
            <h4 className="font-semibold text-gray-900 mb-2">Highlights:</h4>
            <ul className="space-y-1">
              {tour.highlights.map((highlight, index) => (
                <li key={index} className="flex items-center text-gray-600">
                  <Check className="h-4 w-4 mr-2 text-green-500" />
                  {highlight}
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-6 flex items-center justify-between">
            <div className="text-gray-900">
              <span className="text-2xl font-bold">KSh {tour.price.toLocaleString()}</span>
              <span className="text-gray-600">/person</span>
            </div>
            <button
              onClick={() => setIsBookingModalOpen(true)}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Book Tour
            </button>
          </div>
        </div>
      </div>

      <Modal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
        title={`Book ${tour.name}`}
      >
        <TourBookingForm tour={tour} onSubmit={handleBooking} />
      </Modal>
    </>
  );
}