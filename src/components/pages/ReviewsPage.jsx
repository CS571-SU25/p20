import React, { useState } from 'react';
import { Container, Row, Col, Card, Button, Badge, Form, Modal } from 'react-bootstrap';
import { 
  Star, 
  StarFill, 
  HandThumbsUp, 
  HandThumbsDown, 
  Person, 
  Calendar 
} from "react-bootstrap-icons";
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
      {showValue && <span className="ms-1 text-muted small">{rating}</span>}
    </div>
  );
};

// Individual Review Component
const ReviewCard = ({ review, attractionName }) => {
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(Math.floor(Math.random() * 20) + 1);

  const handleLike = () => {
    setLiked(!liked);
    setLikeCount(prev => liked ? prev - 1 : prev + 1);
  };

  const getRandomDaysAgo = () => Math.floor(Math.random() * 30) + 1;

  return (
    <Card className="mb-3 border-0 shadow-sm">
      <Card.Body>
        <div className="d-flex justify-content-between align-items-start mb-3">
          <div className="d-flex align-items-center">
            <div className="bg-primary rounded-circle d-flex align-items-center justify-content-center me-3" style={{ width: '40px', height: '40px' }}>
              <Person className="text-white" size={20} />
            </div>
            <div>
              <h6 className="mb-0 fw-bold">{review.user}</h6>
              <small className="text-muted">Verified Traveler</small>
            </div>
          </div>
          <div className="text-end">
            <RatingDisplay rating={review.rating} showValue={false} />
            <small className="text-muted d-block">
              <Calendar size={12} className="me-1" />
              {getRandomDaysAgo()} days ago
            </small>
          </div>
        </div>
        
        <div className="mb-3">
          <Badge bg="light" text="dark" className="mb-2">
            {attractionName}
          </Badge>
          <p className="mb-0 text-dark">{review.comment}</p>
        </div>
        
        <div className="d-flex justify-content-between align-items-center">
          <Button
            variant="link"
            size="sm"
            className={`p-0 text-decoration-none ${liked ? 'text-primary' : 'text-muted'}`}
            onClick={handleLike}
          >
            <ThumbsUp size={14} className="me-1" />
            Helpful ({likeCount})
          </Button>
          
          <small className="text-muted">
            Was this review helpful?
          </small>
        </div>
      </Card.Body>
    </Card>
  );
};

// Attraction Review Summary
const AttractionReviewSummary = ({ attraction, onViewDetails }) => {
  const averageRating = attraction.rating;
  const totalReviews = attraction.reviews.length;

  return (
    <Card className="mb-4 hover-card">
      <Row className="g-0">
        <Col md={3}>
          <img 
            src={attraction.image || `https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=300&h=200&fit=crop`}
            alt={attraction.name}
            className="img-fluid h-100 w-100 rounded-start"
            style={{ objectFit: 'cover', minHeight: '150px' }}
          />
        </Col>
        <Col md={9}>
          <Card.Body>
            <div className="d-flex justify-content-between align-items-start mb-2">
              <div>
                <Card.Title className="h5">{attraction.name}</Card.Title>
                <Badge bg="primary" className="me-2">{attraction.category}</Badge>
                <Badge bg={attraction.price === 'Free' ? 'success' : 'warning'}>
                  {attraction.price}
                </Badge>
              </div>
              <Button 
                variant="outline-primary" 
                size="sm"
                onClick={() => onViewDetails(attraction)}
              >
                View Details
              </Button>
            </div>
            
            <div className="mb-2">
              <RatingDisplay rating={averageRating} size={18} />
              <span className="ms-2 text-muted">
                ({totalReviews} review{totalReviews !== 1 ? 's' : ''})
              </span>
            </div>
            
            <p className="text-muted small mb-3">
              {attraction.description.substring(0, 120)}...
            </p>
            
            {/* Recent Reviews Preview */}
            <div>
              <h6 className="mb-2">Recent Reviews:</h6>
              {attraction.reviews.slice(0, 2).map((review, index) => (
                <div key={index} className="border-start border-primary border-3 ps-3 mb-2">
                  <div className="d-flex justify-content-between align-items-center mb-1">
                    <small className="fw-bold">{review.user}</small>
                    <RatingDisplay rating={review.rating} showValue={false} size={12} />
                  </div>
                  <p className="small mb-0 text-muted">
                    "{review.comment.substring(0, 100)}..."
                  </p>
                </div>
              ))}
            </div>
          </Card.Body>
        </Col>
      </Row>
    </Card>
  );
};

