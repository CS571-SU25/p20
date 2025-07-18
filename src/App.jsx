
import React, { useState } from 'react';
import { attractionsData } from './data/Attractionsdata';

// UI Components
import NavigationBar from './components/UI/NavigationBar';

// Layout Components
import Footer from './components/layout/footer';


// Page Components
import HomePage from './components/pages/Homepage';
import AttractionsPage from './components/pages/Attractionspage';
import ItineraryPage from './components/pages/ItineraryPage';
import ReviewsPage from './components/pages/ReviewsPage';

// Modal Components
import AttractionDetailModal from './components/Attractions/AttractionDetailModal';

// Main App Component
const App = () => {
  // Page navigation state
  const [currentPage, setCurrentPage] = useState('home');
  
  // Itinerary state
  const [itinerary, setItinerary] = useState([]);
  const [notes, setNotes] = useState({});
  const [itineraryName, setItineraryName] = useState('My NYC Adventure');
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  
  // Search and filter state
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  
  // Modal state
  const [selectedAttraction, setSelectedAttraction] = useState(null);

  // Itinerary management functions
  const addToItinerary = (attraction) => {
    if (!itinerary.find(item => item.id === attraction.id)) {
      setItinerary([...itinerary, attraction]);
    }
  };

  const removeFromItinerary = (attractionId) => {
    setItinerary(itinerary.filter(item => item.id !== attractionId));
  };

  const updateNotes = (attractionId, note) => {
    setNotes(prev => ({ ...prev, [attractionId]: note }));
  };

  // Render different pages based on currentPage state
  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'home':
        return (
          <HomePage
            attractions={attractionsData}
            itinerary={itinerary}
            addToItinerary={addToItinerary}
            setSelectedAttraction={setSelectedAttraction}
            setCurrentPage={setCurrentPage}
          />
        );

      case 'attractions':
        return (
          <AttractionsPage
            attractions={attractionsData}
            itinerary={itinerary}
            addToItinerary={addToItinerary}
            setSelectedAttraction={setSelectedAttraction}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
          />
        );

      case 'itinerary':
        return (
          <ItineraryPage
            itinerary={itinerary}
            removeFromItinerary={removeFromItinerary}
            notes={notes}
            updateNotes={updateNotes}
            itineraryName={itineraryName}
            setItineraryName={setItineraryName}
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
            setCurrentPage={setCurrentPage}
          />
        );

      case 'reviews':
        return (
          <ReviewsPage
            attractions={attractionsData}
            setSelectedAttraction={setSelectedAttraction}
          />
        );

      default:
        return (
          <HomePage
            attractions={attractionsData}
            itinerary={itinerary}
            addToItinerary={addToItinerary}
            setSelectedAttraction={setSelectedAttraction}
            setCurrentPage={setCurrentPage}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation Bar */}
      <NavigationBar
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        itineraryCount={itinerary.length}
      />

      {/* Main Content */}
      {renderCurrentPage()}

      {/* Attraction Detail Modal */}
      {selectedAttraction && (
        <AttractionDetailModal
          attraction={selectedAttraction}
          onClose={() => setSelectedAttraction(null)}
          onAddToItinerary={addToItinerary}
          isInItinerary={itinerary.some(item => item.id === selectedAttraction.id)}
        />
      )}

      {/* Footer */}
      <Footer setCurrentPage={setCurrentPage} />
    </div>
  );
};

export default App;