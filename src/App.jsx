import React, { useState } from 'react';
import { HashRouter, Route, Routes, useNavigate, useLocation } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import { attractionsData } from './data/Attractionsdata';

// UI Components
import NavigationBar from './components/ui/NavigationBar';
import Footer from './components/layout/Footer';

// Page Components
import HomePage from './components/pages/Homepage';
import AttractionsPage from './components/pages/AttractionsPage';
import ItineraryPage from './components/pages/ItineraryPage';
import ReviewsPage from './components/pages/ReviewsPage';

// Modal Components
import AttractionDetailModal from './components/attractions/AttractionDetailModal';

// Bootstrap CSS
import 'bootstrap/dist/css/bootstrap.min.css';

const AppContent = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Routing: determine current page
  const getCurrentPage = () => {
    switch (location.pathname) {
      case '/':
      case '/home':
        return 'home';
      case '/attractions':
        return 'attractions';
      case '/itinerary':
        return 'itinerary';
      case '/reviews':
        return 'reviews';
      default:
        return 'home';
    }
  };

  const currentPage = getCurrentPage();

  // App state
  const [itinerary, setItinerary] = useState([]);
  const [notes, setNotes] = useState({});
  const [itineraryName, setItineraryName] = useState('My NYC Adventure');
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedAttraction, setSelectedAttraction] = useState(null);

  // Page navigation
  const setCurrentPage = (page) => {
    const paths = {
      home: '/',
      attractions: '/attractions',
      itinerary: '/itinerary',
      reviews: '/reviews'
    };
    navigate(paths[page] || '/');
  };

  // Itinerary actions
  const addToItinerary = (attraction) => {
    if (!itinerary.find(item => item.id === attraction.id)) {
      setItinerary([...itinerary, attraction]);
    }
  };

  const removeFromItinerary = (id) => {
    setItinerary(itinerary.filter(item => item.id !== id));
  };

  const updateNotes = (id, note) => {
    setNotes(prev => ({ ...prev, [id]: note }));
  };

  return (
    <div className="min-vh-100 bg-light text-dark" aria-label="Main NYC Travel App Container">
      <NavigationBar
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        itineraryCount={itinerary.length}
      />

      <Container fluid className="py-4" role="main">
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
      </Container>

      {selectedAttraction && (
        <AttractionDetailModal
          attraction={selectedAttraction}
          onClose={() => setSelectedAttraction(null)}
          onAddToItinerary={addToItinerary}
          isInItinerary={itinerary.some(item => item.id === selectedAttraction.id)}
        />
      )}

      <Footer setCurrentPage={setCurrentPage} />
    </div>
  );
};

const App = () => (
  <HashRouter>
    <AppContent />
  </HashRouter>
);

export default App;
