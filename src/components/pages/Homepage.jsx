import React from 'react';
import { Container, Row, Col, Card, Button, Badge, ProgressBar } from 'react-bootstrap';
import { Star, StarFill, Clock, GeoAlt, ArrowRight, Calendar, GraphUp, Award, Thermometer, People } from 'react-bootstrap-icons';

// Rating Component
const RatingDisplay = ({ rating, showValue = true, size = 16 }) => {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    stars.push(
      i <= rating ? 
        <StarFill key={i} className="text-warning" size={size} /> : 
        <Star key={i} className="text-muted" size={size} />
    );
  }

  return (
    <div className="d-flex align-items-center">
      {stars}
      {showValue && <span className="ms-2 text-muted fw-medium">{rating}</span>}
    </div>
  );
};

// Enhanced Stats Card Component
const StatCard = ({ icon, value, label, color = "primary", trend, subtitle }) => (
  <Card 
    className="border-0 h-100 shadow-sm" 
    style={{ 
      borderRadius: '20px', 
      background: `linear-gradient(135deg, var(--bs-${color}) 0%, var(--bs-${color}) 100%)`, 
      color: 'white',
      transition: 'transform 0.3s ease, box-shadow 0.3s ease'
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.transform = 'translateY(-5px)';
      e.currentTarget.style.boxShadow = '0 15px 35px rgba(0,0,0,0.2)';
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.transform = 'translateY(0)';
      e.currentTarget.style.boxShadow = '0 5px 15px rgba(0,0,0,0.1)';
    }}
  >
    <Card.Body className="p-4 text-center">
      <div className="mb-3" style={{ fontSize: '2.5rem', opacity: 0.9 }}>
        {icon}
      </div>
      <div className="h2 fw-bold mb-1">{value}</div>
      <div className="small opacity-90 mb-2">{label}</div>
      {subtitle && <div className="small opacity-75">{subtitle}</div>}
      {trend && (
        <div className="mt-3 small d-flex align-items-center justify-content-center">
          <GraphUp size={14} className="me-1" />
          <span className="fw-semibold">{trend}</span>
        </div>
      )}
    </Card.Body>
  </Card>
);

