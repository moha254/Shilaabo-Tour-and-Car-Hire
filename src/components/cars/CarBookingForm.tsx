import React, { useState, useEffect } from 'react';
import { Car } from '../../types';

interface CarBookingFormProps {
  car: Car;
  onSubmit: (formData: any) => void;
  onClose?: () => void;
}

export function CarBookingForm({ car, onSubmit, onClose }: CarBookingFormProps) {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    pickupLocation: '',
    dropoffLocation: '',
    pickupDate: '',
    dropoffDate: '',
    pickupTime: '',
    dropoffTime: '',
    withDriver: true,
    numberOfDays: 1,
    additionalRequirements: ''
  });

  const [totalPrice, setTotalPrice] = useState(0);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;

    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : 
              name === 'numberOfDays' ? Math.max(1, parseInt(value) || 1) : value
    }));

    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  useEffect(() => {
    // Calculate total price based on number of days and driver option
    const driverCost = formData.withDriver ? 2000 : 0;
    const dailyRate = car.price;
    const days = formData.numberOfDays;
    const newTotalPrice = (dailyRate + driverCost) * days;
    setTotalPrice(newTotalPrice);
  }, [formData.withDriver, formData.numberOfDays, car.price]);

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.fullName) newErrors.fullName = 'Full name is required';
    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.phone) newErrors.phone = 'Phone number is required';
    if (!formData.pickupLocation) newErrors.pickupLocation = 'Pickup location is required';
    if (!formData.dropoffLocation) newErrors.dropoffLocation = 'Drop-off location is required';
    if (!formData.pickupDate) newErrors.pickupDate = 'Pickup date is required';
    if (!formData.dropoffDate) newErrors.dropoffDate = 'Drop-off date is required';
    if (!formData.pickupTime) newErrors.pickupTime = 'Pickup time is required';
    if (!formData.dropoffTime) newErrors.dropoffTime = 'Drop-off time is required';
    if (formData.numberOfDays < 1) newErrors.numberOfDays = 'Number of days must be at least 1';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    // Submit the form data
    onSubmit({
      ...formData,
      totalPrice,
      car: car.name
    });

    const whatsappMessage = `*New Car Booking Request*%0A
*Car Details*%0A
Car: ${car.brand} ${car.model}%0A
Number of Days: ${formData.numberOfDays}%0A
Base Price per Day: KSh ${car.price.toLocaleString()}%0A
Driver Service: ${formData.withDriver ? 'Yes (+KSh 2,000/day)' : 'No'}%0A
Total Price: KSh ${totalPrice.toLocaleString()}%0A%0A
*Customer Details*%0A
Name: ${formData.fullName}%0A
Email: ${formData.email}%0A
Phone: ${formData.phone}%0A%0A
*Booking Details*%0A
Pickup Location: ${formData.pickupLocation}%0A
Drop-off Location: ${formData.dropoffLocation}%0A
Pickup Date: ${formData.pickupDate}%0A
Drop-off Date: ${formData.dropoffDate}%0A
Pickup Time: ${formData.pickupTime}%0A
Drop-off Time: ${formData.dropoffTime}%0A
Additional Requirements: ${formData.additionalRequirements || 'None'}`;

    window.open(`https://wa.me/254700119134?text=${whatsappMessage}`);
    onClose?.();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        {/* Personal Information */}
        <div>
          <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">Full Name</label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            value={formData.fullName}
            onChange={handleInputChange}
            className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm ${errors.fullName ? 'border-red-500' : ''}`}
          />
          {errors.fullName && <p className="mt-1 text-sm text-red-500">{errors.fullName}</p>}
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm ${errors.email ? 'border-red-500' : ''}`}
          />
          {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
        </div>

        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone Number</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm ${errors.phone ? 'border-red-500' : ''}`}
          />
          {errors.phone && <p className="mt-1 text-sm text-red-500">{errors.phone}</p>}
        </div>

        {/* Booking Details */}
        <div>
          <label htmlFor="numberOfDays" className="block text-sm font-medium text-gray-700">Number of Days</label>
          <input
            type="number"
            id="numberOfDays"
            name="numberOfDays"
            min="1"
            value={formData.numberOfDays}
            onChange={handleInputChange}
            className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm ${errors.numberOfDays ? 'border-red-500' : ''}`}
          />
          {errors.numberOfDays && <p className="mt-1 text-sm text-red-500">{errors.numberOfDays}</p>}
        </div>

        <div>
          <label htmlFor="pickupLocation" className="block text-sm font-medium text-gray-700">Pickup Location</label>
          <input
            type="text"
            id="pickupLocation"
            name="pickupLocation"
            value={formData.pickupLocation}
            onChange={handleInputChange}
            className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm ${errors.pickupLocation ? 'border-red-500' : ''}`}
          />
          {errors.pickupLocation && <p className="mt-1 text-sm text-red-500">{errors.pickupLocation}</p>}
        </div>

        <div>
          <label htmlFor="dropoffLocation" className="block text-sm font-medium text-gray-700">Drop-off Location</label>
          <input
            type="text"
            id="dropoffLocation"
            name="dropoffLocation"
            value={formData.dropoffLocation}
            onChange={handleInputChange}
            className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm ${errors.dropoffLocation ? 'border-red-500' : ''}`}
          />
          {errors.dropoffLocation && <p className="mt-1 text-sm text-red-500">{errors.dropoffLocation}</p>}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="pickupDate" className="block text-sm font-medium text-gray-700">Pickup Date</label>
            <input
              type="date"
              id="pickupDate"
              name="pickupDate"
              value={formData.pickupDate}
              onChange={handleInputChange}
              min={new Date().toISOString().split('T')[0]}
              className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm ${errors.pickupDate ? 'border-red-500' : ''}`}
            />
            {errors.pickupDate && <p className="mt-1 text-sm text-red-500">{errors.pickupDate}</p>}
          </div>

          <div>
            <label htmlFor="dropoffDate" className="block text-sm font-medium text-gray-700">Drop-off Date</label>
            <input
              type="date"
              id="dropoffDate"
              name="dropoffDate"
              value={formData.dropoffDate}
              onChange={handleInputChange}
              min={formData.pickupDate || new Date().toISOString().split('T')[0]}
              className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm ${errors.dropoffDate ? 'border-red-500' : ''}`}
            />
            {errors.dropoffDate && <p className="mt-1 text-sm text-red-500">{errors.dropoffDate}</p>}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="pickupTime" className="block text-sm font-medium text-gray-700">Pickup Time</label>
            <input
              type="time"
              id="pickupTime"
              name="pickupTime"
              value={formData.pickupTime}
              onChange={handleInputChange}
              className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm ${errors.pickupTime ? 'border-red-500' : ''}`}
            />
            {errors.pickupTime && <p className="mt-1 text-sm text-red-500">{errors.pickupTime}</p>}
          </div>

          <div>
            <label htmlFor="dropoffTime" className="block text-sm font-medium text-gray-700">Drop-off Time</label>
            <input
              type="time"
              id="dropoffTime"
              name="dropoffTime"
              value={formData.dropoffTime}
              onChange={handleInputChange}
              className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm ${errors.dropoffTime ? 'border-red-500' : ''}`}
            />
            {errors.dropoffTime && <p className="mt-1 text-sm text-red-500">{errors.dropoffTime}</p>}
          </div>
        </div>

        <div className="flex items-center">
          <input
            type="checkbox"
            id="withDriver"
            name="withDriver"
            checked={formData.withDriver}
            onChange={handleInputChange}
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
          <label htmlFor="withDriver" className="ml-2 block text-sm text-gray-700">
            Include Driver (+KSh 2,000/day)
          </label>
        </div>

        <div>
          <label htmlFor="additionalRequirements" className="block text-sm font-medium text-gray-700">
            Additional Requirements
          </label>
          <textarea
            id="additionalRequirements"
            name="additionalRequirements"
            value={formData.additionalRequirements}
            onChange={handleInputChange}
            rows={3}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            placeholder="Any special requests or requirements..."
          />
        </div>

        {/* Booking Summary */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Booking Summary</h3>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-600">Car:</span>
              <span className="font-medium">{car.brand} {car.model}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Number of Days:</span>
              <span className="font-medium">{formData.numberOfDays}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Base Price per Day:</span>
              <span className="font-medium">KSh {car.price.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Driver Service:</span>
              <span className="font-medium">{formData.withDriver ? 'Yes (+KSh 2,000/day)' : 'No'}</span>
            </div>
            <div className="flex justify-between text-lg font-bold border-t pt-2 mt-2">
              <span>Total Price:</span>
              <span>KSh {totalPrice.toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end space-x-3">
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Book Now
        </button>
      </div>
    </form>
  );
}
