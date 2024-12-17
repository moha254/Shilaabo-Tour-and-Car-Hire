import React, { useState, useEffect } from 'react';
import { Tour } from './types';

interface TourBookingFormProps {
  tour: Tour;
  onSubmit: (formData: any) => void;
  onClose?: () => void;
}

export function TourBookingForm({ tour, onSubmit, onClose }: TourBookingFormProps) {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    date: '',
    numberOfPeople: '1',
    pickupLocation: '',
    additionalRequirements: ''
  });

  const [totalPrice, setTotalPrice] = useState(tour.price);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    const numPeople = parseInt(formData.numberOfPeople) || 1;
    setTotalPrice(numPeople * tour.price);
  }, [formData.numberOfPeople, tour.price]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    
    // Phone validation (Kenyan format)
    const phoneRegex = /^(?:\+254|0)[17]\d{8}$/;
    if (!phoneRegex.test(formData.phone.replace(/\s/g, ''))) {
      newErrors.phone = 'Please enter a valid Kenyan phone number (e.g., 0712345678 or +254712345678)';
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Number of people validation
    const numPeople = parseInt(formData.numberOfPeople);
    if (isNaN(numPeople) || numPeople < 1) {
      newErrors.numberOfPeople = 'Number of people must be at least 1';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    // Construct WhatsApp message
    const whatsappMessage = `*New Tour Booking Request*%0A
*Tour Details*%0A
Tour: ${tour.name}%0A
Description: ${tour.description}%0A
Price per person: KES ${tour.price.toLocaleString()}%0A
Number of people: ${formData.numberOfPeople}%0A
Total Price: KES ${totalPrice.toLocaleString()}%0A
%0A
*Customer Details*%0A
Name: ${formData.fullName}%0A
Email: ${formData.email}%0A
Phone: ${formData.phone}%0A
%0A
*Booking Details*%0A
Date: ${formData.date}%0A
Pickup Location: ${formData.pickupLocation}%0A
Additional Requirements: ${formData.additionalRequirements || 'None'}`;

    // Submit the form data
    onSubmit({
      ...formData,
      totalPrice,
      whatsappMessage
    });

    // Redirect to WhatsApp
    window.open(`https://wa.me/254727372017?text=${whatsappMessage}`, '_blank');
    
    // Reset form
    setFormData({
      fullName: '',
      email: '',
      phone: '',
      date: '',
      numberOfPeople: '1',
      pickupLocation: '',
      additionalRequirements: ''
    });

    // Close modal if onClose is provided
    if (onClose) {
      onClose();
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg max-w-2xl mx-auto">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Book {tour.name}</h2>
        <p className="text-gray-600 mb-2">{tour.description}</p>
        <p className="text-gray-600">Fill in the details below to book your tour. All fields marked with * are required.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Full Name *
              <span className="text-xs text-gray-500 ml-1">(as it appears on your ID)</span>
            </label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleInputChange}
              required
              placeholder="John Doe"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email *
              <span className="text-xs text-gray-500 ml-1">(for booking confirmation)</span>
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              placeholder="john@example.com"
              className={`mt-1 block w-full rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 ${
                errors.email ? 'border-red-300' : 'border-gray-300'
              }`}
            />
            {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Phone *
              <span className="text-xs text-gray-500 ml-1">(Kenyan number for WhatsApp)</span>
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              required
              placeholder="0712345678"
              className={`mt-1 block w-full rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 ${
                errors.phone ? 'border-red-300' : 'border-gray-300'
              }`}
            />
            {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Tour Date *
              <span className="text-xs text-gray-500 ml-1">(select your preferred date)</span>
            </label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleInputChange}
              required
              min={new Date().toISOString().split('T')[0]}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Number of People *
              <span className="text-xs text-gray-500 ml-1">(minimum 1 person)</span>
            </label>
            <input
              type="number"
              name="numberOfPeople"
              value={formData.numberOfPeople}
              onChange={handleInputChange}
              required
              min="1"
              placeholder="1"
              className={`mt-1 block w-full rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 ${
                errors.numberOfPeople ? 'border-red-300' : 'border-gray-300'
              }`}
            />
            {errors.numberOfPeople && (
              <p className="mt-1 text-sm text-red-600">{errors.numberOfPeople}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Pickup Location *
              <span className="text-xs text-gray-500 ml-1">(where should we pick you up?)</span>
            </label>
            <input
              type="text"
              name="pickupLocation"
              value={formData.pickupLocation}
              onChange={handleInputChange}
              required
              placeholder="e.g., Paradise Hall, Eastleigh"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Additional Requirements
            <span className="text-xs text-gray-500 ml-1">(optional)</span>
          </label>
          <textarea
            name="additionalRequirements"
            value={formData.additionalRequirements}
            onChange={handleInputChange}
            rows={3}
            placeholder="Any special requests or dietary requirements?"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          ></textarea>
        </div>

        <div className="booking-summary mt-4 p-4 bg-gray-50 rounded-lg">
          <h3 className="text-lg font-semibold mb-2">Tour Summary</h3>
          <p className="mb-1">Tour: {tour.name}</p>
          <p className="mb-1">Price per person: KES {tour.price.toLocaleString()}</p>
          <p className="mb-1">Number of people: {formData.numberOfPeople}</p>
          <p className="font-semibold">Total Price: KES {totalPrice.toLocaleString()}</p>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200"
        >
          Proceed to WhatsApp Booking
        </button>
      </form>
    </div>
  );
}
