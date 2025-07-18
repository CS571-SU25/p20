import React from 'react';
import { Clock, MapPin, Minus, ExternalLink } from 'lucide-react';

const ItineraryItem = ({ attraction, index, onRemove, notes, onNotesChange }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-4">
          <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">
            {index + 1}
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-gray-800">{attraction.name}</h3>
            <div className="flex items-center text-sm text-gray-600">
              <Clock className="w-4 h-4 mr-1" />
              {attraction.duration}
              <span className="mx-2">•</span>
              <MapPin className="w-4 h-4 mr-1" />
              {attraction.category}
            </div>
          </div>
        </div>
        <button
          onClick={() => onRemove(attraction.id)}
          className="text-red-500 hover:text-red-700 p-2 rounded-full hover:bg-red-50 transition-colors"
        >
          <Minus className="w-4 h-4" />
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <img
          src={attraction.image}
          alt={attraction.name}
          className="w-full h-24 object-cover rounded-lg"
        />
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Personal Notes
          </label>
          <textarea
            value={notes[attraction.id] || ''}
            onChange={(e) => onNotesChange(attraction.id, e.target.value)}
            placeholder="Add your notes..."
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            rows="2"
          />
        </div>
      </div>
      
      <div className="mt-3 flex items-center gap-4 text-sm text-gray-600">
        <span>⏰ {attraction.hours}</span>
        <a
          href={attraction.bookingUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1 text-blue-600 hover:text-blue-700 transition-colors"
        >
          <ExternalLink className="w-4 h-4" />
          Book Now
        </a>
      </div>
    </div>
  );
};

export default ItineraryItem;