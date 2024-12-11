import React from 'react';
import { Menu, X, Car, Map, Phone, User } from 'lucide-react';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  return (
    <header className="fixed w-full bg-white shadow-md z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
          <img src="/img/logo.png" alt="Shilaabo Logo" className="h-10 w-auto" />
          
            <span className="text-2xl font-bold text-blue-600">Shilaabo Tour and Car Hire</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <a href="/" className="flex items-center text-gray-700 hover:text-blue-600">
              Home
            </a>
            <a href="/cars" className="flex items-center text-gray-700 hover:text-blue-600">
              <Car className="w-4 h-4 mr-1" />
              Car Hire
            </a>
            <a href="/tours" className="flex items-center text-gray-700 hover:text-blue-600">
              <Map className="w-4 h-4 mr-1" />
              Tours
            </a>
            <a href="/about" className="flex items-center text-gray-700 hover:text-blue-600">
              <User className="w-4 h-4 mr-1" />
              About
            </a>
            <a href="/contact" className="flex items-center text-gray-700 hover:text-blue-600">
              <Phone className="w-4 h-4 mr-1" />
              Contact
            </a>
          </nav>

          {/* Mobile menu button */}
          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <a href="/" className="block px-3 py-2 text-gray-700 hover:text-blue-600">
              Home
            </a>
            <a href="/cars" className="block px-3 py-2 text-gray-700 hover:text-blue-600">
              Car Hire
            </a>
            <a href="/tours" className="block px-3 py-2 text-gray-700 hover:text-blue-600">
              Tours
            </a>
            <a href="/about" className="block px-3 py-2 text-gray-700 hover:text-blue-600">
              About
            </a>
            <a href="/contact" className="block px-3 py-2 text-gray-700 hover:text-blue-600">
              Contact
            </a>
          </div>
        </div>
      )}
    </header>
  );
}