import React, { useState } from 'react';
import { Clock, Heart } from 'lucide-react';
import RatingDisplay from '../UI/RatingDisplay';

const AttractionCard = ({ attraction, onAddToItinerary, isInItinerary, onViewDetails }) => {
  const [liked, setLiked] = useState(false);

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
      <div className="relative">
        <img 
          src={attraction.image} 
          alt={attraction.name}
          className="w-full h-48 object-cover"
        />
        <button
          onClick={() => setLiked(!liked)}
          className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-sm ${
            liked ? 'bg-red-500 text-white' : 'bg-white/80 text-gray-600'
          } hover:bg-red-500 hover:text-white transition-colors`}
        >
          <Heart className={`w-5 h-5 ${liked ? 'fill-current' : ''}`} />
        </button>
        <div className="absolute bottom-3 left-3">
          <span className="bg-black/70 text-white px-2 py-1 rounded text-sm font-medium">
            {attraction.category}
          </span>
        </div>
      </div>
      
      <div className="p-4">
        <h3 className="text-xl font-bold text-gray-800 mb-2">{attraction.name}</h3>
        
        <div className="flex items-center mb-2">
          <RatingDisplay rating={attraction.rating} />
          <span className="text-gray-400 mx-2">•</span>
          <Clock className="w-4 h-4 text-gray-400" />
          <span className="text-sm text-gray-600 ml-1">{attraction.duration}</span>
        </div>
        
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">{attraction.description}</p>
        
        <div className="flex items-center text-sm text-gray-500 mb-4">
          <Clock className="w-4 h-4 mr-1" />
          {attraction.hours}
        </div>
        
        <div className="flex gap-2">
          <button
            onClick={() => onAddToItinerary(attraction)}
            disabled={isInItinerary}
            className={`flex-1 py-2 px-4 rounded-lg font-medium transition-colors ${
              isInItinerary 
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
                : 'bg-blue-600 hover:bg-blue-700 text-white'
            }`}
          >
            {isInItinerary ? 'Added' : 'Add to Itinerary'}
          </button>
          <button
            onClick={() => onViewDetails(attraction)}
            className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default AttractionCard;