import React from 'react';
import { Star } from 'lucide-react';

const RatingDisplay = ({ rating }) => {
  const rounded = Math.round(rating);
  return (
    <div
      className="flex items-center gap-1"
      aria-label={`Rated ${rating} out of 5 stars`}
    >
      {[...Array(5)].map((_, index) => (
        <Star
          key={index}
          className={`w-4 h-4 ${index < rounded ? 'text-yellow-400' : 'text-gray-300'}`}
          fill={index < rounded ? 'currentColor' : 'none'}
        />
      ))}
      <span className="text-sm text-gray-600 ml-1">({rating.toFixed(1)})</span>
    </div>
  );
};

export default RatingDisplay;
