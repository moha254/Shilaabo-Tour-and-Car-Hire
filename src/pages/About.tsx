import React from 'react';
import { Users, Target, Heart } from 'lucide-react';

export function About() {
  return (
    <div className="pt-16 min-h-screen">
      {/* Hero Section */}
      <div className="relative py-20 bg-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold text-white mb-4">About Shilaabo</h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            Your trusted partner in exploring Kenya's breathtaking landscapes since 2010
          </p>
        </div>
      </div>

      {/* Mission & Vision */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <Target className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Our Mission</h3>
              <p className="text-gray-600">
                To provide exceptional travel experiences through reliable transportation and expertly curated tours.
              </p>
            </div>
            <div className="text-center">
              <Heart className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Our Values</h3>
              <p className="text-gray-600">
                Safety, reliability, and customer satisfaction are at the heart of everything we do.
              </p>
            </div>
            <div className="text-center">
              <Users className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Our Team</h3>
              <p className="text-gray-600">
                A dedicated team of professionals committed to making your journey memorable.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Story Section */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Our Story</h2>
              <p className="text-gray-600 mb-4">
                Founded in 2010, Shilaabo Tour and Car Hire began with a vision to showcase Kenya's natural beauty and rich culture to the world. What started as a small car rental service has grown into a full-service travel company.
              </p>
              <p className="text-gray-600">
                Today, we're proud to have served thousands of satisfied customers, helping them create unforgettable memories across Kenya's most spectacular destinations.
              </p>
            </div>
            <div>
              <img
                src="https://images.unsplash.com/photo-1516426122078-c23e76319801?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
                alt="Safari Experience"
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}