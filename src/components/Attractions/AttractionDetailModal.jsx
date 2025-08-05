import React, { useState } from 'react';
import { Modal, Button, Row, Col, Badge, Card, Nav, Tab, ListGroup, Carousel } from 'react-bootstrap';
import { 
  Clock, 
  GeoAlt, 
  BoxArrowUpRight, 
  Star, 
  StarFill, 
  Calendar, 
  CurrencyDollar, 
  Camera, 
  Info,
  Phone,
  Globe,
  Person
} from 'react-bootstrap-icons';

const AttractionDetailModal = ({ attraction, onClose, onAddToItinerary, isInItinerary, onRemoveFromItinerary, userReviews = [] }) => {
  const [activeTab, setActiveTab] = useState('overview');

  if (!attraction) return null;

  // Combine original reviews with user reviews for this attraction
  const getAllReviewsForAttraction = () => {
    const originalReviews = attraction.reviews || [];
    const attractionUserReviews = userReviews.filter(review => 
      review.attractionId === attraction.id
    );
    
    // Combine all reviews and sort by date (newest first)
    const allReviews = [...originalReviews, ...attractionUserReviews];
    
    // Sort by dateAdded (newest first)
    allReviews.sort((a, b) => {
      const dateA = new Date(a.dateAdded || '2024-01-01');
      const dateB = new Date(b.dateAdded || '2024-01-01');
      return dateB - dateA; // Newest first
    });
    
    return allReviews;
  };

  const allReviews = getAllReviewsForAttraction();
  const averageRating = allReviews.length > 0 
    ? (allReviews.reduce((sum, review) => sum + review.rating, 0) / allReviews.length).toFixed(1)
    : attraction.rating;

  // Rating Display Component
  const RatingDisplay = ({ rating, size = 16, showNumber = true }) => {
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
        {showNumber && <span className="ms-2 fw-semibold text-dark">{rating}</span>}
      </div>
    );
  };

  // Enhanced User Review Component
  const UserReview = ({ review }) => {
    const getTimeAgo = () => {
      if (review.dateAdded) {
        const date = new Date(review.dateAdded);
        const now = new Date();
        const diffTime = Math.abs(now - date);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        
        if (diffDays === 1) return 'Yesterday';
        if (diffDays < 7) return `${diffDays} days ago`;
        if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
        return `${Math.floor(diffDays / 30)} months ago`;
      }
      return `${Math.floor(Math.random() * 30) + 1} days ago`;
    };

    return (
      <Card className="border-0 shadow-sm mb-3" style={{ borderRadius: '12px' }}>
        <Card.Body className="p-4">
          <div className="d-flex align-items-start mb-3">
            <div 
              className={`${review.isUserReview ? 'bg-success' : 'bg-primary'} rounded-circle d-flex align-items-center justify-content-center me-3`}
              style={{ width: '45px', height: '45px', minWidth: '45px' }}
            >
              <Person className="text-white" size={20} />
            </div>
            <div className="flex-grow-1">
              <div className="d-flex align-items-center justify-content-between mb-2">
                <div>
                  <h6 className="fw-bold mb-1">{review.user}</h6>
                  <div className="d-flex align-items-center gap-2">
                    {review.isUserReview && (
                      <Badge bg="success" className="small">Your Review</Badge>
                    )}
                    <small className="text-muted d-flex align-items-center">
                      <Calendar size={12} className="me-1" />
                      {getTimeAgo()}
                    </small>
                  </div>
                </div>
              </div>
              <div className="mb-2">
                <RatingDisplay rating={review.rating} size={14} showNumber={false} />
              </div>
            </div>
          </div>
          <p className="text-dark mb-0" style={{ lineHeight: '1.6' }}>
            {review.comment}
          </p>
        </Card.Body>
      </Card>
    );
  };

  // Mock additional data for enhanced information
  const enhancedAttraction = {
    ...attraction,
    priceRange: attraction.category === 'Museum' ? '$15-25' : 
                attraction.category === 'Park' ? 'Free' : 
                attraction.category === 'Landmark' ? '$10-30' : '$20-40',
    bestTimeToVisit: 'Early morning (8-10 AM) or late afternoon (4-6 PM)',
    crowdLevel: attraction.rating > 4.5 ? 'High' : attraction.rating > 4.0 ? 'Moderate' : 'Low',
    accessibility: ['Wheelchair accessible', 'Audio guides available', 'Elevator access'],
    amenities: ['WiFi', 'Gift shop', 'Restrooms', 'Parking available', 'Food court'],
    nearbyTransport: 'Subway: 4, 5, 6 trains to Union Square',
    phone: '+1 (212) 555-0123',
    website: 'https://example.com',
    socialMedia: '@nycattraction',
    photosAllowed: true,
    languages: ['English', 'Spanish', 'French', 'Chinese'],
    ageRecommendation: 'All ages welcome',
    groupDiscounts: 'Available for 10+ people'
  };

  return (
    <Modal 
      show={!!attraction} 
      onHide={onClose} 
      size="xl" 
      centered
      aria-labelledby="attraction-modal-title"
      className="attraction-modal"
    >
      <Modal.Header 
        closeButton 
        className="border-0 pb-0"
        style={{ 
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white'
        }}
      >
        <Modal.Title id="attraction-modal-title" className="h3 fw-bold">
          {attraction.name}
        </Modal.Title>
      </Modal.Header>
      
      <Modal.Body className="p-0">
        {/* Hero Section with Enhanced Info */}
        <div className="position-relative">
          <img
            src={attraction.image}
            alt={`Detailed view of ${attraction.name}`}
            className="w-100"
            style={{ height: '350px', objectFit: 'cover', filter: 'brightness(0.9)' }}
          />
          
          {/* Gradient Overlay */}
          <div 
            className="position-absolute w-100 h-100"
            style={{
              top: 0,
              left: 0,
              background: 'linear-gradient(to bottom, transparent 0%, transparent 60%, rgba(0,0,0,0.7) 100%)'
            }}
          />
          
          {/* Enhanced Badges */}
          <div className="position-absolute top-0 start-0 m-3 d-flex flex-column gap-2">
            <Badge 
              className="px-3 py-2 fs-6"
              style={{ 
                background: 'rgba(102, 126, 234, 0.9)',
                borderRadius: '20px',
                backdropFilter: 'blur(10px)'
              }}
            >
              {attraction.category}
            </Badge>
            <Badge 
              className="px-3 py-2"
              style={{ 
                background: enhancedAttraction.crowdLevel === 'High' ? 'rgba(220, 53, 69, 0.9)' :
                           enhancedAttraction.crowdLevel === 'Moderate' ? 'rgba(255, 193, 7, 0.9)' :
                           'rgba(40, 167, 69, 0.9)',
                borderRadius: '20px',
                backdropFilter: 'blur(10px)'
              }}
            >
              {enhancedAttraction.crowdLevel} Traffic
            </Badge>
          </div>
          
          {/* Rating and Price in Bottom Right */}
          <div className="position-absolute bottom-0 end-0 m-3 d-flex flex-column gap-2">
            <div 
              className="px-3 py-2 d-flex align-items-center gap-2"
              style={{
                backgroundColor: 'rgba(255,255,255,0.95)',
                borderRadius: '20px',
                backdropFilter: 'blur(10px)'
              }}
            >
              <Star className="text-warning" size={16} fill="currentColor" />
              <span className="fw-bold text-dark">{averageRating}</span>
            </div>
            <div 
              className="px-3 py-2 d-flex align-items-center gap-2"
              style={{
                backgroundColor: 'rgba(40, 167, 69, 0.9)',
                color: 'white',
                borderRadius: '20px',
                backdropFilter: 'blur(10px)'
              }}
            >
              <CurrencyDollar size={16} />
              <span className="fw-bold">{enhancedAttraction.priceRange}</span>
            </div>
          </div>
        </div>
        
        {/* Tabbed Content */}
        <div className="p-4">
          <Tab.Container activeKey={activeTab} onSelect={(k) => setActiveTab(k)}>
            <Nav variant="pills" className="mb-4 d-flex justify-content-center">
              <Nav.Item>
                <Nav.Link eventKey="overview" className="px-4 py-2 mx-1" style={{ borderRadius: '25px' }}>
                  <Info size={16} className="me-2" />
                  Overview
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="details" className="px-4 py-2 mx-1" style={{ borderRadius: '25px' }}>
                  <GeoAlt size={16} className="me-2" />
                  Visit Info
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="reviews" className="px-4 py-2 mx-1" style={{ borderRadius: '25px' }}>
                  <Star size={16} className="me-2" />
                  Reviews ({allReviews.length})
                </Nav.Link>
              </Nav.Item>
            </Nav>

            <Tab.Content>
              {/* Overview Tab */}
              <Tab.Pane eventKey="overview">
                <Row className="g-4">
                  <Col lg={8}>
                    <div className="mb-4">
                      <h1 className="fw-bold mb-3 text-dark">About This Attraction</h1>
                      <p className="lead text-dark mb-4" style={{ lineHeight: '1.7' }}>
                        {attraction.description}
                      </p>
                    </div>

                    {/* Quick Stats */}
                    <div className="mb-4">
                      <h6 className="fw-bold mb-3 text-dark">Quick Facts</h6>
                      <Row className="g-3">
                        <Col sm={6}>
                          <div className="d-flex align-items-center p-3 bg-light rounded-3">
                            <Clock size={20} className="text-primary me-3" />
                            <div>
                              <div className="fw-semibold small">Duration</div>
                              <div className="text-dark">{attraction.duration}</div>
                            </div>
                          </div>
                        </Col>
                        <Col sm={6}>
                          <div className="d-flex align-items-center p-3 bg-light rounded-3">
                            <CurrencyDollar size={20} className="text-success me-3" />
                            <div>
                              <div className="fw-semibold small">Price Range</div>
                              <div className="text-dark">{enhancedAttraction.priceRange}</div>
                            </div>
                          </div>
                        </Col>
                        <Col sm={6}>
                          <div className="d-flex align-items-center p-3 bg-light rounded-3">
                            <Calendar size={20} className="text-info me-3" />
                            <div>
                              <div className="fw-semibold small">Best Time</div>
                              <div className="text-dark small">Early morning</div>
                            </div>
                          </div>
                        </Col>
                        <Col sm={6}>
                          <div className="d-flex align-items-center p-3 bg-light rounded-3">
                            <Camera size={20} className="text-warning me-3" />
                            <div>
                              <div className="fw-semibold small">Photography</div>
                              <div className="text-dark">
                                {enhancedAttraction.photosAllowed ? 'Allowed' : 'Restricted'}
                              </div>
                            </div>
                          </div>
                        </Col>
                      </Row>
                    </div>

                    {/* Local Tips */}
                    <div className="mb-4">
                      <h6 className="fw-bold mb-3 text-dark">💡 Insider Tips</h6>
                      <ListGroup className="border-0">
                        {attraction.tips.map((tip, index) => (
                          <ListGroup.Item 
                            key={index} 
                            className="border-0 border-start border-primary border-3 px-3 py-2 mb-2 bg-light"
                            style={{ borderRadius: '0 8px 8px 0' }}
                          >
                            <div className="d-flex align-items-start">
                              <span className="text-primary me-2 fw-bold">💡</span>
                              <span className="text-dark">{tip}</span>
                            </div>
                          </ListGroup.Item>
                        ))}
                      </ListGroup>
                    </div>
                  </Col>

                  <Col lg={4}>
                    {/* Accessibility & Amenities */}
                    <Card className="border-0 shadow-sm mb-4" style={{ borderRadius: '12px' }}>
                      <Card.Body className="p-4">
                        <h6 className="fw-bold mb-3 text-dark d-flex align-items-center">
                          <span className="text-success me-2" style={{ fontSize: '18px' }}>♿</span>
                          Accessibility
                        </h6>
                        <div className="d-flex flex-column gap-2">
                          {enhancedAttraction.accessibility.map((item, index) => (
                            <div key={index} className="d-flex align-items-center">
                              <span className="text-success me-2">✓</span>
                              <small className="text-dark">{item}</small>
                            </div>
                          ))}
                        </div>
                      </Card.Body>
                    </Card>

                    <Card className="border-0 shadow-sm" style={{ borderRadius: '12px' }}>
                      <Card.Body className="p-4">
                        <h6 className="fw-bold mb-3 text-dark">🎯 Amenities</h6>
                        <div className="d-flex flex-wrap gap-2">
                          {enhancedAttraction.amenities.map((amenity, index) => (
                            <Badge 
                              key={index}
                              bg="light" 
                              text="dark" 
                              className="px-3 py-2"
                              style={{ borderRadius: '15px', fontSize: '0.8rem' }}
                            >
                              {amenity === 'WiFi' && <span className="me-1">📶</span>}
                              {amenity === 'Parking available' && <span className="me-1">🅿️</span>}
                              {amenity === 'Food court' && <span className="me-1">🍽️</span>}
                              {amenity === 'Gift shop' && <span className="me-1">🛍️</span>}
                              {amenity === 'Restrooms' && <span className="me-1">🚻</span>}
                              {amenity}
                            </Badge>
                          ))}
                        </div>
                      </Card.Body>
                    </Card>
                  </Col>
                </Row>
              </Tab.Pane>

              {/* Visit Info Tab */}
              <Tab.Pane eventKey="details">
                <Row className="g-4">
                  <Col lg={6}>
                    <Card className="border-0 shadow-sm h-100" style={{ borderRadius: '12px' }}>
                      <Card.Body className="p-4">
                        <h2 className="fw-bold mb-4 text-primary d-flex align-items-center">
                          <Clock size={20} className="me-2" />
                          Hours & Contact
                        </h2>
                        
                        <div className="mb-4">
                          <div className="d-flex align-items-center mb-3">
                            <Clock size={16} className="text-muted me-3" />
                            <div>
                              <div className="fw-semibold small text-muted">Operating Hours</div>
                              <div className="text-dark">{attraction.hours}</div>
                            </div>
                          </div>
                          
                          <div className="d-flex align-items-center mb-3">
                            <Phone size={16} className="text-muted me-3" />
                            <div>
                              <div className="fw-semibold small text-muted">Phone</div>
                              <div className="text-dark">{enhancedAttraction.phone}</div>
                            </div>
                          </div>
                          
                          <div className="d-flex align-items-center mb-3">
                            <Globe size={16} className="text-muted me-3" />
                            <div>
                              <div className="fw-semibold small text-muted">Website</div>
                              <a href={enhancedAttraction.website} className="text-primary text-decoration-none">
                                Visit Website
                              </a>
                            </div>
                          </div>
                        </div>

                        <div className="border-top pt-3">
                          <div className="fw-semibold small text-muted mb-2">Best Time to Visit</div>
                          <p className="text-dark mb-0">{enhancedAttraction.bestTimeToVisit}</p>
                        </div>
                      </Card.Body>
                    </Card>
                  </Col>
                  
                  <Col lg={6}>
                    <Card className="border-0 shadow-sm h-100" style={{ borderRadius: '12px' }}>
                      <Card.Body className="p-4">
                        <h3 className="fw-bold mb-4 text-success d-flex align-items-center">
                          <GeoAlt size={20} className="me-2" />
                          Getting There
                        </h3>
                        
                        <div className="mb-4">
                          <div className="d-flex align-items-start mb-3">
                            <GeoAlt size={16} className="text-muted me-3 mt-1" />
                            <div>
                              <div className="fw-semibold small text-muted">Address</div>
                              <div className="text-dark">
                                {attraction.location.lat.toFixed(4)}, {attraction.location.lng.toFixed(4)}
                              </div>
                            </div>
                          </div>
                          
                          <div className="d-flex align-items-start mb-3">
                            <span className="me-3 mt-1" style={{ fontSize: '16px' }}>🚇</span>
                            <div>
                              <div className="fw-semibold small text-muted">Public Transit</div>
                              <div className="text-dark">{enhancedAttraction.nearbyTransport}</div>
                            </div>
                          </div>
                        </div>

                        <div className="border-top pt-3">
                          <div className="fw-semibold small text-muted mb-2">Languages Available</div>
                          <div className="d-flex flex-wrap gap-1">
                            {enhancedAttraction.languages.map((lang, index) => (
                              <Badge 
                                key={index}
                                bg="primary" 
                                className="small"
                                style={{ borderRadius: '10px' }}
                              >
                                {lang}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </Card.Body>
                    </Card>
                  </Col>
                </Row>

                {/* Additional Information */}
                <Row className="g-4 mt-2">
                  <Col lg={4}>
                    <Card className="border-0 bg-light" style={{ borderRadius: '12px' }}>
                      <Card.Body className="p-4 text-center">
                        <div className="mb-2" style={{ fontSize: '2rem' }}>👥</div>
                        <div className="fw-semibold">Age Recommendation</div>
                        <div className="text-muted small">{enhancedAttraction.ageRecommendation}</div>
                      </Card.Body>
                    </Card>
                  </Col>
                  <Col lg={4}>
                    <Card className="border-0 bg-light" style={{ borderRadius: '12px' }}>
                      <Card.Body className="p-4 text-center">
                        <div className="mb-2" style={{ fontSize: '2rem' }}>💳</div>
                        <div className="fw-semibold">Group Discounts</div>
                        <div className="text-muted small">{enhancedAttraction.groupDiscounts}</div>
                      </Card.Body>
                    </Card>
                  </Col>
                  <Col lg={4}>
                    <Card className="border-0 bg-light" style={{ borderRadius: '12px' }}>
                      <Card.Body className="p-4 text-center">
                        <div className="mb-2" style={{ fontSize: '2rem' }}>📊</div>
                        <div className="fw-semibold">Crowd Level</div>
                        <div className="text-muted small">{enhancedAttraction.crowdLevel} traffic expected</div>
                      </Card.Body>
                    </Card>
                  </Col>
                </Row>
              </Tab.Pane>

              {/* Reviews Tab */}
              <Tab.Pane eventKey="reviews">
                <div className="mb-4">
                  <div className="d-flex align-items-center justify-content-between mb-4">
                    <h4 className="fw-bold text-dark mb-0">Visitor Reviews</h4>
                    <div className="d-flex align-items-center">
                      <RatingDisplay rating={parseFloat(averageRating)} size={18} />
                      <span className="ms-3 text-muted">
                        Based on {allReviews.length} reviews
                      </span>
                    </div>
                  </div>
                </div>
                
                <Row>
                  {allReviews.length > 0 ? (
                    allReviews.map((review, index) => (
                      <Col key={`${review.id || `original-${index}`}-${review.user}`} lg={6} className="mb-4">
                        <UserReview review={review} />
                      </Col>
                    ))
                  ) : (
                    <Col>
                      <Card className="border-0 bg-light text-center py-4" style={{ borderRadius: '12px' }}>
                        <Card.Body>
                          <div className="mb-3" style={{ fontSize: '3rem', opacity: 0.3 }}>📝</div>
                          <h6 className="fw-bold text-muted mb-2">No reviews yet</h6>
                          <p className="text-muted mb-0">Be the first to share your experience!</p>
                        </Card.Body>
                      </Card>
                    </Col>
                  )}
                </Row>
              </Tab.Pane>
            </Tab.Content>
          </Tab.Container>
        </div>
      </Modal.Body>
      
      {/* Enhanced Action Footer */}
      <Modal.Footer 
        className="border-0 p-4"
        style={{ background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)' }}
      >
        <div className="d-flex w-100 gap-3 align-items-center">
          <div className="flex-grow-1">
            <div className="d-flex align-items-center gap-3">
              <RatingDisplay rating={parseFloat(averageRating)} size={16} />
              <Badge bg="success" className="px-3 py-2" style={{ borderRadius: '15px' }}>
                {enhancedAttraction.priceRange}
              </Badge>
              <Badge bg="info" className="px-3 py-2" style={{ borderRadius: '15px' }}>
                {attraction.duration}
              </Badge>
            </div>
          </div>
          
          <Button
            variant={isInItinerary ? "outline-danger" : "primary"}
            onClick={() => {
              if (isInItinerary) {
                onRemoveFromItinerary(attraction.id);
              } else {
                onAddToItinerary(attraction);
              }
            }}
            className="px-4 py-2 fw-bold d-flex align-items-center"
            size="lg"
            style={{ borderRadius: '25px', minWidth: '180px' }}
          >
            {isInItinerary ? (
              <>
                Remove from Trip
              </>
            ) : (
              <>
                + Add to Trip
              </>
            )}
          </Button>
          
          <Button
            as="a"
            href={attraction.bookingUrl || '#'}
            target="_blank"
            rel="noopener noreferrer"
            variant="success"
            className="d-flex align-items-center px-4 py-2 fw-bold"
            size="lg"
            style={{ borderRadius: '25px' }}
          >
            <BoxArrowUpRight size={18} className="me-2" />
            Book Now
          </Button>
        </div>
      </Modal.Footer>
    </Modal>
  );
};

export default AttractionDetailModal;