import React from 'react';
import StatsDashboard from '../UI/StatsDashboard';
import AttractionCard from '../Attractions/AttractionCard';
import WeatherWidget from '../UI/WeatherWidget';

const HomePage = ({ attractions, itinerary, addToItinerary, setSelectedAttraction, setCurrentPage }) => {
  const categories = ['all', ...new Set(attractions.map(a => a.category))];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-5xl font-bold text-gray-800 mb-4">
          Discover New York City
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Your ultimate guide to exploring the Big Apple. Plan your perfect itinerary with our interactive tools and discover the best attractions NYC has to offer.
        </p>
      </div>

      <StatsDashboard attractions={attractions} itinerary={itinerary} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Featured Attractions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {attractions.slice(0, 4).map(attraction => (
                <AttractionCard
                  key={attraction.id}
                  attraction={attraction}
                  onAddToItinerary={addToItinerary}
                  isInItinerary={itinerary.some(item => item.id === attraction.id)}
                  onViewDetails={setSelectedAttraction}
                />
              ))}
            </div>
            <div className="text-center mt-6">
              <button
                onClick={() => setCurrentPage('attractions')}
                className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-8 rounded-lg transition-colors"
              >
                View All Attractions
              </button>
            </div>
          </div>
        </div>
        
        <div className="space-y-6">
          <WeatherWidget />
          
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Popular Categories</h3>
            <div className="space-y-3">
              {categories.slice(1).map(category => {
                const count = attractions.filter(attr => attr.category === category).length;
                return (
                  <button
                    key={category}
                    onClick={() => {
                      setCurrentPage('attractions');
                    }}
                    className="w-full flex justify-between items-center p-3 rounded-lg hover:bg-gray-50 transition-colors group"
                  >
                    <span className="text-gray-600 group-hover:text-blue-600 transition-colors">{category}</span>
                    <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm font-medium group-hover:bg-blue-200 transition-colors">
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>
            <div className="mt-4 pt-4 border-t border-gray-200">
              <button
                onClick={() => setCurrentPage('attractions')}
                className="w-full text-center text-blue-600 hover:text-blue-700 font-medium py-2 hover:bg-blue-50 rounded-lg transition-colors"
              >
                View All Categories →
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;