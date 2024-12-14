import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { Tour } from '../../types';
import { tourBookingService } from '../../services/tourBooking';

interface TourBookingFormProps {
  tour: Tour;
  onSubmit: (formData: any) => void;
  onClose: () => void;
}

export function TourBookingForm({ tour, onSubmit, onClose }: TourBookingFormProps) {
  const [formData, setFormData] = useState({
    tourName: tour.name,
    startDate: '',
    participants: 1,
    name: '',
    email: '',
    phone: '',
    specialRequirements: '',
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const calculateTotalPrice = () => {
    return tour.price * formData.participants;
  };

  const resetForm = () => {
    setFormData({
      tourName: tour.name,
      startDate: '',
      participants: 1,
      name: '',
      email: '',
      phone: '',
      specialRequirements: '',
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.startDate || !formData.name || !formData.email || !formData.phone) {
      Swal.fire('Error', 'Please fill out all required fields.', 'error');
      return;
    }

    try {
      setLoading(true);
      const response = await tourBookingService.createBooking(formData);

      // First redirect to WhatsApp
      redirectToWhatsApp(response);
      
      // Then show success message
      await Swal.fire({
        title: 'Booking Success!',
        text: 'Your tour booking has been processed successfully.',
        icon: 'success',
        confirmButtonText: 'OK'
      });

      // Finally reset form and close modal
      resetForm();
      onClose();
      
    } catch (error) {
      console.error('Booking error:', error);
      Swal.fire('Error', 'There was an error processing your booking. Please try again.', 'error');
    } finally {
      setLoading(false);
    }
  };

  const redirectToWhatsApp = (booking: any) => {
    const totalPrice = calculateTotalPrice();
    const message = `
      Hello Shilaabo Tour and Car Hire,

I would like to book a tour with the following details:
      *Tour Name:* ${tour.name}
      *Start Date:* ${formData.startDate}
      *Participants:* ${formData.participants}
      *Total Price:* KSH ${totalPrice.toLocaleString()}
      *Name:* ${formData.name}
      *Email:* ${formData.email}
      *Phone:* ${formData.phone}
      *Special Requirements:* ${formData.specialRequirements || 'None'}
    `;
    
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/+254722814942?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700">Start Date</label>
        <input
          type="date"
          name="startDate"
          required
          value={formData.startDate}
          onChange={handleChange}
          min={new Date().toISOString().split('T')[0]}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Number of Participants</label>
        <input
          type="number"
          name="participants"
          required
          min="1"
          value={formData.participants}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Name</label>
        <input
          type="text"
          name="name"
          required
          value={formData.name}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Email</label>
        <input
          type="email"
          name="email"
          required
          value={formData.email}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Phone</label>
        <input
          type="tel"
          name="phone"
          required
          value={formData.phone}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Special Requirements</label>
        <textarea
          name="specialRequirements"
          value={formData.specialRequirements}
          onChange={handleChange}
          rows={3}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          placeholder="Any special requirements or requests..."
        />
      </div>

      <div className="mt-8 p-4 border border-gray-300 rounded shadow-sm">
        <h2 className="text-xl font-semibold mb-4">Booking Preview</h2>
        <div>
          <p><strong>Tour:</strong> {tour.name}</p>
          <p><strong>Start Date:</strong> {formData.startDate}</p>
          <p><strong>Participants:</strong> {formData.participants}</p>
          <p><strong>Price per Person:</strong> KSH {tour.price.toLocaleString()}</p>
          <p><strong>Total Price:</strong> KSH {calculateTotalPrice().toLocaleString()}</p>
        </div>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
      >
        {loading ? 'Processing...' : 'Book Now'}
      </button>
    </form>
  );
}
