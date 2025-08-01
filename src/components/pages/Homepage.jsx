import React from 'react';
import { Container, Row, Col, Card, Button, Badge } from 'react-bootstrap';
import { Star, StarFill, Clock, GeoAlt } from 'react-bootstrap-icons';
import StatsDashboard from '../ui/StatsDashboard';
import WeatherWidget from '../ui/WeatherWidget';

// Rating Component
const RatingDisplay = ({ rating, showValue = true }) => {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    stars.push(
      i <= rating ? 
        <StarFill key={i} className="text-warning" size={16} /> : 
        <Star key={i} className="text-muted" size={16} />
    );
  }

  return (
    <div className="d-flex align-items-center">
      {stars}
      {showValue && <span className="ms-1 text-muted small">{rating}</span>}
    </div>
  );
};

// Attraction Card Component
const AttractionCard = ({ attraction, onAddToItinerary, onViewDetails, isInItinerary }) => {
  return (
    <Card className="h-100 shadow-sm hover-card">
      <div className="position-relative">
        <Card.Img 
          variant="top" 
         src={attraction.image || getAttractionImage(attraction.name)}
          alt={attraction.name}
          style={{ 
            height: '200px', 
            objectFit: 'cover',
            filter: 'brightness(0.9)'
          }}
        />
        <Badge 
          bg="primary" 
          className="position-absolute top-0 start-0 m-2"
        >
          {attraction.category}
        </Badge>
        <Badge 
          bg="success" 
          className="position-absolute top-0 end-0 m-2"
        >
          {attraction.price}
        </Badge>
      </div>
      
      <Card.Body className="d-flex flex-column">
        <Card.Title className="h5 text-dark">{attraction.name}</Card.Title>
        <Card.Text className="text-muted flex-grow-1 small">
          {attraction.description}
        </Card.Text>
        
        <div className="mb-2">
          <RatingDisplay rating={attraction.rating} />
        </div>
        
        <div className="d-flex justify-content-between align-items-center mb-3 text-muted small">
          <span>
            <Clock size={14} className="me-1" />
            {attraction.duration}
          </span>
          <span>
            <GeoAlt size={14} className="me-1" />
            {attraction.category}
          </span>
        </div>
        
        <div className="d-flex gap-2 mt-auto">
          <Button 
            variant="outline-primary" 
            size="sm" 
            className="flex-grow-1"
            onClick={() => onViewDetails(attraction)}
          >
            View Details
          </Button>
          <Button 
            variant={isInItinerary ? "success" : "primary"} 
            size="sm"
            onClick={() => onAddToItinerary(attraction)}
            disabled={isInItinerary}
          >
            {isInItinerary ? "Added ✓" : "Add to Trip"}
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
};

const HomePage = ({ attractions, itinerary, addToItinerary, setSelectedAttraction, setCurrentPage }) => {
  const featuredAttractions = attractions.slice(0, 6);

  return (
    <Container fluid className="px-4"> 
      {/* Hero Section */}
      <div className="hero-section bg-primary text-white text-center py-5 mb-5 rounded-3 shadow">
  <h1 className="display-4 fw-bold mb-3">Discover New York City</h1>
  <p className="lead mb-4">
    Your ultimate guide to exploring the Big Apple. Plan your perfect itinerary with our 
    interactive tools and discover the best attractions NYC has to offer.
  </p>
  <Button 
    variant="light" 
    size="lg" 
    className="px-4 py-2"
    onClick={() => setCurrentPage('attractions')}
  >
    Explore Attractions
  </Button>
</div>
    

      <Row>
        <Col lg={8}>
          {/* Stats Dashboard */}
          <StatsDashboard attractions={attractions} itinerary={itinerary} />
          
          {/* Featured Attractions */}
          <div className="mb-5">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h2 className="h3 mb-0">Featured Attractions</h2>
              <Button 
                variant="outline-primary" 
                size="sm"
                onClick={() => setCurrentPage('attractions')}
              >
                View All
              </Button>
            </div>
            
            <Row>
              {featuredAttractions.map(attraction => (
                <Col key={attraction.id} lg={6} md={6} className="mb-4">
                  <AttractionCard
                    attraction={attraction}
                    onAddToItinerary={addToItinerary}
                    onViewDetails={setSelectedAttraction}
                    isInItinerary={itinerary.some(item => item.id === attraction.id)}
                  />
                </Col>
              ))}
            </Row>
          </div>

          {/* Quick Tips */}
          <Card className="mb-4">
            <Card.Header>
              <h5 className="mb-0">NYC Travel Tips</h5>
            </Card.Header>
            <Card.Body>
              <Row>
                <Col md={6}>
                  <ul className="list-unstyled">
                    <li className="mb-2">
                      <strong>🚇 Getting Around:</strong> Use the subway system - it's fast and covers all boroughs
                    </li>
                    <li className="mb-2">
                      <strong>💰 Budget Tip:</strong> Many museums offer "pay-what-you-wish" hours
                    </li>
                    <li className="mb-2">
                      <strong>🕐 Best Times:</strong> Visit popular attractions early morning or late afternoon
                    </li>
                  </ul>
                </Col>
                <Col md={6}>
                  <ul className="list-unstyled">
                    <li className="mb-2">
                      <strong>🎫 Tickets:</strong> Book attraction tickets online in advance
                    </li>
                    <li className="mb-2">
                      <strong>👟 Comfort:</strong> Wear comfortable walking shoes
                    </li>
                    <li className="mb-2">
                      <strong>📱 Apps:</strong> Download transit apps like Citymapper
                    </li>
                  </ul>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>

        <Col lg={4}>
          {/* Weather Widget */}
          <div className="sticky-top" style={{ top: '100px' }}>
            <WeatherWidget />
          </div>
        </Col>
      </Row>

      <style jsx>{`
        .hover-card {
          transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
        }
        .hover-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 8px 25px rgba(0,0,0,0.15) !important;
        }
        .hero-section {
          background: linear-gradient(135deg, #007bff 0%, #0056b3 100%);
        }
      `}</style>
    </Container>
  );
};

export default HomePage;