// Enhanced Featured Attraction Card
const FeaturedAttractionCard = ({ attraction, onAddToItinerary, onRemoveFromItinerary, onViewDetails, isInItinerary, rank }) => {
  const handleItineraryAction = (e) => {
    e.stopPropagation();
    if (isInItinerary) {
      onRemoveFromItinerary(attraction.id);
    } else {
      onAddToItinerary(attraction);
    }
  };

  return (
    <Card 
      className="border-0 shadow-sm h-100 position-relative" 
      style={{ 
        borderRadius: '20px',
        transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
        cursor: 'pointer'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-8px) scale(1.02)';
        e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.15)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0) scale(1)';
        e.currentTarget.style.boxShadow = '0 5px 15px rgba(0,0,0,0.08)';
      }}
    >
      {/* Rank Badge */}
      <div 
        className="position-absolute d-flex align-items-center justify-content-center fw-bold"
        style={{
          top: '15px',
          left: '15px',
          width: '35px',
          height: '35px',
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)',
          color: '#000',
          fontSize: '0.9rem',
          zIndex: 2,
          boxShadow: '0 4px 12px rgba(0,0,0,0.2)'
        }}
      >
        #{rank}
      </div>

      <div className="position-relative overflow-hidden" style={{ height: '240px', borderRadius: '20px 20px 0 0' }}>
        <img
          src={attraction.image}
          alt={`${attraction.name} - Top rated ${attraction.category.toLowerCase()} attraction in NYC`}
          className="w-100 h-100"
          style={{ 
            objectFit: 'cover',
            transition: 'transform 0.4s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'scale(1.1)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1)';
          }}
        />
        
        {/* Gradient Overlay */}
        <div 
          className="position-absolute w-100 h-100"
          style={{
            top: 0,
            left: 0,
            background: 'linear-gradient(to bottom, transparent 0%, transparent 50%, rgba(0,0,0,0.7) 100%)'
          }}
        />

        <Badge 
          className="position-absolute"
          style={{ 
            bottom: '15px',
            left: '15px',
            backgroundColor: 'rgba(255,255,255,0.95)', 
            color: '#333',
            borderRadius: '12px',
            padding: '8px 12px',
            fontSize: '0.8rem',
            fontWeight: '600',
            backdropFilter: 'blur(10px)'
          }}
        >
          {attraction.category}
        </Badge>
        
        <div 
          className="position-absolute d-flex align-items-center"
          style={{
            bottom: '15px',
            right: '15px',
            backgroundColor: 'rgba(255,255,255,0.95)',
            borderRadius: '20px',
            padding: '6px 12px',
            backdropFilter: 'blur(10px)'
          }}
        >
          <Star className="text-warning me-1" size={16} fill="currentColor" />
          <span className="fw-bold text-dark">{attraction.rating}</span>
        </div>
      </div>
      
      <Card.Body className="p-4 d-flex flex-column">
        <div className="mb-3">
          <h5 className="fw-bold text-dark mb-2 lh-sm">{attraction.name}</h5>
          
          <div className="d-flex align-items-center text-muted mb-3 small">
            <Clock size={14} className="me-2" />
            <span className="me-3">{attraction.duration}</span>
            <GeoAlt size={14} className="me-2" />
            <span>Manhattan</span>
          </div>
          
          <p className="text-muted small mb-0" style={{ 
            display: '-webkit-box',
            WebkitLineClamp: 3,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            lineHeight: '1.5'
          }}>
            {attraction.description}
          </p>
        </div>
        
        <div className="mt-auto">
          <div className="d-flex gap-2">
            <Button
              variant="outline-primary"
              size="sm"
              onClick={() => onViewDetails(attraction)}
              className="flex-grow-1 fw-semibold"
              style={{ 
                borderRadius: '10px',
                borderWidth: '2px',
                transition: 'all 0.3s ease'
              }}
            >
              Learn More
            </Button>
            <Button
              variant={isInItinerary ? "danger" : "primary"}
              size="sm"
              onClick={handleItineraryAction}
              className="fw-bold d-flex align-items-center justify-content-center"
              style={{ 
                borderRadius: '10px',
                minWidth: '44px',
                transition: 'all 0.3s ease'
              }}
            >
              {isInItinerary ? "−" : "+"}
            </Button>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
};

// Enhanced Weather Widget
const WeatherWidget = () => (
  <Card 
    className="border-0 text-white h-100 shadow-sm" 
    style={{ 
      borderRadius: '20px',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      transition: 'transform 0.3s ease'
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.transform = 'translateY(-3px)';
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.transform = 'translateY(0)';
    }}
  >
    <Card.Body className="p-4">
      <div className="d-flex justify-content-between align-items-start mb-4">
        <div>
          <h6 className="mb-2 opacity-90 d-flex align-items-center">
            <Thermometer className="me-2" size={18} />
            NYC Weather
          </h6>
          <div className="h1 fw-bold mb-0">72°F</div>
          <p className="mb-0 opacity-90">Partly Cloudy</p>
        </div>
        <div style={{ fontSize: '3rem', opacity: 0.8 }}>☀️</div>
      </div>
      
      <div className="row g-3 mb-4 small">
        <div className="col-6 text-center">
          <div className="opacity-80">Humidity</div>
          <div className="fw-bold">65%</div>
        </div>
        <div className="col-6 text-center">
          <div className="opacity-80">Wind</div>
          <div className="fw-bold">8 mph</div>
        </div>
      </div>
      
      <hr className="my-3 opacity-30" />
      
      <div className="small">
        <h6 className="mb-3 opacity-90">3-Day Forecast</h6>
        <div className="d-flex justify-content-between align-items-center mb-2">
          <span className="fw-semibold">Today</span>
          <span>🌤️ 75°/65°</span>
        </div>
        <div className="d-flex justify-content-between align-items-center mb-2">
          <span className="fw-semibold">Tomorrow</span>
          <span>☀️ 78°/68°</span>
        </div>
        <div className="d-flex justify-content-between align-items-center">
          <span className="fw-semibold">Wednesday</span>
          <span>🌧️ 73°/62°</span>
        </div>
      </div>
    </Card.Body>
  </Card>
);

