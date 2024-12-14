import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { Car } from '../../types';
import { createCarBooking } from '../../services/api';

interface CarBookingFormProps {
  car: Car;
  onSubmit: (formData: any) => Promise<void>;
  onClose: () => void;
}

interface InputProps {
  label: string;
  name: string;
  value: string | boolean | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  required?: boolean;
}

const TextInput: React.FC<InputProps> = ({ label, name, value, onChange, type = 'text', required = false }) => (
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
      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
    />
  </div>
);

const TimeInput: React.FC<InputProps> = ({ label, name, value, onChange, required = false }) => (
  <div className="mb-4">
    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor={name}>
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <input
      type="time"
      id={name}
      name={name}
      value={value}
      onChange={onChange}
      required={required}
      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
    />
  </div>
);

const CheckboxInput: React.FC<InputProps> = ({ label, name, value, onChange }) => (
  <div className="mb-4 flex items-center">
    <input
      type="checkbox"
      id={name}
      name={name}
      checked={!!value}
      onChange={onChange}
      className="mr-2"
    />
    <label className="text-gray-700 text-sm font-bold" htmlFor={name}>
      {label}
    </label>
  </div>
);

export function CarBookingForm({ car, onSubmit, onClose }: CarBookingFormProps) {
  const initialFormState = {
    pickupDate: '',
    returnDate: '',
    pickupTime: '',
    returnTime: '',
    driverRequired: true,
    name: '',
    email: '',
    phone: '',
    carModel: `${car.brand} ${car.model}`,
    price: car.pricePerDay,
    rentalDuration: 1,
  };

  const [formData, setFormData] = useState(initialFormState);
  const [loading, setLoading] = useState(false);
  const [totalPrice, setTotalPrice] = useState(car.pricePerDay);
  const [priceBreakdown, setPriceBreakdown] = useState<{ date: string; price: number }[]>([]);

  const calculateRentalDuration = (pickup: string, returnDate: string) => {
    if (!pickup || !returnDate) return 1;
    const start = new Date(pickup);
    const end = new Date(returnDate);
    const diffTime = Math.abs(end.getTime() - start.getTime());
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

  const updatePriceCalculation = (pickup: string, returnDate: string) => {
    if (!pickup || !returnDate) {
      setTotalPrice(car.pricePerDay);
      setPriceBreakdown([]);
      return;
    }

    const dates = generateDateRange(pickup, returnDate);
    const breakdown = dates.map(date => ({
      date,
      price: car.pricePerDay
    }));

    setPriceBreakdown(breakdown);
    setTotalPrice(car.pricePerDay * dates.length);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    const updatedValue = type === 'checkbox' ? checked : 
                        type === 'number' ? parseInt(value) || 1 : 
                        value;
    
    setFormData(prev => {
      const newFormData = { ...prev, [name]: updatedValue };
      
      if (name === 'pickupDate') {
        if (prev.rentalDuration) {
          const startDate = new Date(value);
          const endDate = new Date(startDate);
          endDate.setDate(startDate.getDate() + (prev.rentalDuration - 1));
          newFormData.returnDate = endDate.toISOString().split('T')[0];
          updatePriceCalculation(value, newFormData.returnDate);
        }
      } else if (name === 'rentalDuration') {
        if (prev.pickupDate) {
          const startDate = new Date(prev.pickupDate);
          const endDate = new Date(startDate);
          endDate.setDate(startDate.getDate() + (parseInt(value) - 1));
          newFormData.returnDate = endDate.toISOString().split('T')[0];
          updatePriceCalculation(prev.pickupDate, newFormData.returnDate);
        }
      } else if (name === 'returnDate') {
        if (prev.pickupDate) {
          const duration = calculateRentalDuration(prev.pickupDate, value);
          newFormData.rentalDuration = duration;
          updatePriceCalculation(prev.pickupDate, value);
        }
      }
      
      return newFormData;
    });
  };

  const validateDates = () => {
    const pickup = new Date(formData.pickupDate);
    const returnDate = new Date(formData.returnDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (pickup < today) {
      Swal.fire('Error', 'Pickup date cannot be in the past', 'error');
      return false;
    }

    if (returnDate < pickup) {
      Swal.fire('Error', 'Return date must be after pickup date', 'error');
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const bookingData = {
        ...formData,
        totalPrice,
        carModel: `${car.brand} ${car.model}`,
        price: car.pricePerDay,
      };

      console.log('Sending booking data:', bookingData);
      
      // First, save to MongoDB
      const savedBooking = await createCarBooking(bookingData);
      console.log('Booking saved:', savedBooking);

      // Then, redirect to WhatsApp
      redirectToWhatsApp(bookingData);

      await Swal.fire({
        title: 'Booking Successful!',
        text: 'Your booking has been saved and sent via WhatsApp.',
        icon: 'success',
        confirmButtonText: 'OK',
      });

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
    const message = `
      Hello Shilaabo Tour and Car Hire,
      I would like to book a car with the following details:

      *Car Model:* ${car.brand} ${car.model}
      *Pickup Date:* ${formData.pickupDate}
      *Return Date:* ${formData.returnDate}
      *Pickup Time:* ${formData.pickupTime}
      *Return Time:* ${formData.returnTime}
      *Driver Required:* ${formData.driverRequired ? 'Yes' : 'No'}
      *Price per Day:* KSH ${car.pricePerDay}
      *Rental Duration:* ${formData.rentalDuration} day(s)
      *Total Price:* KSH ${totalPrice}
      *Name:* ${formData.name}
      *Email:* ${formData.email}
      *Phone:* ${formData.phone}
    `;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/+254722814942?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
  };

  const resetForm = () => {
    setFormData(initialFormState);
    setTotalPrice(car.pricePerDay);
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <TextInput 
          label="Pickup Date" 
          name="pickupDate" 
          value={formData.pickupDate} 
          onChange={handleChange} 
          type="date"
          required 
        />
        <TextInput 
          label="Rental Duration (days)" 
          name="rentalDuration" 
          value={formData.rentalDuration} 
          onChange={handleChange} 
          type="number"
          required 
        />
        <TextInput 
          label="Return Date" 
          name="returnDate" 
          value={formData.returnDate} 
          onChange={handleChange} 
          type="date"
          required 
        />
        <TimeInput 
          label="Pickup Time" 
          name="pickupTime" 
          value={formData.pickupTime} 
          onChange={handleChange} 
          required 
        />
        <TimeInput 
          label="Return Time" 
          name="returnTime" 
          value={formData.returnTime} 
          onChange={handleChange} 
          required 
        />
        <CheckboxInput 
          label="Driver Required?" 
          name="driverRequired" 
          value={formData.driverRequired} 
          onChange={handleChange} 
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
          type="email"
          onChange={handleChange} 
          required 
        />
        <TextInput 
          label="Phone" 
          name="phone" 
          value={formData.phone} 
          type="tel"
          onChange={handleChange} 
          required 
        />
        <button
          type="submit"
          className="w-full px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75 disabled:bg-blue-300"
          disabled={loading}
        >
          {loading ? 'Processing...' : 'Book Now'}
        </button>
      </form>
      <div className="mt-8 p-4 border border-gray-300 rounded shadow-sm">
        <h2 className="text-xl font-semibold mb-4">Booking Preview</h2>
        <div className="space-y-2">
          <p><strong>Car Model:</strong> {car.brand} {car.model}</p>
          <p><strong>Price per Day:</strong> KSH {car.pricePerDay.toLocaleString()}</p>
          <p><strong>Rental Duration:</strong> {formData.rentalDuration} day(s)</p>
          <p><strong>Pickup Date:</strong> {formData.pickupDate ? new Date(formData.pickupDate).toLocaleDateString() : ''}</p>
          <p><strong>Return Date:</strong> {formData.returnDate ? new Date(formData.returnDate).toLocaleDateString() : ''}</p>
          <p><strong>Pickup Time:</strong> {formData.pickupTime}</p>
          <p><strong>Return Time:</strong> {formData.returnTime}</p>
          <p><strong>Driver Required:</strong> {formData.driverRequired ? 'Yes' : 'No'}</p>
          
          {priceBreakdown.length > 0 && (
            <div className="mt-4">
              <h3 className="font-semibold mb-2">Price Breakdown:</h3>
              <div className="max-h-40 overflow-y-auto">
                {priceBreakdown.map((item, index) => (
                  <div key={index} className="flex justify-between text-sm">
                    <span>{new Date(item.date).toLocaleDateString()}</span>
                    <span>KSH {item.price.toLocaleString()}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          <p className="text-lg font-bold mt-4">
            <strong>Total Price:</strong> KSH {totalPrice.toLocaleString()}
          </p>
          
          <p><strong>Name:</strong> {formData.name}</p>
          <p><strong>Email:</strong> {formData.email}</p>
          <p><strong>Phone:</strong> {formData.phone}</p>
        </div>
      </div>
    </div>
  );
}