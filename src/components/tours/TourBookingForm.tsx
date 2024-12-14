import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { Tour } from '../../types';
import { createTourBooking } from '../../services/api';

interface TourBookingFormProps {
  tour: Tour;
  onSubmit: (formData: any) => Promise<void>;
  onClose: () => void;
}

interface InputProps {
  label: string;
  name: string;
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  type?: string;
  required?: boolean;
  min?: string | number;
}

const TextInput: React.FC<InputProps> = ({ label, name, value, onChange, type = 'text', required = false, min }) => (
  <div className="mb-4">
    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor={name}>
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <input
      type={type}
      id={name}
      name={name}
      value={value}
      onChange={onChange}
      required={required}
      min={min}
      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
    />
  </div>
);

const TextArea: React.FC<InputProps> = ({ label, name, value, onChange, required = false }) => (
  <div className="mb-4">
    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor={name}>
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <textarea
      id={name}
      name={name}
      value={value}
      onChange={onChange}
      required={required}
      rows={4}
      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
    />
  </div>
);

export function TourBookingForm({ tour, onSubmit, onClose }: TourBookingFormProps) {
  const initialFormState = {
    name: '',
    email: '',
    phone: '',
    startDate: '',
    endDate: '',
    participants: 1,
    specialRequirements: '',
    tourName: tour.name,
    tourType: tour.type,
    destination: tour.destination,
  };

  const [formData, setFormData] = useState(initialFormState);
  const [loading, setLoading] = useState(false);
  const [totalPrice, setTotalPrice] = useState(tour.pricePerPerson);
  const [priceBreakdown, setPriceBreakdown] = useState<{ date: string; price: number }[]>([]);

  const calculateDuration = (start: string, end: string) => {
    if (!start || !end) return 1;
    const startDate = new Date(start);
    const endDate = new Date(end);
    const diffTime = Math.abs(endDate.getTime() - startDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays || 1;
  };

  const generateDateRange = (startDate: string, endDate: string) => {
    const dates: string[] = [];
    let currentDate = new Date(startDate);
    const lastDate = new Date(endDate);

    while (currentDate <= lastDate) {
      dates.push(currentDate.toISOString().split('T')[0]);
      currentDate.setDate(currentDate.getDate() + 1);
    }

    return dates;
  };

  const updatePriceCalculation = (start: string, end: string, participants: number) => {
    if (!start || !end) {
      setTotalPrice(tour.pricePerPerson * participants);
      setPriceBreakdown([]);
      return;
    }

    const dates = generateDateRange(start, end);
    const breakdown = dates.map(date => ({
      date,
      price: tour.pricePerPerson * participants
    }));

    setPriceBreakdown(breakdown);
    setTotalPrice(tour.pricePerPerson * participants * dates.length);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const updatedValue = type === 'number' ? Math.max(1, parseInt(value) || 1) : value;
    
    setFormData(prev => {
      const newFormData = { ...prev, [name]: updatedValue };
      
      if (name === 'startDate' || name === 'endDate' || name === 'participants') {
        const participants = name === 'participants' ? parseInt(value) || 1 : prev.participants;
        updatePriceCalculation(
          name === 'startDate' ? value : prev.startDate,
          name === 'endDate' ? value : prev.endDate,
          participants
        );
      }
      
      return newFormData;
    });
  };

  const validateDates = () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const start = new Date(formData.startDate);
    const end = new Date(formData.endDate);

    if (start < today) {
      Swal.fire('Error', 'Start date cannot be in the past', 'error');
      return false;
    }

    if (end < start) {
      Swal.fire('Error', 'End date cannot be before start date', 'error');
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.startDate || !formData.endDate || !formData.name || !formData.email || !formData.phone) {
      Swal.fire('Error', 'Please fill out all required fields.', 'error');
      return;
    }

    if (!validateDates()) return;

    try {
      setLoading(true);

      const bookingData = {
        ...formData,
        pricePerPerson: tour.pricePerPerson,
        totalPrice,
        status: 'pending'
      };

      console.log('Sending tour booking data:', bookingData);
      
      // First, save to MongoDB
      const savedBooking = await createTourBooking(bookingData);
      console.log('Tour booking saved:', savedBooking);

      // Then, redirect to WhatsApp
      redirectToWhatsApp(bookingData);

      await Swal.fire({
        title: 'Booking Successful!',
        text: 'Your tour booking has been saved and sent via WhatsApp.',
        icon: 'success',
        confirmButtonText: 'OK'
      });

      resetForm();
      onClose();
    } catch (error) {
      console.error('Tour booking error:', error);
      Swal.fire('Error', error instanceof Error ? error.message : 'There was an error processing your tour booking. Please try again.', 'error');
    } finally {
      setLoading(false);
    }
  };

  const redirectToWhatsApp = (bookingData: any) => {
    const message = `
      Hello Shilaabo Tour and Car Hire,
      I would like to book a tour with the following details:

      *Tour Name:* ${tour.name}
      *Tour Type:* ${tour.type}
      *Destination:* ${tour.destination}
      *Start Date:* ${new Date(bookingData.startDate).toLocaleDateString()}
      *End Date:* ${new Date(bookingData.endDate).toLocaleDateString()}
      *Duration:* ${calculateDuration(bookingData.startDate, bookingData.endDate)} day(s)
      *Number of Participants:* ${bookingData.participants}
      *Price per Person per Day:* KSH ${tour.pricePerPerson.toLocaleString()}
      *Total Price:* KSH ${totalPrice.toLocaleString()}
      *Name:* ${bookingData.name}
      *Email:* ${bookingData.email}
      *Phone:* ${bookingData.phone}
      ${bookingData.specialRequirements ? `*Special Requirements:* ${bookingData.specialRequirements}` : ''}
    `;
    
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/+254722814942?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
  };

  const resetForm = () => {
    setFormData(initialFormState);
    setTotalPrice(tour.pricePerPerson);
    setPriceBreakdown([]);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <TextInput 
        label="Start Date" 
        name="startDate" 
        value={formData.startDate} 
        onChange={handleChange} 
        type="date"
        required 
        min={new Date().toISOString().split('T')[0]}
      />

      <TextInput 
        label="End Date" 
        name="endDate" 
        value={formData.endDate} 
        onChange={handleChange} 
        type="date"
        required 
        min={formData.startDate || new Date().toISOString().split('T')[0]}
      />

      <TextInput 
        label="Number of Participants" 
        name="participants" 
        value={formData.participants} 
        onChange={handleChange} 
        type="number"
        required 
        min={1}
      />

      <TextInput 
        label="Name" 
        name="name" 
        value={formData.name} 
        onChange={handleChange} 
        required 
      />

      <TextInput 
        label="Email" 
        name="email" 
        value={formData.email} 
        onChange={handleChange} 
        type="email"
        required 
      />

      <TextInput 
        label="Phone" 
        name="phone" 
        value={formData.phone} 
        onChange={handleChange} 
        type="tel"
        required 
      />

      <TextArea 
        label="Special Requirements" 
        name="specialRequirements" 
        value={formData.specialRequirements} 
        onChange={handleChange} 
      />

      <div className="mb-6 p-4 bg-gray-50 rounded-lg">
        <h3 className="font-bold text-lg mb-2">Booking Summary</h3>
        <div className="space-y-2">
          <p><strong>Tour Name:</strong> {tour.name}</p>
          <p><strong>Tour Type:</strong> {tour.type}</p>
          <p><strong>Destination:</strong> {tour.destination}</p>
          <p><strong>Start Date:</strong> {formData.startDate ? new Date(formData.startDate).toLocaleDateString() : ''}</p>
          <p><strong>End Date:</strong> {formData.endDate ? new Date(formData.endDate).toLocaleDateString() : ''}</p>
          <p><strong>Duration:</strong> {calculateDuration(formData.startDate, formData.endDate)} day(s)</p>
          <p><strong>Number of Participants:</strong> {formData.participants}</p>
          <p><strong>Price per Person per Day:</strong> KSH {tour.pricePerPerson.toLocaleString()}</p>
          <p><strong>Total Price:</strong> KSH {totalPrice.toLocaleString()}</p>
          {formData.specialRequirements && (
            <p><strong>Special Requirements:</strong> {formData.specialRequirements}</p>
          )}
        </div>
      </div>

      {priceBreakdown.length > 0 && (
        <div className="mb-6 p-4 bg-gray-50 rounded-lg">
          <h3 className="font-bold text-lg mb-2">Price Breakdown</h3>
          <div className="space-y-1">
            {priceBreakdown.map((item, index) => (
              <p key={index}>
                {new Date(item.date).toLocaleDateString()}: KSH {item.price.toLocaleString()}
              </p>
            ))}
          </div>
        </div>
      )}

      <div className="flex justify-end space-x-4">
        <button
          type="button"
          onClick={onClose}
          className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={loading}
          className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          {loading ? 'Booking...' : 'Book Now'}
        </button>
      </div>
    </form>
  );
}
