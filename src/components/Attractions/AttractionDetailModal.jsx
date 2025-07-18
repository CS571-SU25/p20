import React from 'react';
import { X, Clock, MapPin, ExternalLink } from 'lucide-react';
import RatingDisplay from '../UI/RatingDisplay';
import UserReview from '../UI/UserReview';

const AttractionDetailModal = ({ attraction, onClose, onAddToItinerary, isInItinerary }) => {
  if (!attraction) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="relative">
          <img
            src={attraction.image}
            alt={attraction.name}
            className="w-full h-64 object-cover"
          />
          <button
            onClick={onClose}
            className="absolute top-4 right-4 bg-white/80 backdrop-blur-sm p-2 rounded-full hover:bg-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="p-6">
          <div className="flex justify-between items-start mb-4">
            <h2 className="text-3xl font-bold text-gray-800">{attraction.name}</h2>
            <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
              {attraction.category}
            </span>
          </div>
          
          <div className="flex items-center gap-4 mb-4">
            <RatingDisplay rating={attraction.rating} />
            <span className="text-gray-400">•</span>
            <Clock className="w-5 h-5 text-gray-400" />
            <span className="text-gray-600">{attraction.duration}</span>
          </div>
          
          <p className="text-gray-700 mb-6 text-lg leading-relaxed">{attraction.description}</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <h3 className="text-lg font-semibold mb-3">Details</h3>
              <div className="space-y-2">
                <div className="flex items-center">
                  <Clock className="w-5 h-5 text-gray-400 mr-2" />
                  <span className="text-gray-700">{attraction.hours}</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="w-5 h-5 text-gray-400 mr-2" />
                  <span className="text-gray-700">
                    {attraction.location.lat.toFixed(4)}, {attraction.location.lng.toFixed(4)}
                  </span>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-3">Local Tips</h3>
              <ul className="space-y-1">
                {attraction.tips.map((tip, index) => (
                  <li key={index} className="text-gray-700 text-sm flex items-start">
                    <span className="text-blue-600 mr-2 mt-1">•</span>
                    {tip}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-3">User Reviews</h3>
            <div className="space-y-3">
              {attraction.reviews.map((review, index) => (
                <UserReview key={index} review={review} />
              ))}
            </div>
          </div>
          
          <div className="flex gap-3">
            <button
              onClick={() => onAddToItinerary(attraction)}
              disabled={isInItinerary}
              className={`flex-1 py-3 px-6 rounded-lg font-medium transition-colors ${
                isInItinerary
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-blue-600 hover:bg-blue-700 text-white'
              }`}
            >
              {isInItinerary ? 'Added to Itinerary' : 'Add to Itinerary'}
            </button>
            <a
              href={attraction.bookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white py-3 px-6 rounded-lg font-medium transition-colors"
            >
              <ExternalLink className="w-5 h-5" />
              Book Now
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AttractionDetailModal;