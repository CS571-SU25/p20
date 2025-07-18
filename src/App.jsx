import React, { useState } from 'react';
import { HashRouter, Route, Routes, useNavigate, useLocation } from 'react-router-dom';
import { attractionsData } from './data/Attractionsdata';

// UI Components
import NavigationBar from './components/ui/NavigationBar';

// Layout Components
import Footer from './components/layout/Footer';

// Page Components
import HomePage from './components/pages/Homepage';
import AttractionsPage from './components/pages/AttractionsPage';
import ItineraryPage from './components/pages/ItineraryPage';
import ReviewsPage from './components/pages/ReviewsPage';

// Modal Components
import AttractionDetailModal from './components/attractions/AttractionDetailModal';

// Main App Content Component (inside HashRouter)
const AppContent = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Get current page from URL hash
  const getCurrentPage = () => {
    const path = location.pathname;
    if (path === '/' || path === '/home') return 'home';
    if (path === '/attractions') return 'attractions';
    if (path === '/itinerary') return 'itinerary';
    if (path === '/reviews') return 'reviews';
    return 'home';
  };

  const currentPage = getCurrentPage();
  
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

  // Navigation function
  const setCurrentPage = (page) => {
    switch(page) {
      case 'home':
        navigate('/');
        break;
      case 'attractions':
        navigate('/attractions');
        break;
      case 'itinerary':
        navigate('/itinerary');
        break;
      case 'reviews':
        navigate('/reviews');
        break;
      default:
        navigate('/');
    }
  };

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

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation Bar */}
      <NavigationBar
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        itineraryCount={itinerary.length}
      />

      {/* Main Content - Routes */}
      <Routes>
        <Route 
          path="/" 
          element={
            <HomePage
              attractions={attractionsData}
              itinerary={itinerary}
              addToItinerary={addToItinerary}
              setSelectedAttraction={setSelectedAttraction}
              setCurrentPage={setCurrentPage}
            />
          } 
        />
        
        <Route 
          path="/home" 
          element={
            <HomePage
              attractions={attractionsData}
              itinerary={itinerary}
              addToItinerary={addToItinerary}
              setSelectedAttraction={setSelectedAttraction}
              setCurrentPage={setCurrentPage}
            />
          } 
        />

        <Route 
          path="/attractions" 
          element={
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
          } 
        />

        <Route 
          path="/itinerary" 
          element={
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
          } 
        />

        <Route 
          path="/reviews" 
          element={
            <ReviewsPage
              attractions={attractionsData}
              setSelectedAttraction={setSelectedAttraction}
            />
          } 
        />
      </Routes>

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

// Main App Component with HashRouter
const App = () => {
  return (
    <HashRouter>
      <AppContent />
    </HashRouter>
  );
};

export default App;