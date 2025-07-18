import React from 'react';
import { Calendar, Download, Share2, Route } from 'lucide-react';
import ItineraryItem from '../Itinerary/itineraryItem';

const ItineraryPage = ({ 
  itinerary, 
  removeFromItinerary, 
  notes, 
  updateNotes, 
  itineraryName, 
  setItineraryName, 
  selectedDate, 
  setSelectedDate, 
  setCurrentPage 
}) => {
  const calculateTotalTime = () => {
    return itinerary.reduce((total, attraction) => {
      const duration = parseInt(attraction.duration.split('-')[1] || attraction.duration.split('-')[0]);
      return total + duration;
    }, 0);
  };

  const exportItinerary = () => {
    const itineraryData = {
      name: itineraryName,
      date: selectedDate,
      attractions: itinerary.map(attraction => ({
        ...attraction,
        notes: notes[attraction.id] || ''
      })),
      totalTime: calculateTotalTime()
    };
    
    const blob = new Blob([JSON.stringify(itineraryData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${itineraryName.replace(/\s+/g, '_')}_itinerary.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const shareItinerary = () => {
    if (navigator.share) {
      navigator.share({
        title: itineraryName,
        text: `Check out my NYC itinerary with ${itinerary.length} attractions!`,
        url: window.location.href
      });
    } else {
      const shareText = `${itineraryName}\n\nMy NYC Itinerary:\n${itinerary.map((attr, index) => `${index + 1}. ${attr.name}`).join('\n')}`;
      navigator.clipboard.writeText(shareText);
      alert('Itinerary copied to clipboard!');
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Build Your Itinerary</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Itinerary Name
            </label>
            <input
              type="text"
              value={itineraryName}
              onChange={(e) => setItineraryName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Visit Date
            </label>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-6">
          <div className="bg-blue-100 px-4 py-2 rounded-full">
            <span className="text-sm font-medium text-blue-800">
              {itinerary.length} attractions
            </span>
          </div>
          <div className="bg-green-100 px-4 py-2 rounded-full">
            <span className="text-sm font-medium text-green-800">
              ~{calculateTotalTime()} hours total
            </span>
          </div>
          <button
            onClick={exportItinerary}
            className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-full transition-colors"
          >
            <Download className="w-4 h-4" />
            <span className="text-sm font-medium">Export</span>
          </button>
          <button
            onClick={shareItinerary}
            className="flex items-center gap-2 bg-blue-100 hover:bg-blue-200 px-4 py-2 rounded-full transition-colors"
          >
            <Share2 className="w-4 h-4" />
            <span className="text-sm font-medium">Share</span>
          </button>
        </div>

        {itinerary.length === 0 ? (
          <div className="text-center py-12">
            <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500 text-lg mb-2">No attractions added yet</p>
            <p className="text-gray-400 mb-4">Browse attractions to start building your itinerary!</p>
            <button
              onClick={() => setCurrentPage('attractions')}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
            >
              Browse Attractions
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {itinerary.map((attraction, index) => (
              <ItineraryItem
                key={attraction.id}
                attraction={attraction}
                index={index}
                onRemove={removeFromItinerary}
                notes={notes}
                onNotesChange={updateNotes}
              />
            ))}
            
            <div className="bg-gray-50 rounded-lg p-6 mt-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Optimized Route</h3>
              <div className="flex items-center text-sm text-gray-600 mb-3">
                <Route className="w-4 h-4 mr-2" />
                <span>Route optimization considers travel time and proximity between attractions</span>
              </div>
              <div className="text-sm text-gray-500">
                💡 <strong>Pro Tips:</strong> Visit outdoor attractions like Central Park and Brooklyn Bridge during good weather, 
                and save indoor attractions like museums for rainy days. Start early to avoid crowds!
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ItineraryPage;