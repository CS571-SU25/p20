import React, { useState } from 'react';
import { User, ThumbsUp } from 'lucide-react';
import RatingDisplay from './RatingDisplay';

const UserReview = ({ review, onLike }) => {
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(Math.floor(Math.random() * 20) + 1);

  const handleLike = () => {
    setLiked(!liked);
    setLikeCount(prev => liked ? prev - 1 : prev + 1);
    onLike && onLike(review);
  };

  return (
    <div className="bg-gray-50 p-4 rounded-lg hover:bg-gray-100 transition-colors">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center">
          <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center mr-3">
            <User className="w-4 h-4 text-white" />
          </div>
          <div>
            <span className="font-medium text-gray-800">{review.user}</span>
            <div className="text-sm text-gray-500">Verified traveler</div>
          </div>
        </div>
        <RatingDisplay rating={review.rating} showValue={false} />
      </div>
      
      <p className="text-gray-700 mb-3 leading-relaxed">{review.comment}</p>
      
      <div className="flex items-center justify-between">
        <button
          onClick={handleLike}
          className={`flex items-center text-sm transition-colors ${
            liked ? 'text-blue-600' : 'text-gray-500'
          } hover:text-blue-600`}
        >
          <ThumbsUp className={`w-4 h-4 mr-1 ${liked ? 'fill-current' : ''}`} />
          <span>Helpful ({likeCount})</span>
        </button>
        
        <span className="text-xs text-gray-400">
          {Math.floor(Math.random() * 30) + 1} days ago
        </span>
      </div>
    </div>
  );
};

export default UserReview;