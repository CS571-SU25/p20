import React from 'react';
import { Card, Button, Badge } from 'react-bootstrap';
import { Clock, GeoAlt, Star, StarFill, Dash, Plus } from 'react-bootstrap-icons';

const AttractionCard = ({ attraction, onAddToItinerary, onRemoveFromItinerary, isInItinerary, onViewDetails }) => {
  const RatingDisplay = ({ rating }) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        i <= rating ? 
          <StarFill key={i} className="text-warning" size={14} /> : 
          <Star key={i} className="text-muted" size={14} />
      );
    }
    return <div className="d-flex align-items-center">{stars}</div>;
  };

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
      className="h-100 border-0 shadow-sm position-relative overflow-hidden"
      style={{ 
        borderRadius: '12px',
        transition: 'all 0.3s ease',
        cursor: 'pointer'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-4px)';
        e.currentTarget.style.boxShadow = '0 8px 25px rgba(0,0,0,0.15)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.08)';
      }}
    >
      {/* Image Section */}
      <div className="position-relative" style={{ height: '220px' }}>
        <img
          src={attraction.image}
          alt={`${attraction.name} - ${attraction.category} attraction in NYC`}
          className="w-100 h-100"
          style={{ 
            objectFit: 'cover',
            filter: 'brightness(0.95)'
          }}
          onClick={() => onViewDetails(attraction)}
        />

        {/* Category Badge */}
        <Badge 
          className="position-absolute bottom-0 start-0 m-3 px-3 py-2"
          style={{ 
            backgroundColor: 'rgba(0,0,0,0.8)',
            color: 'white',
            fontSize: '0.75rem',
            borderRadius: '20px'
          }}
        >
          {attraction.category}
        </Badge>

        {/* Rating Badge */}
        <div 
          className="position-absolute bottom-0 end-0 m-3 px-2 py-1 d-flex align-items-center gap-1"
          style={{
            backgroundColor: 'rgba(255,255,255,0.95)',
            borderRadius: '20px',
            fontSize: '0.75rem',
            backdropFilter: 'blur(10px)'
          }}
        >
          <Star className="text-warning" size={12} fill="currentColor" />
          <span className="fw-bold text-dark">{attraction.rating}</span>
        </div>

        {/* Itinerary Status Indicator */}
        {isInItinerary && (
          <div 
            className="position-absolute top-0 start-0 m-3 px-2 py-1 d-flex align-items-center"
            style={{
              backgroundColor: 'rgba(40, 167, 69, 0.9)',
              color: 'white',
              borderRadius: '20px',
              fontSize: '0.7rem'
            }}
          >
            ✓ In Itinerary
          </div>
        )}
      </div>

      {/* Content Section */}
      <Card.Body className="d-flex flex-column p-4">
        <div className="mb-3" onClick={() => onViewDetails(attraction)}>
          <h5 className="fw-bold text-dark mb-2 lh-sm" style={{ fontSize: '1.1rem' }}>
            {attraction.name}
          </h5>
          
          <div className="d-flex align-items-center mb-2 text-muted">
            <RatingDisplay rating={attraction.rating} />
            <span className="mx-2">•</span>
            <Clock size={14} />
            <span className="ms-1 small">{attraction.duration}</span>
          </div>
          
          <p className="text-muted mb-0 small" style={{ 
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            lineHeight: '1.4'
          }}>
            {attraction.description}
          </p>
        </div>

        <div className="text-muted small mb-3 d-flex align-items-center">
          <Clock size={12} className="me-1" />
          <span>{attraction.hours}</span>
        </div>

        {/* Action Buttons */}
        <div className="mt-auto">
          <div className="d-grid gap-2 d-sm-flex">
            <Button
              variant={isInItinerary ? "danger" : "primary"}
              size="sm"
              onClick={handleItineraryAction}
              className="flex-sm-fill fw-semibold d-flex align-items-center justify-content-center"
              style={{ 
                borderRadius: '8px',
                padding: '8px 16px',
                fontSize: '0.875rem'
              }}
            >
              {isInItinerary ? (
                <>
                  <Dash size={16} className="me-1" />
                  Remove from Itinerary
                </>
              ) : (
                <>
                  <Plus size={16} className="me-1" />
                  Add to Itinerary
                </>
              )}
            </Button>
            
            <Button
              variant="outline-secondary"
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                onViewDetails(attraction);
              }}
              className="fw-semibold"
              style={{ 
                borderRadius: '8px',
                padding: '8px 16px',
                fontSize: '0.875rem'
              }}
            >
              Details
            </Button>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
};

export default AttractionCard;