// Add Review Modal
const AddReviewModal = ({ show, onHide, attractions }) => {
  const [selectedAttraction, setSelectedAttraction] = useState('');
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [userName, setUserName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically submit the review to your backend
    console.log('New Review:', { selectedAttraction, rating, comment, userName });
    
    // Reset form
    setSelectedAttraction('');
    setRating(5);
    setComment('');
    setUserName('');
    onHide();
    
    // Show success message (you could use toast notifications)
    alert('Thank you for your review!');
  };

  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>Write a Review</Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit}>
        <Modal.Body>
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Your Name</Form.Label>
                <Form.Control
                  type="text"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  placeholder="Enter your name"
                  required
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Select Attraction</Form.Label>
                <Form.Select
                  value={selectedAttraction}
                  onChange={(e) => setSelectedAttraction(e.target.value)}
                  required
                >
                  <option value="">Choose an attraction...</option>
                  {attractions.map(attraction => (
                    <option key={attraction.id} value={attraction.id}>
                      {attraction.name}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>
          
          <Form.Group className="mb-3">
            <Form.Label>Rating</Form.Label>
            <div className="d-flex align-items-center">
              {[1, 2, 3, 4, 5].map(star => (
                <Button
                  key={star}
                  variant="link"
                  className="p-1"
                  onClick={() => setRating(star)}
                >
                  {star <= rating ? 
                    <StarFill className="text-warning" size={24} /> : 
                    <Star className="text-muted" size={24} />
                  }
                </Button>
              ))}
              <span className="ms-2">({rating} star{rating !== 1 ? 's' : ''})</span>
            </div>
          </Form.Group>
          
          <Form.Group className="mb-3">
            <Form.Label>Your Review</Form.Label>
            <Form.Control
              as="textarea"
              rows={4}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Share your experience with this attraction..."
              required
            />
            <Form.Text className="text-muted">
              Please be specific about what you liked or didn't like.
            </Form.Text>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onHide}>
            Cancel
          </Button>
          <Button variant="primary" type="submit">
            Submit Review
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

const ReviewsPage = ({ attractions, setSelectedAttraction }) => {
  const [showAddReview, setShowAddReview] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('recent');

  // Get all reviews from all attractions
  const allReviews = attractions.flatMap(attraction => 
    attraction.reviews.map(review => ({
      ...review,
      attractionName: attraction.name,
      attractionId: attraction.id
    }))
  );

  // Filter and sort reviews
  const filteredReviews = allReviews.filter(review => {
    if (selectedCategory === 'all') return true;
    const attraction = attractions.find(a => a.id === review.attractionId);
    return attraction.category === selectedCategory;
  });

  // Get unique categories
  const categories = ['all', ...new Set(attractions.map(attr => attr.category))];

  return (
    <Container>
      {/* Page Header */}
      <div className="text-center mb-5">
        <h1 className="display-5 fw-bold text-dark mb-3">Reviews & Ratings</h1>
        <p className="lead text-muted mb-4">
          Read genuine reviews from fellow travelers and share your own experiences 
          to help others plan their perfect NYC trip.
        </p>
        <Button 
          variant="primary" 
          size="lg"
          onClick={() => setShowAddReview(true)}
        >
          ✍️ Write a Review
        </Button>
      </div>

      {/* Filters and Stats */}
      <Row className="mb-4">
        <Col md={8}>
          <Card>
            <Card.Body>
              <Row>
                <Col md={6}>
                  <Form.Group>
                    <Form.Label className="fw-bold">Filter by Category:</Form.Label>
                    <Form.Select
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                    >
                      {categories.map(category => (
                        <option key={category} value={category}>
                          {category === 'all' ? 'All Categories' : category}
                        </option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group>
                    <Form.Label className="fw-bold">Sort by:</Form.Label>
                    <Form.Select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                    >
                      <option value="recent">Most Recent</option>
                      <option value="rating-high">Highest Rating</option>
                      <option value="rating-low">Lowest Rating</option>
                      <option value="helpful">Most Helpful</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="bg-light">
            <Card.Body className="text-center">
              <h4 className="text-primary mb-0">{allReviews.length}</h4>
              <small className="text-muted">Total Reviews</small>
              <hr />
              <h5 className="text-warning mb-0">
                {(allReviews.reduce((sum, r) => sum + r.rating, 0) / allReviews.length).toFixed(1)} ⭐
              </h5>
              <small className="text-muted">Average Rating</small>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row>
        <Col lg={8}>
          {/* Attraction Reviews */}
          <div className="mb-5">
            <h3 className="mb-4">Attraction Reviews</h3>
            {attractions
              .filter(attr => selectedCategory === 'all' || attr.category === selectedCategory)
              .map(attraction => (
                <AttractionReviewSummary
                  key={attraction.id}
                  attraction={attraction}
                  onViewDetails={setSelectedAttraction}
                />
              ))}
          </div>

          {/* Individual Reviews Feed */}
          <div>
            <h3 className="mb-4">Recent Reviews</h3>
            {filteredReviews.slice(0, 10).map((review, index) => (
              <ReviewCard
                key={`${review.attractionId}-${index}`}
                review={review}
                attractionName={review.attractionName}
              />
            ))}
            
            {filteredReviews.length === 0 && (
              <Card className="text-center py-5">
                <Card.Body>
                  <h5>No reviews found</h5>
                  <p className="text-muted">Try adjusting your filters or be the first to write a review!</p>
                </Card.Body>
              </Card>
            )}
          </div>
        </Col>

        <Col lg={4}>
          {/* Sidebar with review highlights */}
          <div className="sticky-top" style={{ top: '100px' }}>
            <Card className="mb-4">
              <Card.Header>
                <h5 className="mb-0">Review Highlights</h5>
              </Card.Header>
              <Card.Body>
                <div className="mb-3">
                  <h6>Most Loved Attractions</h6>
                  {attractions
                    .sort((a, b) => b.rating - a.rating)
                    .slice(0, 3)
                    .map(attraction => (
                      <div key={attraction.id} className="d-flex justify-content-between align-items-center mb-2">
                        <small>{attraction.name}</small>
                        <RatingDisplay rating={attraction.rating} size={12} />
                      </div>
                    ))}
                </div>
                
                <hr />
                
                <div>
                  <h6>Categories</h6>
                  {categories.filter(cat => cat !== 'all').map(category => {
                    const categoryAttractions = attractions.filter(attr => attr.category === category);
                    const avgRating = categoryAttractions.reduce((sum, attr) => sum + attr.rating, 0) / categoryAttractions.length;
                    
                    return (
                      <div key={category} className="d-flex justify-content-between align-items-center mb-2">
                        <small>{category}</small>
                        <RatingDisplay rating={avgRating} size={12} />
                      </div>
                    );
                  })}
                </div>
              </Card.Body>
            </Card>

            <Card>
              <Card.Header>
                <h5 className="mb-0">💡 Review Tips</h5>
              </Card.Header>
              <Card.Body>
                <ul className="list-unstyled small mb-0">
                  <li className="mb-2">✨ Be specific about your experience</li>
                  <li className="mb-2">📸 Mention photo opportunities</li>
                  <li className="mb-2">🕐 Include timing recommendations</li>
                  <li className="mb-2">💰 Comment on value for money</li>
                  <li className="mb-0">🎯 Be helpful to future visitors</li>
                </ul>
              </Card.Body>
            </Card>
          </div>
        </Col>
      </Row>

      {/* Add Review Modal */}
      <AddReviewModal
        show={showAddReview}
        onHide={() => setShowAddReview(false)}
        attractions={attractions}
      />

      <style jsx>{`
        .hover-card {
          transition: all 0.2s ease;
        }
        .hover-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(0,0,0,0.1) !important;
        }
      `}</style>
    </Container>
  );
};

export default ReviewsPage;