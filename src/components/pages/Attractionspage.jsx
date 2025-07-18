import React from 'react';
import { Search } from 'lucide-react';
import SearchFilterBar from '../UI/SearchFilterBar';
import AttractionCard from '../Attractions/AttractionCard';

const AttractionsPage = ({ 
  attractions, 
  itinerary, 
  addToItinerary, 
  setSelectedAttraction, 
  searchTerm, 
  setSearchTerm, 
  selectedCategory, 
  setSelectedCategory 
}) => {
  const categories = ['all', ...new Set(attractions.map(a => a.category))];
  
  const filteredAttractions = attractions.filter(attraction => {
    const matchesSearch = attraction.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         attraction.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || attraction.category.toLowerCase() === selectedCategory.toLowerCase();
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">All Attractions</h1>
        <p className="text-gray-600 mb-6">
          Explore all {attractions.length} amazing attractions in New York City. Use the search and filter tools to find exactly what you're looking for.
        </p>
        
        <SearchFilterBar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          categories={categories}
        />
      </div>

      <div className="mb-4">
        <p className="text-sm text-gray-600">
          Showing {filteredAttractions.length} of {attractions.length} attractions
          {selectedCategory !== 'all' && (
            <span className="ml-2">
              in <span className="font-medium">{selectedCategory}</span>
            </span>
          )}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredAttractions.map(attraction => (
          <AttractionCard
            key={attraction.id}
            attraction={attraction}
            onAddToItinerary={addToItinerary}
            isInItinerary={itinerary.some(item => item.id === attraction.id)}
            onViewDetails={setSelectedAttraction}
          />
        ))}
      </div>

      {filteredAttractions.length === 0 && (
        <div className="text-center py-12">
          <Search className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500 text-lg mb-2">No attractions found matching your criteria</p>
          <p className="text-gray-400 mb-4">Try adjusting your search terms or filters</p>
          <button
            onClick={() => {
              setSearchTerm('');
              setSelectedCategory('all');
            }}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors"
          >
            Clear All Filters
          </button>
        </div>
      )}
    </div>
  );
};

export default AttractionsPage;