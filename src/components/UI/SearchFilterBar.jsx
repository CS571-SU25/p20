import React from 'react';
import { Search, Filter } from 'lucide-react';

const SearchFilterBar = ({ searchTerm, setSearchTerm, selectedCategory, setSelectedCategory, categories }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg mb-6">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search attractions..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div className="relative">
          <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white min-w-[150px]"
          >
            {categories.map(category => (
              <option key={category} value={category}>
                {category === 'all' ? 'All Categories' : category}
              </option>
            ))}
          </select>
        </div>
      </div>
      
      {searchTerm && (
        <div className="mt-4 flex items-center justify-between">
          <p className="text-sm text-gray-600">
            Searching for: "<span className="font-medium">{searchTerm}</span>"
          </p>
          <button
            onClick={() => setSearchTerm('')}
            className="text-sm text-blue-600 hover:text-blue-700"
          >
            Clear search
          </button>
        </div>
      )}
    </div>
  );
};

export default SearchFilterBar;