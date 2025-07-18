import React from 'react';
import { Star } from 'lucide-react';

const RatingDisplay = ({ rating, showValue = true }) => {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    stars.push(
      <Star
        key={i}
        className={`w-4 h-4 ${i <= rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
      />
    );
  }

  return (
    <div className="flex items-center">
      {stars}
      {showValue && <span className="text-sm text-gray-600 ml-1">{rating}</span>}
    </div>
  );
};

export default RatingDisplay;