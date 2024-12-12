import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { Tour } from '../../types';

interface TourBookingFormProps {
  tour: Tour;
  onSubmit: (formData: any) => void;
}

export function TourBookingForm({ tour, onSubmit }: TourBookingFormProps) {
  const [formData, setFormData] = useState({
    startDate: '',
    participants: 1,
    name: '',
    email: '',
    phone: '',
    specialRequirements: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.startDate && formData.name && formData.email && formData.phone) {
      Swal.fire('Booking Success!', 'Your tour booking has been processed successfully.', 'success');
      onSubmit(formData);
      redirectToWhatsApp();  // Redirect to WhatsApp after booking
    } else {
      Swal.fire('Error', 'Please fill out all required fields.', 'error');
    }
  };

  const redirectToWhatsApp = () => {
    const message = `
      *Tour Booking Details*
      *Tour Name:* ${tour.name}
      *Start Date:* ${formData.startDate}
      *Participants:* ${formData.participants}
      *Name:* ${formData.name}
      *Email:* ${formData.email}
      *Phone:* ${formData.phone}
      *Special Requirements:* ${formData.specialRequirements || 'None'}
    `;
    
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/?text=${encodedMessage}`;
    
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Name</label>
          <input
            type="text"
            name="name"
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            value={formData.name}
            onChange={handleChange}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            name="email"
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            value={formData.email}
            onChange={handleChange}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Phone</label>
          <input
            type="tel"
            name="phone"
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            value={formData.phone}
            onChange={handleChange}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Start Date</label>
          <input
            type="date"
            name="startDate"
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            value={formData.startDate}
            onChange={handleChange}
            min={new Date().toISOString().split('T')[0]}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Participants</label>
          <input
            type="number"
            name="participants"
            required
            min="1"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            value={formData.participants}
            onChange={handleChange}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Special Requirements</label>
          <textarea
            name="specialRequirements"
            rows={3}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            value={formData.specialRequirements}
            onChange={handleChange}
          />
        </div>

        <div className="mt-6">
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
          >
            Book Tour
          </button>
        </div>
      </form>

      {/* Preview Section */}
      <div className="mt-8 p-4 border border-gray-300 rounded shadow-sm">
        <h2 className="text-xl font-semibold mb-4">Booking Preview</h2>
        <div>
          <p><strong>Tour Name:</strong> {tour.name}</p>
          <p><strong>Start Date:</strong> {formData.startDate}</p>
          <p><strong>Participants:</strong> {formData.participants}</p>
          <p><strong>Name:</strong> {formData.name}</p>
          <p><strong>Email:</strong> {formData.email}</p>
          <p><strong>Phone:</strong> {formData.phone}</p>
          <p><strong>Special Requirements:</strong> {formData.specialRequirements || 'None'}</p>
        </div>
      </div>
    </div>
  );
}
