import React from 'react';
import { Shield, Clock, Award } from 'lucide-react';

export function About() {
  const features = [
    {
      icon: Shield,
      title: 'Safe & Reliable',
      description: 'Well-maintained vehicles and experienced drivers for your safety',
    },
    {
      icon: Clock,
      title: '24/7 Service',
      description: 'Round-the-clock support for all your travel needs',
    },
    {
      icon: Award,
      title: 'Best Experience',
      description: 'Curated tours and premium vehicles for unforgettable journeys',
    },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Welcome to Shilaabo Tour and Car Hire
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Your trusted partner in exploring Kenya's breathtaking landscapes and urban adventures.
            We provide premium car rental services and carefully crafted tour packages.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="p-6 border border-gray-200 rounded-lg hover:shadow-lg transition-shadow"
            >
              <feature.icon className="h-10 w-10 text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}