// NYC Events Widget
const NYCEventsWidget = () => (
  <Card 
    className="border-0 text-white h-100 shadow-sm" 
    style={{ 
      borderRadius: '20px',
      background: 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)',
      transition: 'transform 0.3s ease'
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.transform = 'translateY(-3px)';
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.transform = 'translateY(0)';
    }}
  >
    <Card.Body className="p-4">
      <h5 className="fw-bold mb-4 d-flex align-items-center">
        <Calendar className="me-2" size={20} />
        Today's Events
      </h5>
      <div className="d-flex flex-column gap-3">
        <div className="d-flex align-items-center justify-content-between">
          <div>
            <div className="fw-semibold">⚾ Yankees vs Red Sox</div>
            <small className="opacity-80">Yankee Stadium • 7:00 PM</small>
          </div>
          <Badge bg="light" text="dark" className="small">Sports</Badge>
        </div>
        <div className="d-flex align-items-center justify-content-between">
          <div>
            <div className="fw-semibold">🎭 Broadway Show</div>
            <small className="opacity-80">Times Square • 8:00 PM</small>
          </div>
          <Badge bg="light" text="dark" className="small">Theater</Badge>
        </div>
        <div className="d-flex align-items-center justify-content-between">
          <div>
            <div className="fw-semibold">🎨 Art Gallery Opening</div>
            <small className="opacity-80">SoHo • 6:00 PM</small>
          </div>
          <Badge bg="light" text="dark" className="small">Art</Badge>
        </div>
        <div className="d-flex align-items-center justify-content-between">
          <div>
            <div className="fw-semibold">🎵 Jazz Night</div>
            <small className="opacity-80">Blue Note • 9:00 PM</small>
          </div>
          <Badge bg="light" text="dark" className="small">Music</Badge>
        </div>
      </div>
    </Card.Body>
  </Card>
);

// Enhanced Tips Card
const TipsCard = () => (
  <Card className="border-0 shadow-sm h-100" style={{ borderRadius: '20px' }}>
    <Card.Header 
      className="border-0 bg-transparent pt-4 pb-2"
      style={{ borderRadius: '20px 20px 0 0' }}
    >
      <h5 className="fw-bold text-dark mb-0 d-flex align-items-center">
        <Award className="me-2 text-warning" size={20} />
        Insider Tips
      </h5>
    </Card.Header>
    <Card.Body className="pt-2">
      <div className="mb-4">
        <div className="d-flex align-items-center mb-2">
          <div 
            className="rounded-circle bg-primary d-flex align-items-center justify-content-center me-3"
            style={{ width: '32px', height: '32px', minWidth: '32px' }}
          >
            <span className="text-white small fw-bold">1</span>
          </div>
          <div>
            <div className="fw-semibold text-dark">🚇 Use Public Transit</div>
            <p className="small text-muted mb-0">MetroCard is your best friend for getting around efficiently</p>
          </div>
        </div>
      </div>
      
      <div className="mb-4">
        <div className="d-flex align-items-center mb-2">
          <div 
            className="rounded-circle bg-success d-flex align-items-center justify-content-center me-3"
            style={{ width: '32px', height: '32px', minWidth: '32px' }}
          >
            <span className="text-white small fw-bold">2</span>
          </div>
          <div>
            <div className="fw-semibold text-dark">🎫 Book in Advance</div>
            <p className="small text-muted mb-0">Popular attractions sell out - reserve your tickets online</p>
          </div>
        </div>
      </div>
      
      <div className="mb-4">
        <div className="d-flex align-items-center mb-2">
          <div 
            className="rounded-circle bg-warning d-flex align-items-center justify-content-center me-3"
            style={{ width: '32px', height: '32px', minWidth: '32px' }}
          >
            <span className="text-white small fw-bold">3</span>
          </div>
          <div>
            <div className="fw-semibold text-dark">⏰ Start Early</div>
            <p className="small text-muted mb-0">Beat the crowds by visiting popular spots in the morning</p>
          </div>
        </div>
      </div>
      
      <div>
        <div className="d-flex align-items-center mb-2">
          <div 
            className="rounded-circle bg-info d-flex align-items-center justify-content-center me-3"
            style={{ width: '32px', height: '32px', minWidth: '32px' }}
          >
            <span className="text-white small fw-bold">4</span>
          </div>
          <div>
            <div className="fw-semibold text-dark">🍕 Try Local Food</div>
            <p className="small text-muted mb-0">Authentic NYC pizza and bagels from neighborhood spots</p>
          </div>
        </div>
      </div>
    </Card.Body>
  </Card>
);

