import React, { useState, useEffect } from 'react';
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
// Import your custom CSS
import './App.css';

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

  // App state - Initialize with localStorage data if available
  const [itinerary, setItinerary] = useState([]);
  const [notes, setNotes] = useState({});
  const [itineraryName, setItineraryName] = useState('My NYC Adventure');
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedAttraction, setSelectedAttraction] = useState(null);
  const [isInitialized, setIsInitialized] = useState(false);
  
  // Add user reviews state management
  const [userReviews, setUserReviews] = useState([]);

  // Load data from localStorage on component mount
  useEffect(() => {
    console.log('🔄 Loading data from localStorage...');
    
    try {
      // Load itinerary
      const savedItinerary = localStorage.getItem('nyc-tourist-itinerary');
      console.log('📋 Raw saved itinerary:', savedItinerary);
      
      if (savedItinerary && savedItinerary !== 'null' && savedItinerary !== 'undefined') {
        const parsedItinerary = JSON.parse(savedItinerary);
        console.log('📋 Parsed itinerary:', parsedItinerary);
        
        if (Array.isArray(parsedItinerary)) {
          setItinerary(parsedItinerary);
          console.log('✅ Loaded itinerary from localStorage:', parsedItinerary);
        }
      }

      // Load notes
      const savedNotes = localStorage.getItem('nyc-tourist-notes');
      console.log('📝 Raw saved notes:', savedNotes);
      
      if (savedNotes && savedNotes !== 'null' && savedNotes !== 'undefined') {
        const parsedNotes = JSON.parse(savedNotes);
        console.log('📝 Parsed notes:', parsedNotes);
        
        if (typeof parsedNotes === 'object' && parsedNotes !== null) {
          setNotes(parsedNotes);
          console.log('✅ Loaded notes from localStorage:', parsedNotes);
        }
      }

      // Load user reviews
      const savedReviews = localStorage.getItem('nyc-tourist-reviews');
      console.log('⭐ Raw saved reviews:', savedReviews);
      
      if (savedReviews && savedReviews !== 'null' && savedReviews !== 'undefined') {
        const parsedReviews = JSON.parse(savedReviews);
        console.log('⭐ Parsed reviews:', parsedReviews);
        
        if (Array.isArray(parsedReviews)) {
          setUserReviews(parsedReviews);
          console.log('✅ Loaded reviews from localStorage:', parsedReviews);
        }
      }

      // Load itinerary name
      const savedItineraryName = localStorage.getItem('nyc-tourist-itinerary-name');
      if (savedItineraryName && savedItineraryName !== 'null') {
        setItineraryName(savedItineraryName);
        console.log('✅ Loaded itinerary name:', savedItineraryName);
      }

      // Load selected date
      const savedDate = localStorage.getItem('nyc-tourist-selected-date');
      if (savedDate && savedDate !== 'null') {
        setSelectedDate(savedDate);
        console.log('✅ Loaded selected date:', savedDate);
      }

      // Load search preferences
      const savedSearchTerm = localStorage.getItem('nyc-tourist-search-term');
      if (savedSearchTerm && savedSearchTerm !== 'null') {
        setSearchTerm(savedSearchTerm);
      }

      const savedCategory = localStorage.getItem('nyc-tourist-selected-category');
      if (savedCategory && savedCategory !== 'null') {
        setSelectedCategory(savedCategory);
      }

      // Mark as initialized after loading
      setIsInitialized(true);
      console.log('✅ Initialization complete');

    } catch (error) {
      console.error('❌ Error loading data from localStorage:', error);
      setIsInitialized(true); // Still mark as initialized even on error
    }
  }, []);

  // Save itinerary to localStorage whenever it changes (but only after initialization)
  useEffect(() => {
    if (!isInitialized) {
      console.log('⏳ Skipping save - not yet initialized');
      return;
    }
    
    try {
      localStorage.setItem('nyc-tourist-itinerary', JSON.stringify(itinerary));
      console.log('💾 Saved itinerary to localStorage:', itinerary);
    } catch (error) {
      console.error('❌ Error saving itinerary to localStorage:', error);
    }
  }, [itinerary, isInitialized]);

  // Save notes to localStorage whenever they change (but only after initialization)
  useEffect(() => {
    if (!isInitialized) {
      console.log('⏳ Skipping notes save - not yet initialized');
      return;
    }
    
    try {
      localStorage.setItem('nyc-tourist-notes', JSON.stringify(notes));
      console.log('💾 Saved notes to localStorage:', notes);
    } catch (error) {
      console.error('❌ Error saving notes to localStorage:', error);
    }
  }, [notes, isInitialized]);

  // Save user reviews to localStorage whenever they change (but only after initialization)
  useEffect(() => {
    if (!isInitialized) {
      console.log('⏳ Skipping reviews save - not yet initialized');
      return;
    }
    
    try {
      localStorage.setItem('nyc-tourist-reviews', JSON.stringify(userReviews));
      console.log('💾 Saved reviews to localStorage:', userReviews);
    } catch (error) {
      console.error('❌ Error saving reviews to localStorage:', error);
    }
  }, [userReviews, isInitialized]);

  // Save itinerary name to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem('nyc-tourist-itinerary-name', itineraryName);
    } catch (error) {
      console.error('Error saving itinerary name to localStorage:', error);
    }
  }, [itineraryName]);

  // Save selected date to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem('nyc-tourist-selected-date', selectedDate);
    } catch (error) {
      console.error('Error saving selected date to localStorage:', error);
    }
  }, [selectedDate]);

  // Save search preferences to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('nyc-tourist-search-term', searchTerm);
    } catch (error) {
      console.error('Error saving search term to localStorage:', error);
    }
  }, [searchTerm]);

  useEffect(() => {
    try {
      localStorage.setItem('nyc-tourist-selected-category', selectedCategory);
    } catch (error) {
      console.error('Error saving selected category to localStorage:', error);
    }
  }, [selectedCategory]);

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

  // Review actions
  const addReview = (reviewData) => {
    const newReview = {
      ...reviewData,
      id: `user-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      isUserReview: true,
      dateAdded: new Date().toISOString()
    };
    setUserReviews(prev => [newReview, ...prev]);
  };

  const deleteReview = (reviewId) => {
    setUserReviews(prev => prev.filter(review => review.id !== reviewId));
  };

  return (
    <div className="min-vh-100 bg-light text-dark">
      <NavigationBar
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        itineraryCount={itinerary.length}
      />

      <main role="main" style={{ minHeight: 'calc(100vh - 200px)' }}>
        <Routes>
          <Route 
            path="/" 
            element={
              <HomePage
                attractions={attractionsData}
                itinerary={itinerary}
                addToItinerary={addToItinerary}
                removeFromItinerary={removeFromItinerary}
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
                removeFromItinerary={removeFromItinerary}
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
                userReviews={userReviews}
                addReview={addReview}
                deleteReview={deleteReview}
              />
            } 
          />
        </Routes>
      </main>

      {selectedAttraction && (
        <AttractionDetailModal
          attraction={selectedAttraction}
          onClose={() => setSelectedAttraction(null)}
          onAddToItinerary={addToItinerary}
          onRemoveFromItinerary={removeFromItinerary}
          isInItinerary={itinerary.some(item => item.id === selectedAttraction.id)}
          userReviews={userReviews}
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