import React, { useState } from 'react';
import { Car } from '../../types';
import { Users, Gauge, Check } from 'lucide-react';
import { Modal } from '../common/Modal';
import { CarBookingForm } from './CarBookingForm';
import { carBookingService } from '../../services/carBooking';
import Swal from 'sweetalert2';

interface CarCardProps {
  car: Car;
}

export function CarCard({ car }: CarCardProps) {
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  const handleBooking = async (formData: { [key: string]: string | boolean | number }) => {
    try {
      const response = await carBookingService.createBooking(formData);
      console.log('Booking successful:', response);
      Swal.fire('Success', 'Your booking has been saved!', 'success');
    } catch (error) {
      console.error('Error saving booking:', error);
      Swal.fire('Error', 'There was an error saving your booking. Please try again.', 'error');
    }
    setIsBookingModalOpen(false);
  };

  return (
    <>
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <img
          src={car.imageUrl}
          alt={`${car.brand} ${car.model}`}
          className="w-full h-64 object-bottom"
        />
        <div className="p-6">
          <h3 className="text-xl font-semibold text-gray-900">
            {car.brand} {car.model}
          </h3>
          <p className="text-gray-600 mt-2">Year: {car.year}</p>
          
          <div className="flex items-center gap-4 mt-4">
            <div className="flex items-center text-gray-600">
              <Users className="h-5 w-5 mr-1" />
              <span>{car.seats} Seats</span>
            </div>
            <div className="flex items-center text-gray-600">
              <Gauge className="h-5 w-5 mr-1" />
              <span>{car.transmission}</span>
            </div>
          </div>

          <div className="mt-4">
            <h4 className="font-semibold text-gray-900 mb-2">Features:</h4>
            <ul className="space-y-1">
              {car.features.map((feature, index) => (
                <li key={index} className="flex items-center text-gray-600">
                  <Check className="h-4 w-4 mr-2 text-green-500" />
                  {feature}
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-6 flex items-center justify-between">
            <div className="text-gray-900">
              <span className="text-2xl font-bold">KSh {car.pricePerDay.toLocaleString()}</span>
              <span className="text-gray-600">/day</span>
            </div>
            <button
              onClick={() => setIsBookingModalOpen(true)}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Book Now
            </button>
          </div>
        </div>
      </div>

      <Modal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
        title={`Book ${car.brand} ${car.model}`}
      >
        <CarBookingForm 
          car={car} 
          onSubmit={handleBooking}
          onClose={() => setIsBookingModalOpen(false)}
        />
      </Modal>
    </>
  );
}