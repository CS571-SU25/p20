import React from 'react';
import RatingDisplay from '../UI/RatingDisplay';
import UserReview from '../UI/UserReview';

const ReviewsPage = ({ attractions, setSelectedAttraction }) => {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">User Reviews</h1>
        <p className="text-gray-600">
          See what other travelers have to say about NYC's top attractions. Real reviews from real visitors.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {attractions.map(attraction => (
          <div key={attraction.id} className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
            <div className="flex items-center mb-4">
              <img
                src={attraction.image}
                alt={attraction.name}
                className="w-16 h-16 object-cover rounded-lg mr-4"
              />
              <div className="flex-1">
                <h3 className="text-xl font-bold text-gray-800">{attraction.name}</h3>
                <div className="flex items-center gap-2 mt-1">
                  <RatingDisplay rating={attraction.rating} />
                  <span className="text-sm text-gray-500">
                    ({attraction.reviews.length} reviews)
                  </span>
                </div>
              </div>
            </div>
            
            <div className="space-y-3 mb-4">
              {attraction.reviews.map((review, index) => (
                <UserReview key={index} review={review} />
              ))}
            </div>
            
            <div className="pt-4 border-t border-gray-200 flex justify-between items-center">
              <button
                onClick={() => setSelectedAttraction(attraction)}
                className="text-blue-600 hover:text-blue-700 font-medium transition-colors"
              >
                View Full Details →
              </button>
              <span className="text-sm text-gray-500">
                {attraction.category}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReviewsPage;