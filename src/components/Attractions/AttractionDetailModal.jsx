import React from 'react';
import { Modal, Button, Row, Col, Badge, Card } from 'react-bootstrap';
import { Clock, GeoAlt, BoxArrowUpRight } from 'react-bootstrap-icons';
import RatingDisplay from '../UI/RatingDisplay';
import UserReview from '../UI/UserReview';

const AttractionDetailModal = ({ attraction, onClose, onAddToItinerary, isInItinerary }) => {
  if (!attraction) return null;

  return (
    <Modal 
      show={!!attraction} 
      onHide={onClose} 
      size="xl" 
      centered
      aria-labelledby="attraction-modal-title"
    >
      <Modal.Header closeButton className="border-0 pb-0">
        <Modal.Title id="attraction-modal-title" className="h3 fw-bold text-dark">
          {attraction.name}
        </Modal.Title>
      </Modal.Header>
      
      <Modal.Body className="p-0">
        {/* Hero Image */}
        <div className="position-relative">
          <img
            src={attraction.image}
            alt={`Detailed view of ${attraction.name}`}
            className="w-100"
            style={{ height: '300px', objectFit: 'cover' }}
          />
          <Badge 
            bg="primary" 
            className="position-absolute top-0 start-0 m-3 fs-6 px-3 py-2"
          >
            {attraction.category}
          </Badge>
        </div>
        
        {/* Content */}
        <div className="p-4">
          {/* Rating and Duration */}
          <div className="d-flex align-items-center mb-3">
            <RatingDisplay rating={attraction.rating} size={20} />
            <span className="text-muted mx-3">•</span>
            <Clock size={18} className="text-muted me-2" />
            <span className="text-muted">Duration: {attraction.duration}</span>
          </div>
          
          {/* Description */}
          <p className="lead text-dark mb-4" style={{ lineHeight: '1.6' }}>
            {attraction.description}
          </p>
          
          {/* Details and Tips */}
          <Row className="mb-4">
            <Col md={6}>
              <Card className="border-0 bg-light h-100">
                <Card.Body>
                  <h5 className="fw-bold mb-3 text-primary">
                    <Clock size={20} className="me-2" />
                    Details
                  </h5>
                  <div className="mb-3">
                    <div className="d-flex align-items-center mb-2">
                      <Clock size={16} className="text-muted me-2" />
                      <strong className="me-2">Hours:</strong>
                      <span className="text-dark">{attraction.hours}</span>
                    </div>
                    <div className="d-flex align-items-center">
                      <GeoAlt size={16} className="text-muted me-2" />
                      <strong className="me-2">Location:</strong>
                      <span className="text-dark">
                        {attraction.location.lat.toFixed(4)}, {attraction.location.lng.toFixed(4)}
                      </span>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </Col>
            
            <Col md={6}>
              <Card className="border-0 bg-light h-100">
                <Card.Body>
                  <h5 className="fw-bold mb-3 text-success">
                    💡 Local Tips
                  </h5>
                  <ul className="list-unstyled mb-0">
                    {attraction.tips.map((tip, index) => (
                      <li key={index} className="mb-2 d-flex align-items-start">
                        <span className="text-primary me-2 fw-bold">•</span>
                        <span className="text-dark small">{tip}</span>
                      </li>
                    ))}
                  </ul>
                </Card.Body>
              </Card>
            </Col>
          </Row>
          
          {/* Reviews Section */}
          <div className="mb-4">
            <h5 className="fw-bold mb-3 text-dark">
              ⭐ Visitor Reviews
            </h5>
            <Row>
              {attraction.reviews.map((review, index) => (
                <Col key={index} md={6} className="mb-3">
                  <UserReview review={review} />
                </Col>
              ))}
            </Row>
          </div>
        </div>
      </Modal.Body>
      
      {/* Action Buttons */}
      <Modal.Footer className="border-0 bg-light p-4">
        <div className="d-flex w-100 gap-3">
          <Button
            variant={isInItinerary ? "success" : "primary"}
            onClick={() => onAddToItinerary(attraction)}
            disabled={isInItinerary}
            className="flex-grow-1 py-2 fw-bold"
            size="lg"
          >
            {isInItinerary ? (
              <>
                ✓ Added to Itinerary
              </>
            ) : (
              <>
                + Add to Itinerary
              </>
            )}
          </Button>
          <Button
            as="a"
            href={attraction.bookingUrl}
            target="_blank"
            rel="noopener noreferrer"
            variant="success"
            className="d-flex align-items-center px-4 py-2 fw-bold"
            size="lg"
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