import React from 'react';

const Footer = ({ setCurrentPage }) => {
  return (
    <footer className="bg-gray-800 text-white py-8 mt-12">
      <div className="w-full px-6 lg:px-12 xl:px-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">NYC Tourist Guide</h3>
            <p className="text-gray-400">
              Your ultimate companion for exploring New York City. Plan, discover, and experience the best of the Big Apple.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <div className="space-y-2">
              <button
                onClick={() => setCurrentPage('attractions')}
                className="block text-gray-400 hover:text-white transition-colors"
              >
                All Attractions
              </button>
              <button
                onClick={() => setCurrentPage('itinerary')}
                className="block text-gray-400 hover:text-white transition-colors"
              >
                My Itinerary
              </button>
              <button
                onClick={() => setCurrentPage('reviews')}
                className="block text-gray-400 hover:text-white transition-colors"
              >
                Reviews
              </button>
            </div>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            <div className="text-gray-400 space-y-2">
              <div>📧 info@nyctouristguide.com</div>
              <div>📱 (555) 123-NYC1</div>
              <div>🌐 www.nyctouristguide.com</div>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2025 NYC Tourist Guide. Built for CS571 - University of Wisconsin-Madison</p>
          <p className="text-sm mt-2">Created by Nikhil Ashokan & Vikram Varikooty</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;