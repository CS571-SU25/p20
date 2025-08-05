import React from 'react';
import { Container, Row, Col, Card, Button, Badge, ProgressBar } from 'react-bootstrap';
import { Star, StarFill, Clock, GeoAlt, ArrowRight, Calendar, GraphUp, People, Award, Thermometer, Camera, Building, Globe } from 'react-bootstrap-icons';

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
const StatCard = ({ icon, value, label, color = "primary", trend, subtitle, progress }) => (
  <Card 
    className="border-0 h-100 shadow-sm position-relative overflow-hidden" 
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
    <Card.Body className="p-4">
      <div className="d-flex align-items-center justify-content-between mb-3">
        <div style={{ fontSize: '2.5rem', opacity: 0.9 }}>
          {icon}
        </div>
        {trend && (
          <div className="small d-flex align-items-center opacity-80">
            <GraphUp size={14} className="me-1" />
            <span className="fw-semibold">{trend}</span>
          </div>
        )}
      </div>
      <div className="h2 fw-bold mb-1">{value}</div>
      <div className="small opacity-90 mb-2">{label}</div>
      {subtitle && <div className="small opacity-75">{subtitle}</div>}
      {progress && (
        <div className="mt-3">
          <ProgressBar 
            now={progress} 
            variant="light" 
            style={{ height: '4px', backgroundColor: 'rgba(255,255,255,0.3)' }}
          />
        </div>
      )}
    </Card.Body>
    
    {/* Decorative background pattern */}
    <div 
      className="position-absolute"
      style={{
        top: '-20px',
        right: '-20px',
        width: '80px',
        height: '80px',
        borderRadius: '50%',
        background: 'rgba(255,255,255,0.1)',
        transform: 'rotate(45deg)'
      }}
    />
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
        cursor: 'pointer',
        overflow: 'hidden'
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

      <div className="position-relative overflow-hidden" style={{ height: '280px' }}>
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
        
        {/* Enhanced Gradient Overlay */}
        <div 
          className="position-absolute w-100 h-100"
          style={{
            top: 0,
            left: 0,
            background: 'linear-gradient(to bottom, transparent 0%, transparent 40%, rgba(0,0,0,0.8) 100%)'
          }}
        />

        {/* Multiple overlays for visual depth */}
        <Badge 
          className="position-absolute"
          style={{ 
            bottom: '60px',
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
          <GeoAlt size={12} className="me-1" />
          {attraction.category}
        </Badge>
        
        <div 
          className="position-absolute d-flex align-items-center"
          style={{
            bottom: '15px',
            left: '15px',
            color: 'white'
          }}
        >
          <Star className="text-warning me-1" size={16} fill="currentColor" />
          <span className="fw-bold">{attraction.rating}</span>
          <span className="mx-2 opacity-75">•</span>
          <Clock size={14} className="me-1" />
          <span className="small">{attraction.duration}</span>
        </div>
      </div>
      
      <Card.Body className="p-4 d-flex flex-column">
        <div className="mb-3">
         <h3 className="h5 fw-bold text-dark mb-2 lh-sm">{attraction.name}</h3>
          
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
              <Camera size={14} className="me-2" />
              Explore
            </Button>
            <Button
              variant={isInItinerary ? "danger" : "primary"}
              size="sm"
              onClick={handleItineraryAction}
              className="fw-bold d-flex align-items-center justify-content-center"
              style={{ 
                borderRadius: '10px',
                minWidth: '50px',
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
    className="border-0 text-white h-100 shadow-sm position-relative overflow-hidden" 
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
    {/* Background pattern */}
    <div 
      className="position-absolute"
      style={{
        top: '-50px',
        right: '-50px',
        width: '150px',
        height: '150px',
        borderRadius: '50%',
        background: 'rgba(255,255,255,0.1)',
        transform: 'rotate(45deg)'
      }}
    />
    
    <Card.Body className="p-4 position-relative">
      <div className="d-flex justify-content-between align-items-start mb-4">
        <div>
          <h3 className="h6 mb-2 opacity-90 d-flex align-items-center">
         <Thermometer className="me-2" size={18} />
         NYC Weather
         </h3>
          <div className="h1 fw-bold mb-0">72°F</div>
          <p className="mb-0 opacity-90">Partly Cloudy</p>
        </div>
        <div style={{ fontSize: '3.5rem', opacity: 0.8 }}>☀️</div>
      </div>
      
      <div className="row g-3 mb-4 small">
        <div className="col-4 text-center">
          <div className="opacity-80">Humidity</div>
          <div className="fw-bold">65%</div>
        </div>
        <div className="col-4 text-center">
          <div className="opacity-80">Wind</div>
          <div className="fw-bold">8 mph</div>
        </div>
        <div className="col-4 text-center">
          <div className="opacity-80">UV</div>
          <div className="fw-bold">6</div>
        </div>
      </div>
      
      <hr className="my-3 opacity-30" />
      
      <div className="small">
       <h4 className="h6 mb-3 opacity-90">3-Day Forecast</h4>
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

// NYC Travel Tips Card
const TravelTipsCard = () => (
  <Card className="border-0 shadow-sm h-100" style={{ borderRadius: '20px' }}>
    <Card.Header 
      className="border-0 bg-transparent pt-4 pb-2"
      style={{ borderRadius: '20px 20px 0 0' }}
    >
      <h3 className="h5 fw-bold text-dark mb-0 d-flex align-items-center">
       <Award className="me-2 text-warning" size={20} />
      Travel Tips
    </h3>
    </Card.Header>
    <Card.Body className="pt-2">
      <div className="mb-4">
        <div className="d-flex align-items-start mb-3">
          <div 
            className="rounded-circle bg-primary d-flex align-items-center justify-content-center me-3"
            style={{ width: '36px', height: '36px', minWidth: '36px' }}
          >
            <Clock className="text-white" size={16} />
          </div>
          <div>
            <h4 className="h6 fw-semibold text-dark mb-1">Best Times to Visit</h4>
            <p className="small text-muted mb-0">Early morning (8-10 AM) for popular attractions, avoid 12-3 PM crowds</p>
          </div>
        </div>
      </div>
      
      <div className="mb-4">
        <div className="d-flex align-items-start mb-3">
          <div 
            className="rounded-circle bg-success d-flex align-items-center justify-content-center me-3"
            style={{ width: '36px', height: '36px', minWidth: '36px' }}
          >
            <People className="text-white" size={16} />
          </div>
          <div>
            <h4 className="h6 fw-semibold text-dark mb-1">Transportation</h4>
            <p className="small text-muted mb-0">MetroCard for subway/bus. Walking between nearby attractions saves time</p>
          </div>
        </div>
      </div>
      
      <div className="mb-4">
        <div className="d-flex align-items-start mb-3">
          <div 
            className="rounded-circle bg-warning d-flex align-items-center justify-content-center me-3"
            style={{ width: '36px', height: '36px', minWidth: '36px' }}
          >
            <Globe className="text-white" size={16} />
          </div>
          <div>
            <h4 className="h6 fw-semibold text-dark mb-1">Local Insights</h4>
            <p className="small text-muted mb-0">Many museums offer "pay-what-you-wish" hours for NY residents</p>
          </div>
        </div>
      </div>

      <div>
        <div className="d-flex align-items-start mb-3">
          <div 
            className="rounded-circle bg-info d-flex align-items-center justify-content-center me-3"
            style={{ width: '36px', height: '36px', minWidth: '36px' }}
          >
            <Building className="text-white" size={16} />
          </div>
          <div>
              <h4 className="h6 fw-semibold text-dark mb-1">Book Ahead</h4>
            <p className="small text-muted mb-0">Reserve tickets for Empire State Building, Statue of Liberty in advance</p>
          </div>
        </div>
      </div>
    </Card.Body>
  </Card>
);

// Popular Neighborhoods Section
const PopularNeighborhoodsSection = ({ setCurrentPage }) => {
  const neighborhoods = [
    { name: 'Times Square', emoji: '🎭', description: 'Theater District & Broadway', attractions: 12 },
    { name: 'Central Park', emoji: '🌳', description: 'Urban Oasis & Recreation', attractions: 8 },
    { name: 'Brooklyn', emoji: '🌉', description: 'Bridge Views & Culture', attractions: 15 },
    { name: 'Financial District', emoji: '🏛️', description: 'Historic & Business Hub', attractions: 9 },
    { name: 'Greenwich Village', emoji: '🎨', description: 'Bohemian & Artistic', attractions: 11 },
    { name: 'Chinatown', emoji: '🏮', description: 'Cultural Experience', attractions: 7 }
  ];

  return (
    <div className="mb-5">
      <div className="text-center mb-4">
        <h2 className="h2 fw-bold text-dark mb-2">Explore by Neighborhood</h2>
        <p className="text-muted fs-5">Discover NYC's unique districts and their character</p>
      </div>
      
      <Row className="g-3">
        {neighborhoods.map((neighborhood, index) => (
          <Col key={neighborhood.name} xs={6} md={4} lg={2}>
            <Card 
              className="border-0 shadow-sm h-100 text-center"
              style={{ 
                borderRadius: '16px',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-5px)';
                e.currentTarget.style.boxShadow = '0 10px 25px rgba(0,0,0,0.15)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.08)';
              }}
              onClick={() => setCurrentPage('attractions')}
            >
              <Card.Body className="p-3">
                <div className="mb-2" style={{ fontSize: '2.5rem' }}>{neighborhood.emoji}</div>
<h3 className="h6 fw-bold text-dark mb-1">{neighborhood.name}</h3>
                <div className="small text-muted mb-2">{neighborhood.description}</div>
                <div className="small">
                  <Badge bg="primary" className="small">
                    {neighborhood.attractions} spots
                  </Badge>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

// NYC Facts Section with visual elements
const NYCFactsSection = () => (
  <Card className="border-0 shadow-sm position-relative overflow-hidden" style={{ borderRadius: '20px' }}>
    {/* Background decoration */}
    <div 
      className="position-absolute"
      style={{
        top: '-100px',
        right: '-100px',
        width: '200px',
        height: '200px',
        borderRadius: '50%',
        background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%)'
      }}
    />
    
    <Card.Body className="p-5 position-relative">
      <div className="text-center mb-4">
        <h2 className="h4 fw-bold text-dark mb-2 d-flex align-items-center justify-content-center">
  <People className="me-2 text-primary" size={24} />
  NYC by the Numbers
</h2>
        <p className="text-muted">The city that never sleeps in statistics</p>
      </div>
      
      <Row className="g-4">
        <Col md={3} className="text-center">
          <div className="mb-3">
            <div className="h1 fw-bold text-primary mb-1">8.3M</div>
            <h3 className="h6 text-muted mb-2">Population</h3>
            <ProgressBar now={85} variant="primary" style={{ height: '4px' }} />
          </div>
        </Col>
        <Col md={3} className="text-center">
          <div className="mb-3">
            <div className="h1 fw-bold text-success mb-1">65M</div>
            <h3 className="h6 text-muted mb-2">Annual Visitors</h3>
            <ProgressBar now={90} variant="success" style={{ height: '4px' }} />
          </div>
        </Col>
        <Col md={3} className="text-center">
          <div className="mb-3">
            <div className="h1 fw-bold text-warning mb-1">500+</div>
            <h3 className="h6 text-muted mb-2">Museums</h3>
            <ProgressBar now={75} variant="warning" style={{ height: '4px' }} />
          </div>
        </Col>
        <Col md={3} className="text-center">
          <div className="mb-3">
            <div className="h1 fw-bold text-info mb-1">1,700</div>
            <h3 className="h6 text-muted mb-2">Parks</h3>
            <ProgressBar now={80} variant="info" style={{ height: '4px' }} />
          </div>
        </Col>
      </Row>
      
      <Row className="mt-4 pt-4 border-top">
        <Col md={6}>
          <div className="d-flex align-items-center mb-3">
            <div className="bg-primary rounded-circle p-2 me-3">
              <Building className="text-white" size={16} />
            </div>
            <div>
              <h3 className="h6 fw-semibold">World's Financial Capital</h3>
              <small className="text-muted">Home to NYSE and major banks</small>
            </div>
          </div>
        </Col>
        <Col md={6}>
          <div className="d-flex align-items-center mb-3">
            <div className="bg-success rounded-circle p-2 me-3">
              <Globe className="text-white" size={16} />
            </div>
            <div>
              <h3 className="h6 fw-semibold">Cultural Melting Pot</h3>
              <small className="text-muted">200+ languages spoken daily</small>
            </div>
          </div>
        </Col>
      </Row>
    </Card.Body>
  </Card>
);

// NYC Events Widget
const NYCEventsWidget = () => (
  <Card 
    className="border-0 text-white h-100 shadow-sm position-relative overflow-hidden" 
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
    {/* Background pattern */}
    <div 
      className="position-absolute"
      style={{
        top: '-50px',
        right: '-50px',
        width: '150px',
        height: '150px',
        borderRadius: '50%',
        background: 'rgba(255,255,255,0.1)',
        transform: 'rotate(45deg)'
      }}
    />
    
    <Card.Body className="p-4 position-relative">
      <h3 className="h5 fw-bold mb-4 d-flex align-items-center">
  <Calendar className="me-2" size={20} />
  Today's Events
</h3>
      <div className="d-flex flex-column gap-3">
        <div className="d-flex align-items-center justify-content-between">
          <div>
            <h4 className="h6 fw-semibold">⚾ Yankees vs Red Sox</h4>
            <small className="opacity-80">Yankee Stadium • 7:00 PM</small>
          </div>
          <Badge bg="light" text="dark" className="small">Sports</Badge>
        </div>
        <div className="d-flex align-items-center justify-content-between">
          <div>
           <h4 className="h6 fw-semibold">🎭 Broadway Show</h4>
            <small className="opacity-80">Times Square • 8:00 PM</small>
          </div>
          <Badge bg="light" text="dark" className="small">Theater</Badge>
        </div>
        <div className="d-flex align-items-center justify-content-between">
          <div>
           <h4 className="h6 fw-semibold">🎨 Art Gallery Opening</h4>
            <small className="opacity-80">SoHo • 6:00 PM</small>
          </div>
          <Badge bg="light" text="dark" className="small">Art</Badge>
        </div>
        <div className="d-flex align-items-center justify-content-between">
          <div>
            <h4 className="h6 fw-semibold">🎵 Jazz Night</h4>
            <small className="opacity-80">Blue Note • 9:00 PM</small>
          </div>
          <Badge bg="light" text="dark" className="small">Music</Badge>
        </div>
      </div>
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
      {/* Tourist-Focused Hero Section */}
      <div style={{ 
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
        padding: '120px 0 100px',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* NYC Skyline Silhouette Background */}
        <div 
          className="position-absolute w-100"
          style={{
            bottom: 0,
            left: 0,
            height: '150px',
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1200 150'%3E%3Cpath fill='rgba(255,255,255,0.1)' d='M0,150 L0,120 L50,120 L50,80 L100,80 L100,40 L150,40 L150,60 L200,60 L200,20 L250,20 L250,100 L300,100 L300,70 L350,70 L350,30 L400,30 L400,90 L450,90 L450,50 L500,50 L500,110 L550,110 L550,75 L600,75 L600,35 L650,35 L650,95 L700,95 L700,65 L750,65 L750,25 L800,25 L800,85 L850,85 L850,45 L900,45 L900,105 L950,105 L950,55 L1000,55 L1000,125 L1050,125 L1050,75 L1100,75 L1100,135 L1200,135 L1200,150 Z'/%3E%3C/svg%3E")`,
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat'
          }}
        />
        
        {/* Floating NYC Icons */}
        <div className="position-absolute w-100 h-100" style={{ top: 0, left: 0 }}>
          <div style={{ position: 'absolute', top: '15%', left: '8%', fontSize: '5rem', opacity: 0.3, animation: 'float 8s ease-in-out infinite' }}>🗽</div>
          <div style={{ position: 'absolute', top: '30%', right: '15%', fontSize: '2.5rem', opacity: 0.15, animation: 'float 6s ease-in-out infinite 2s' }}>🏢</div>
          <div style={{ position: 'absolute', top: '60%', left: '20%', fontSize: '2rem', opacity: 0.2, animation: 'float 7s ease-in-out infinite 1s' }}>🚖</div>
          <div style={{ position: 'absolute', top: '15%', right: '25%', fontSize: '2.5rem', opacity: 0.15, animation: 'float 9s ease-in-out infinite 3s' }}>🌉</div>
          <div style={{ position: 'absolute', top: '25%', left: '25%', fontSize: '4rem', opacity: 0.2, animation: 'float 10s ease-in-out infinite 2.5s' }}>🗽</div>
          <div style={{ position: 'absolute', top: '70%', right: '10%', fontSize: '2rem', opacity: 0.2, animation: 'float 5s ease-in-out infinite 1.5s' }}>🎭</div>
          <div style={{ position: 'absolute', top: '50%', right: '35%', fontSize: '3.5rem', opacity: 0.25, animation: 'float 7s ease-in-out infinite 4s' }}>🗽</div>
        </div>
        
        <Container className="position-relative">
          <Row className="align-items-center">
            <Col lg={7}>
              <div className="mb-4">
                <Badge 
                  className="mb-3 px-3 py-2 fs-6"
                  style={{ 
                    background: 'rgba(255,255,255,0.2)', 
                    color: 'white',
                    borderRadius: '25px',
                    backdropFilter: 'blur(10px)'
                  }}
                >
                  🌟 #1 NYC Tourist Guide
                </Badge>
              </div>
              
              <h1 className="display-1 fw-bold mb-4" style={{ 
                letterSpacing: '-0.02em', 
                lineHeight: '1.1',
                textShadow: '2px 2px 4px rgba(0,0,0,0.3)'
              }}>
                Welcome to the 
                <span className="d-block" style={{ color: '#FFE66D' }}>Big Apple!</span>
              </h1>
              
              <p className="fs-3 mb-5" style={{ 
                lineHeight: 1.6, 
                maxWidth: '650px',
                textShadow: '1px 1px 2px rgba(0,0,0,0.2)',
                fontWeight: '400'
              }}>
                Your ultimate guide to New York City's iconic landmarks, hidden gems, and unforgettable experiences. 
                From Times Square to Central Park, we'll help you see it all! 🗽✨
              </p>
              
              <div className="d-flex flex-wrap gap-3 mb-4">
                <Button
                  variant="light"
                  size="lg"
                  onClick={() => setCurrentPage('attractions')}
                  className="px-5 py-3 fw-bold d-flex align-items-center shadow"
                  style={{ 
                    borderRadius: '25px',
                    fontSize: '1.1rem',
                    transition: 'all 0.3s ease',
                    background: 'white',
                    color: '#667eea'
                  }}
                >
                  🎯 Start Exploring
                  <ArrowRight className="ms-2" size={20} />
                </Button>
                <Button
                  variant="outline-light"
                  size="lg"
                  onClick={() => setCurrentPage('itinerary')}
                  className="px-5 py-3 fw-bold d-flex align-items-center"
                  style={{ 
                    borderRadius: '25px',
                    fontSize: '1.1rem',
                    transition: 'all 0.3s ease',
                    borderWidth: '3px',
                    backdropFilter: 'blur(10px)',
                    background: 'rgba(255,255,255,0.1)'
                  }}
                >
                  📋 Plan Trip ({itinerary.length})
                </Button>
              </div>
              
              {/* Tourist Features */}
              <div className="d-flex flex-wrap gap-4 mt-4">
                <div className="d-flex align-items-center">
                  <div className="bg-white rounded-circle p-2 me-2" style={{ width: '40px', height: '40px' }}>
                    <span style={{ fontSize: '1.2rem' }}>📅</span>
                  </div>
                  <div>
                    <div className="fw-bold small">Trip Planner</div>
                    <div className="small opacity-80">Custom itineraries</div>
                  </div>
                </div>
                <div className="d-flex align-items-center">
                  <div className="bg-white rounded-circle p-2 me-2" style={{ width: '40px', height: '40px' }}>
                    <span style={{ fontSize: '1.2rem' }}>⭐</span>
                  </div>
                  <div>
                    <div className="fw-bold small">Top Rated</div>
                    <div className="small opacity-80">Verified reviews</div>
                  </div>
                </div>
                <div className="d-flex align-items-center">
                  <div className="bg-white rounded-circle p-2 me-2" style={{ width: '40px', height: '40px' }}>
                    <span style={{ fontSize: '1.2rem' }}>🎫</span>
                  </div>
                  <div>
                    <div className="fw-bold small">Free to Use</div>
                    <div className="small opacity-80">No hidden fees</div>
                  </div>
                </div>
              </div>
            </Col>
            
            <Col lg={5} className="text-center">
              <div className="position-relative">
                {/* Main Tourist Visual */}
                <div 
                  className="mx-auto mb-4 d-flex flex-column align-items-center justify-content-center position-relative"
                  style={{
                    width: '320px',
                    height: '320px',
                    background: 'linear-gradient(135deg, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0.1) 100%)',
                    backdropFilter: 'blur(20px)',
                    border: '3px solid rgba(255,255,255,0.3)',
                    borderRadius: '30px',
                    boxShadow: '0 20px 40px rgba(0,0,0,0.2)'
                  }}
                >
                  {/* Tourist Camera */}
                  <div className="mb-3" style={{ fontSize: '4rem' }}>📸</div>
                  
                  <div className="text-center px-3">
                    <div className="h3 fw-bold mb-2">Ready to Explore?</div>
                    <div className="mb-3 opacity-90">Join 2M+ happy tourists who discovered NYC with us</div>
                    
                    {/* Mini Icons */}
                    <div className="d-flex justify-content-center gap-3 mb-3">
                      <div style={{ fontSize: '1.5rem' }}>🗽</div>
                      <div style={{ fontSize: '1.5rem' }}>🏢</div>
                      <div style={{ fontSize: '1.5rem' }}>🎭</div>
                      <div style={{ fontSize: '1.5rem' }}>🌳</div>
                      <div style={{ fontSize: '1.5rem' }}>🚖</div>
                    </div>
                    
                    <Badge 
                      className="px-3 py-2"
                      style={{ 
                        background: 'rgba(255,230,109,0.9)', 
                        color: '#333',
                        borderRadius: '15px',
                        fontWeight: 'bold'
                      }}
                    >
                      ⭐ 4.8/5 Tourist Rating
                    </Badge>
                  </div>
                </div>
                
                {/* Floating Elements */}
                <div className="position-absolute" style={{ top: '10px', right: '10px', fontSize: '2rem', animation: 'float 4s ease-in-out infinite' }}>🎈</div>
                <div className="position-absolute" style={{ bottom: '10px', left: '10px', fontSize: '2rem', animation: 'float 5s ease-in-out infinite 1s' }}>🗺️</div>
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
              progress={85}
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
              progress={92}
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
              progress={itinerary.length * 20}
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
              progress={Math.min(totalTime * 10, 100)}
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

            {/* Popular Neighborhoods */}
            <PopularNeighborhoodsSection setCurrentPage={setCurrentPage} />

            {/* NYC Facts */}
            <NYCFactsSection />
          </Col>

          {/* Enhanced Sidebar */}
          <Col lg={4}>
            <div className="sticky-top d-flex flex-column gap-4" style={{ top: '120px' }}>
              <WeatherWidget />
              <NYCEventsWidget />
              <TravelTipsCard />
            </div>
          </Col>
        </Row>
      </Container>
      
      {/* Add CSS animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
      `}</style>
    </div>
  );
};

export default HomePage;