// New NYC Facts Section  
const NYCFactsSection = () => (
  <Card className="border-0 shadow-sm" style={{ borderRadius: '20px' }}>
    <Card.Body className="p-4">
      <h4 className="fw-bold text-dark mb-4 d-flex align-items-center">
        <People className="me-2 text-primary" size={24} />
        Did You Know?
      </h4>
      <Row className="g-4">
        <Col md={3} className="text-center">
          <div className="h2 fw-bold text-primary mb-1">8.3M</div>
          <small className="text-muted">NYC Population</small>
        </Col>
        <Col md={3} className="text-center">
          <div className="h2 fw-bold text-success mb-1">65M</div>
          <small className="text-muted">Annual Visitors</small>
        </Col>
        <Col md={3} className="text-center">
          <div className="h2 fw-bold text-warning mb-1">500+</div>
          <small className="text-muted">Museums & Galleries</small>
        </Col>
        <Col md={3} className="text-center">
          <div className="h2 fw-bold text-info mb-1">1,700</div>
          <small className="text-muted">Parks & Playgrounds</small>
        </Col>
      </Row>
    </Card.Body>
  </Card>
);

const HomePage = ({ attractions, itinerary, addToItinerary, removeFromItinerary, setSelectedAttraction, setCurrentPage }) => {
  const featuredAttractions = attractions
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 3);
  const averageRating = (attractions.reduce((sum, attr) => sum + attr.rating, 0) / attractions.length).toFixed(1);
  const totalTime = itinerary.reduce((total, attraction) => {
    const duration = parseInt(attraction.duration.split('-')[1] || attraction.duration.split('-')[0]);
    return total + duration;
  }, 0);

  return (
    <div style={{ backgroundColor: '#f8f9fa', minHeight: '100vh' }}>
      {/* Enhanced Hero Section */}
      <div style={{ 
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
        padding: '100px 0 80px',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Background Pattern */}
        <div 
          className="position-absolute w-100 h-100"
          style={{
            top: 0,
            left: 0,
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            opacity: 0.3
          }}
        />
        
        <Container className="position-relative">
          <Row className="align-items-center">
            <Col lg={7}>
              <h1 className="display-2 fw-bold mb-4" style={{ letterSpacing: '-0.02em', lineHeight: '1.1' }}>
                Discover NYC Like Never Before
              </h1>
              <p className="fs-4 mb-5 opacity-90" style={{ lineHeight: 1.6, maxWidth: '600px' }}>
                Plan your perfect New York adventure with our curated collection of must-see attractions, 
                insider tips, and personalized itinerary tools. Experience the city that never sleeps.
              </p>
              <div className="d-flex flex-wrap gap-3">
                <Button
                  variant="light"
                  size="lg"
                  onClick={() => setCurrentPage('attractions')}
                  className="px-5 py-3 fw-semibold d-flex align-items-center"
                  style={{ 
                    borderRadius: '15px',
                    fontSize: '1.1rem',
                    transition: 'all 0.3s ease'
                  }}
                >
                  Explore Attractions
                  <ArrowRight className="ms-2" size={20} />
                </Button>
                <Button
                  variant="outline-light"
                  size="lg"
                  onClick={() => setCurrentPage('itinerary')}
                  className="px-5 py-3 fw-semibold d-flex align-items-center"
                  style={{ 
                    borderRadius: '15px',
                    fontSize: '1.1rem',
                    transition: 'all 0.3s ease',
                    borderWidth: '2px'
                  }}
                >
                  My Itinerary ({itinerary.length})
                </Button>
              </div>
            </Col>
            <Col lg={5} className="text-center">
              <div className="position-relative">
                <div 
                  className="rounded-circle mx-auto mb-4"
                  style={{
                    width: '300px',
                    height: '300px',
                    background: 'rgba(255,255,255,0.1)',
                    backdropFilter: 'blur(10px)',
                    border: '2px solid rgba(255,255,255,0.2)'
                  }}
                >
                  <div className="d-flex align-items-center justify-content-center h-100">
                    <div className="text-center">
                      <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🗽</div>
                      <div className="h4">NYC Awaits You</div>
                    </div>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>

      <Container className="py-5">
        {/* Enhanced Stats Section */}
        <Row className="mb-5 g-4" style={{ marginTop: '-60px' }}>
          <Col md={3}>
            <StatCard
              icon="🏢"
              value={attractions.length}
              label="Total Attractions"
              subtitle="Handpicked experiences"
              color="primary"
              trend="+12% this month"
            />
          </Col>
          <Col md={3}>
            <StatCard
              icon="⭐"
              value={averageRating}
              label="Average Rating"
              subtitle="Based on reviews"
              color="warning"
              trend="Highly rated"
            />
          </Col>
          <Col md={3}>
            <StatCard
              icon="📍"
              value={itinerary.length}
              label="In Your Itinerary"
              subtitle="Ready to explore"
              color="success"
              trend={itinerary.length > 0 ? "Looking good!" : "Start planning"}
            />
          </Col>
          <Col md={3}>
            <StatCard
              icon="⏰"
              value={`${totalTime}h`}
              label="Planned Time"
              subtitle="Estimated duration"
              color="info"
              trend={totalTime > 0 ? "Well planned" : "Add attractions"}
            />
          </Col>
        </Row>

        <Row className="g-5">
          {/* Main Content */}
          <Col lg={8}>
            {/* Enhanced Featured Attractions */}
            <div className="mb-5">
              <div className="d-flex justify-content-between align-items-center mb-4">
                <div>
                  <h2 className="h2 fw-bold text-dark mb-2">🏆 Top Rated Attractions</h2>
                  <p className="text-muted mb-0 fs-5">The highest-rated experiences according to visitors</p>
                </div>
                <Button
                  variant="outline-primary"
                  onClick={() => setCurrentPage('attractions')}
                  className="d-flex align-items-center fw-semibold"
                  style={{ borderRadius: '12px', borderWidth: '2px' }}
                >
                  View All Attractions
                  <ArrowRight className="ms-2" size={16} />
                </Button>
              </div>
              
              <Row className="g-4">
                {featuredAttractions.map((attraction, index) => (
                  <Col key={attraction.id} md={4}>
                    <FeaturedAttractionCard
                      attraction={attraction}
                      rank={index + 1}
                      onAddToItinerary={addToItinerary}
                      onRemoveFromItinerary={removeFromItinerary}
                      onViewDetails={setSelectedAttraction}
                      isInItinerary={itinerary.some(item => item.id === attraction.id)}
                    />
                  </Col>
                ))}
              </Row>
            </div>

            {/* NYC Facts */}
            <NYCFactsSection />
          </Col>

          {/* Enhanced Sidebar */}
          <Col lg={4}>
            <div className="sticky-top d-flex flex-column gap-4" style={{ top: '120px' }}>
              <WeatherWidget />
              <NYCEventsWidget />
              <TipsCard />
            </div>
          </Col>
        </Row>
      </Container>
      
      {/* Bottom spacing */}
      <div style={{ height: '80px' }} />
    </div>
  );
};

export default HomePage;