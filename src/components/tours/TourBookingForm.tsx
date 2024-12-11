import React, { useState } from 'react';
import Swal from 'sweetalert2';
import jsPDF from 'jspdf';
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
      generatePDF();
    } else {
      Swal.fire('Error', 'Please fill out all required fields.', 'error');
    }
  };

  const generatePDF = () => {
    const pdf = new jsPDF();

    // Add a logo with better styling for clarity and positioning
    const logoUrl = '/img/logo.png'; // Replace with the actual path to your logo
    const imgWidth = 40;
    const imgHeight = 40;
    pdf.addImage(logoUrl, 'PNG', 85, 10, imgWidth, imgHeight); // Centered horizontally at the top

    // Add text below the logo
    pdf.setFontSize(14);
    pdf.setFont('helvetica', 'bold');
    pdf.setTextColor(0, 51, 102); // Dark blue color for the text
    pdf.text('Shilaabo Tour and Car Hire', 105, 55, { align: 'center' });

    // Add a styled title to the document
    pdf.setFontSize(18);
    pdf.setFont('helvetica', 'bold');
    pdf.setTextColor(0, 51, 102); // Dark blue color for the title
    pdf.text('Tour Booking Confirmation', 105, 70, { align: 'center' });

    // Booking details
    pdf.setFontSize(12);
    pdf.setFont('helvetica', 'normal');
    pdf.setTextColor(0, 0, 0); // Black color for details
    pdf.text(`Tour Name: ${tour.name}`, 10, 90);
    pdf.text(`Start Date: ${formData.startDate}`, 10, 100);
    pdf.text(`Participants: ${formData.participants}`, 10, 110);
    pdf.text(`Name: ${formData.name}`, 10, 120);
    pdf.text(`Email: ${formData.email}`, 10, 130);
    pdf.text(`Phone: ${formData.phone}`, 10, 140);
    pdf.text(`Special Requirements: ${formData.specialRequirements || 'None'}`, 10, 150);

    // Save the PDF
    pdf.save('tour-booking-confirmation.pdf');
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
