import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { Car } from '../../types';

interface CarBookingFormProps {
  car: Car;
}

interface InputProps {
  label: string;
  name: string;
  value: string | boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  required?: boolean;
  min?: string;
}

const TextInput: React.FC<InputProps> = ({ label, name, value, onChange, type = 'text', required }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700">{label}</label>
    <input
      type={type}
      name={name}
      required={required}
      value={value as string}
      onChange={onChange}
      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
    />
  </div>
);

const DateInput: React.FC<InputProps> = ({ label, name, value, onChange, min, required }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700">{label}</label>
    <input
      type="date"
      name={name}
      required={required}
      value={value as string}
      onChange={onChange}
      min={min}
      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
    />
  </div>
);

const TimeInput: React.FC<InputProps> = ({ label, name, value, onChange, required }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700">{label}</label>
    <input
      type="time"
      name={name}
      required={required}
      value={value as string}
      onChange={onChange}
      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
    />
  </div>
);

const CheckboxInput: React.FC<InputProps> = ({ label, name, value, onChange }) => (
  <div>
    <label className="flex items-center">
      <input
        type="checkbox"
        name={name}
        checked={value as boolean}
        onChange={onChange}
        className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-500 focus:ring-blue-500"
      />
      <span className="ml-2 text-sm text-gray-600">{label}</span>
    </label>
  </div>
);

export function CarBookingForm({ car }: CarBookingFormProps) {
  const [formData, setFormData] = useState({
    pickupDate: '',
    returnDate: '',
    pickupTime: '',
    returnTime: '',
    driverRequired: true,
    name: '',
    email: '',
    phone: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.pickupDate && formData.returnDate && formData.name && formData.email && formData.phone) {
      try {
        // Display success message
        Swal.fire('Booking Success!', 'Your car booking has been processed successfully.', 'success');

        // Redirect to WhatsApp with the booking details
        redirectToWhatsApp();

        // Clear the form after successful booking
        setFormData({
          pickupDate: '',
          returnDate: '',
          pickupTime: '',
          returnTime: '',
          driverRequired: true,
          name: '',
          email: '',
          phone: '',
        });
      } catch (error) {
        // Display error message if submission fails
        Swal.fire('Error', 'There was an error processing your booking. Please try again.', 'error');
        console.error('Error processing booking:', error);
      }
    } else {
      // Display error message if required fields are missing
      Swal.fire('Error', 'Please fill out all required fields.', 'error');
    }
  };

  const redirectToWhatsApp = () => {
    const message = `
      Hello, I would like to book a car with the following details:
      Car Model: ${car.model}
      Pickup Date: ${formData.pickupDate}
      Return Date: ${formData.returnDate}
      Pickup Time: ${formData.pickupTime}
      Return Time: ${formData.returnTime}
      Driver Required: ${formData.driverRequired ? 'Yes' : 'No'}
      Name: ${formData.name}
      Email: ${formData.email}
      Phone: ${formData.phone}
    `;

    const whatsappNumber = '+254722814942'; // Replace with your actual WhatsApp number
    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

    window.open(url, '_blank');
  };

  return (
    <div className="space-y-4">
      <form className="space-y-4" onSubmit={handleSubmit}>
        <TextInput label="Name" name="name" value={formData.name} onChange={handleChange} required />
        <TextInput label="Email" name="email" value={formData.email} onChange={handleChange} type="email" required />
        <TextInput label="Phone" name="phone" value={formData.phone} onChange={handleChange} type="tel" required />
        <DateInput label="Pickup Date" name="pickupDate" value={formData.pickupDate} onChange={handleChange} min={new Date().toISOString().split('T')[0]} required />
        <DateInput label="Return Date" name="returnDate" value={formData.returnDate} onChange={handleChange} min={formData.pickupDate} required />
        <TimeInput label="Pickup Time" name="pickupTime" value={formData.pickupTime} onChange={handleChange} required />
        <TimeInput label="Return Time" name="returnTime" value={formData.returnTime} onChange={handleChange} required />
        <CheckboxInput label="Driver Required?" name="driverRequired" value={formData.driverRequired} onChange={handleChange} />
        <button type="submit" className="w-full px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75">
          Book Now
        </button>
      </form>

      {/* Preview Section */}
      <div className="mt-8 p-4 border border-gray-300 rounded shadow-sm">
        <h2 className="text-xl font-semibold mb-4">Booking Preview</h2>
        <div>
          <p><strong>Car Model:</strong> {car.model}</p>
          <p><strong>Pickup Date:</strong> {formData.pickupDate}</p>
          <p><strong>Return Date:</strong> {formData.returnDate}</p>
          <p><strong>Pickup Time:</strong> {formData.pickupTime}</p>
          <p><strong>Return Time:</strong> {formData.returnTime}</p>
          <p><strong>Driver Required:</strong> {formData.driverRequired ? 'Yes' : 'No'}</p>
          <p><strong>Name:</strong> {formData.name}</p>
          <p><strong>Email:</strong> {formData.email}</p>
          <p><strong>Phone:</strong> {formData.phone}</p>
        </div>
      </div>
    </div>
  );
}
