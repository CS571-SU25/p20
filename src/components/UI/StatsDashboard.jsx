import React from 'react';

const StatsDashboard = ({ attractions, itinerary }) => {
  const totalRating = attractions.reduce((sum, attr) => sum + attr.rating, 0) / attractions.length;
  
  const calculateTotalTime = () => {
    return itinerary.reduce((total, attraction) => {
      const duration = parseInt(attraction.duration.split('-')[1] || attraction.duration.split('-')[0]);
      return total + duration;
    }, 0);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
        <h1 className="text-lg font-semibold text-gray-800 mb-2">Total Attractions</h1>
        <p className="text-3xl font-bold text-blue-600">{attractions.length}</p>
        <p className="text-sm text-gray-500 mt-1">Available to visit</p>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
        <h2 className="text-lg font-semibold text-gray-800 mb-2">In Your Itinerary</h2>
        <p className="text-3xl font-bold text-green-600">{itinerary.length}</p>
        <p className="text-sm text-gray-500 mt-1">Attractions selected</p>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">Avg. Rating</h3>
        <p className="text-3xl font-bold text-yellow-600">{totalRating.toFixed(1)} ⭐</p>
        <p className="text-sm text-gray-500 mt-1">User ratings</p>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
        <h4 className="text-lg font-semibold text-gray-800 mb-2">Planned Time</h4>
        <p className="text-3xl font-bold text-purple-600">{calculateTotalTime()}h</p>
        <p className="text-sm text-gray-500 mt-1">Total visit time</p>
      </div>
    </div>
  );
};

export default StatsDashboard;