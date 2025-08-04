import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Badge, Form, Modal, Alert, Pagination } from 'react-bootstrap';
import { 
  Star, 
  StarFill, 
  Person, 
  Calendar,
  PlusCircle,
  Trash3,
  Filter,
  SortDown,
  Search,
  ExclamationTriangle,
  ChevronLeft,
  ChevronRight
} from "react-bootstrap-icons";

const ReviewsPage = ({ attractions, setSelectedAttraction, userReviews, addReview, deleteReview }) => {
  // State Management - removed userReviews state since it's now passed as props
  const [showAddReview, setShowAddReview] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('recent');
  const [searchTerm, setSearchTerm] = useState('');
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(null);
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [reviewsPerPage] = useState(6); // Number of reviews per page

  // Removed localStorage useEffects since reviews are now managed in App.jsx

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory, sortBy, searchTerm]);

  // Get all reviews (existing + user-added)
  const getAllReviews = () => {
    const existingReviews = attractions.flatMap(attraction => 
      attraction.reviews.map(review => ({
        ...review,
        attractionName: attraction.name,
        attractionId: attraction.id,
        category: attraction.category,
        isUserReview: false,
        id: `existing-${attraction.id}-${attraction.reviews.indexOf(review)}`
      }))
    );

    return [...existingReviews, ...userReviews];
  };

  // Add new review - now uses the prop function
  const handleAddReview = (reviewData) => {
    addReview(reviewData); // Use the prop function instead of local state
  };

  // Delete review - now uses the prop function
  const handleDeleteReview = (reviewId) => {
    deleteReview(reviewId); // Use the prop function instead of local state
    setShowDeleteConfirm(null);
  };

  // Filter and sort reviews
  const getFilteredReviews = () => {
    let reviews = getAllReviews();

    // Filter by category
    if (selectedCategory !== 'all') {
      reviews = reviews.filter(review => review.category === selectedCategory);
    }

    // Filter by search term
    if (searchTerm) {
      reviews = reviews.filter(review => 
        review.attractionName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        review.comment.toLowerCase().includes(searchTerm.toLowerCase()) ||
        review.user.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Sort reviews
    reviews.sort((a, b) => {
      switch(sortBy) {
        case 'recent':
          return new Date(b.dateAdded || '2024-01-01') - new Date(a.dateAdded || '2024-01-01');
        case 'rating-high':
          return b.rating - a.rating;
        case 'rating-low':
          return a.rating - b.rating;
        case 'helpful':
          return 0; // Remove helpful sorting since we removed the feature
        default:
          return 0;
      }
    });

    return reviews;
  };

  // Get paginated reviews
  const getPaginatedReviews = () => {
    const filteredReviews = getFilteredReviews();
    const indexOfLastReview = currentPage * reviewsPerPage;
    const indexOfFirstReview = indexOfLastReview - reviewsPerPage;
    return filteredReviews.slice(indexOfFirstReview, indexOfLastReview);
  };

  // Calculate pagination info
  const getPaginationInfo = () => {
    const filteredReviews = getFilteredReviews();
    const totalReviews = filteredReviews.length;
    const totalPages = Math.ceil(totalReviews / reviewsPerPage);
    const startIndex = (currentPage - 1) * reviewsPerPage + 1;
    const endIndex = Math.min(currentPage * reviewsPerPage, totalReviews);
    
    return { totalReviews, totalPages, startIndex, endIndex };
  };

  const categories = ['all', ...new Set(attractions.map(attr => attr.category))];
  const filteredReviews = getFilteredReviews();
  const paginatedReviews = getPaginatedReviews();
  const paginationInfo = getPaginationInfo();

  // Pagination component
  const PaginationControls = () => {
    if (paginationInfo.totalPages <= 1) return null;

    const items = [];
    const maxVisiblePages = 5;
    
    // Calculate which pages to show
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(paginationInfo.totalPages, startPage + maxVisiblePages - 1);
    
    // Adjust if we're near the end
    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    // Previous button
    items.push(
      <Pagination.Prev 
        key="prev"
        disabled={currentPage === 1}
        onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
      />
    );

    // First page if not visible
    if (startPage > 1) {
      items.push(
        <Pagination.Item key={1} onClick={() => setCurrentPage(1)}>
          1
        </Pagination.Item>
      );
      if (startPage > 2) {
        items.push(<Pagination.Ellipsis key="ellipsis1" />);
      }
    }

    // Page numbers
    for (let page = startPage; page <= endPage; page++) {
      items.push(
        <Pagination.Item
          key={page}
          active={page === currentPage}
          onClick={() => setCurrentPage(page)}
        >
          {page}
        </Pagination.Item>
      );
    }

    // Last page if not visible
    if (endPage < paginationInfo.totalPages) {
      if (endPage < paginationInfo.totalPages - 1) {
        items.push(<Pagination.Ellipsis key="ellipsis2" />);
      }
      items.push(
        <Pagination.Item 
          key={paginationInfo.totalPages} 
          onClick={() => setCurrentPage(paginationInfo.totalPages)}
        >
          {paginationInfo.totalPages}
        </Pagination.Item>
      );
    }

    // Next button
    items.push(
      <Pagination.Next 
        key="next"
        disabled={currentPage === paginationInfo.totalPages}
        onClick={() => setCurrentPage(prev => Math.min(paginationInfo.totalPages, prev + 1))}
      />
    );

    return (
      <div className="d-flex justify-content-center align-items-center mt-4">
        <Pagination className="mb-0">{items}</Pagination>
      </div>
    );
  };

  return (
    <div style={{ backgroundColor: '#f8f9fa', minHeight: '100vh', paddingBottom: '80px' }}>
      {/* Hero Section */}
      <div style={{ 
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
        padding: '80px 0 60px'
      }}>
        <Container>
          <Row className="align-items-center">
            <Col lg={8}>
              <h1 className="display-4 fw-bold mb-4">Reviews & Ratings</h1>
              <p className="fs-5 mb-4 opacity-90" style={{ lineHeight: 1.6 }}>
                Read authentic reviews from fellow travelers and share your own experiences 
                to help others plan their perfect NYC adventure.
              </p>
              <Button 
                variant="light" 
                size="lg"
                onClick={() => setShowAddReview(true)}
                className="d-flex align-items-center px-4 py-3"
                style={{ borderRadius: '12px', fontWeight: '600' }}
              >
                <PlusCircle size={20} className="me-2" />
                Write a Review
              </Button>
            </Col>
            <Col lg={4} className="text-center">
              <div className="d-flex justify-content-center gap-4">
                <div className="text-center">
                  <div className="h2 fw-bold mb-0">{filteredReviews.length}</div>
                  <small style={{ opacity: 0.8 }}>Total Reviews</small>
                </div>
                <div className="text-center">
                  <div className="h2 fw-bold mb-0">
                    {filteredReviews.length > 0 
                      ? (filteredReviews.reduce((sum, r) => sum + r.rating, 0) / filteredReviews.length).toFixed(1)
                      : '0.0'
                    }
                  </div>
                  <small style={{ opacity: 0.8 }}>Average Rating</small>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>

      <Container className="py-5">
        {/* Search and Filters */}
        <Card className="border-0 shadow-sm mb-4" style={{ borderRadius: '16px' }}>
          <Card.Body className="p-4">
            <Row className="g-4 align-items-end">
              <Col lg={4}>
                <Form.Label htmlFor="review-search" className="fw-semibold text-dark mb-2">
                  Search Reviews
                </Form.Label>
                <div className="position-relative">
                  <Form.Control
                    id="review-search"
                    type="text"
                    placeholder="Search by attraction, reviewer, or comment..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="ps-5"
                    style={{ borderRadius: '10px' }}
                  />
                  <Search 
                    className="position-absolute text-muted" 
                    style={{ left: '15px', top: '50%', transform: 'translateY(-50%)' }}
                    size={16}
                  />
                </div>
              </Col>
              
              <Col lg={3}>
                <Form.Label htmlFor="category-filter" className="fw-semibold text-dark mb-2">
                  <Filter size={16} className="me-2" />
                  Category
                </Form.Label>
                <Form.Select
                  id="category-filter"
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  style={{ borderRadius: '10px' }}
                >
                  {categories.map(category => (
                    <option key={category} value={category}>
                      {category === 'all' ? 'All Categories' : category}
                    </option>
                  ))}
                </Form.Select>
              </Col>

              <Col lg={3}>
                <Form.Label htmlFor="sort-select" className="fw-semibold text-dark mb-2">
                  <SortDown size={16} className="me-2" />
                  Sort By
                </Form.Label>
                <Form.Select
                  id="sort-select"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  style={{ borderRadius: '10px' }}
                >
                  <option value="recent">Most Recent</option>
                  <option value="rating-high">Highest Rating</option>
                  <option value="rating-low">Lowest Rating</option>
                </Form.Select>
              </Col>

              <Col lg={2}>
                <Button
                  variant="outline-primary"
                  className="w-100"
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedCategory('all');
                    setSortBy('recent');
                  }}
                  style={{ borderRadius: '10px' }}
                >
                  Clear Filters
                </Button>
              </Col>
            </Row>

            {/* Active filters display */}
            {(searchTerm || selectedCategory !== 'all') && (
              <Row className="mt-3">
                <Col>
                  <div className="d-flex align-items-center gap-2 flex-wrap">
                    <small className="text-muted fw-semibold">Active filters:</small>
                    {searchTerm && (
                      <Badge bg="primary" className="d-flex align-items-center gap-2">
                        Search: "{searchTerm}"
                        <button 
                          className="btn-close btn-close-white"
                          style={{ fontSize: '0.6rem' }}
                          onClick={() => setSearchTerm('')}
                          aria-label="Clear search filter"
                        />
                      </Badge>
                    )}
                    {selectedCategory !== 'all' && (
                      <Badge bg="success" className="d-flex align-items-center gap-2">
                        {selectedCategory}
                        <button 
                          className="btn-close btn-close-white"
                          style={{ fontSize: '0.6rem' }}
                          onClick={() => setSelectedCategory('all')}
                          aria-label="Clear category filter"
                        />
                      </Badge>
                    )}
                  </div>
                </Col>
              </Row>
            )}
          </Card.Body>
        </Card>

        {/* Results Summary */}
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div>
            <h2 className="h3 fw-bold text-dark mb-1">
              {filteredReviews.length} Review{filteredReviews.length !== 1 ? 's' : ''}
            </h2>
            <p className="text-muted mb-0">
              {selectedCategory !== 'all' && `in ${selectedCategory} • `}
              Sorted by {sortBy.replace('-', ' ')}
              {paginationInfo.totalReviews > 0 && (
                <span> • Showing {paginationInfo.startIndex}-{paginationInfo.endIndex} of {paginationInfo.totalReviews}</span>
              )}
            </p>
          </div>
          
          <Button
            variant="primary"
            onClick={() => setShowAddReview(true)}
            className="d-flex align-items-center"
            style={{ borderRadius: '10px' }}
          >
            <PlusCircle size={16} className="me-2" />
            Add Review
          </Button>
        </div>

        {/* Reviews Display */}
        {paginatedReviews.length > 0 ? (
          <>
            <Row className="g-4">
              {paginatedReviews.map((review) => (
                <Col key={review.id} lg={12}>
                  <ReviewCard 
                    review={review}
                    onDelete={review.isUserReview ? () => setShowDeleteConfirm(review.id) : null}
                  />
                </Col>
              ))}
            </Row>
            
            {/* Pagination Controls */}
            <PaginationControls />
            
            {/* Pagination Summary */}
            {paginationInfo.totalPages > 1 && (
              <div className="text-center mt-3">
                <small className="text-muted">
                  Page {currentPage} of {paginationInfo.totalPages} 
                  ({paginationInfo.startIndex}-{paginationInfo.endIndex} of {paginationInfo.totalReviews} reviews)
                </small>
              </div>
            )}
          </>
        ) : (
          <Card className="border-0 shadow-sm text-center py-5" style={{ borderRadius: '16px' }}>
            <Card.Body>
              <div className="mb-4" style={{ fontSize: '4rem', opacity: 0.3 }}>📝</div>
              <h3 className="fw-bold text-dark mb-3">No reviews found</h3>
              <p className="text-muted fs-5 mb-4">
                {searchTerm || selectedCategory !== 'all' 
                  ? "Try adjusting your search or filter criteria"
                  : "Be the first to share your experience!"
                }
              </p>
              <Button
                variant="primary"
                size="lg"
                onClick={() => setShowAddReview(true)}
                style={{ borderRadius: '12px' }}
              >
                <PlusCircle size={20} className="me-2" />
                Write the First Review
              </Button>
            </Card.Body>
          </Card>
        )}
      </Container>

      {/* Add Review Modal */}
      <AddReviewModal
        show={showAddReview}
        onHide={() => setShowAddReview(false)}
        attractions={attractions}
        onAddReview={handleAddReview}
      />

      {/* Delete Confirmation Modal */}
      <Modal show={!!showDeleteConfirm} onHide={() => setShowDeleteConfirm(null)} centered>
        <Modal.Header closeButton>
          <Modal.Title className="d-flex align-items-center">
            <ExclamationTriangle className="text-warning me-2" size={24} />
            Confirm Delete
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p className="mb-0">Are you sure you want to delete this review? This action cannot be undone.</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteConfirm(null)}>
            Cancel
          </Button>
          <Button 
            variant="danger" 
            onClick={() => handleDeleteReview(showDeleteConfirm)}
            className="d-flex align-items-center"
          >
            <Trash3 size={16} className="me-2" />
            Delete Review
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

// Individual Review Card Component
const ReviewCard = ({ review, onDelete }) => {
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

  const RatingDisplay = ({ rating }) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        i <= rating ? 
          <StarFill key={i} className="text-warning" size={16} /> : 
          <Star key={i} className="text-muted" size={16} />
      );
    }
    return <div className="d-flex align-items-center">{stars}</div>;
  };

  return (
    <Card className="border-0 shadow-sm mb-3" style={{ borderRadius: '16px' }}>
      <Card.Body className="p-4">
        <div className="d-flex align-items-start mb-3">
          <div 
            className="bg-primary rounded-circle d-flex align-items-center justify-content-center me-3"
            style={{ width: '48px', height: '48px', minWidth: '48px' }}
          >
            <Person className="text-white" size={24} />
          </div>
          <div className="flex-grow-1">
            <div className="d-flex align-items-center justify-content-between mb-2">
              <div>
                <h6 className="mb-1 fw-bold">{review.user}</h6>
                <div className="d-flex align-items-center gap-2">
                  <Badge 
                    bg={review.isUserReview ? "success" : "light"} 
                    text={review.isUserReview ? "white" : "dark"}
                    className="small"
                  >
                    {review.isUserReview ? "Your Review" : "Verified Traveler"}
                  </Badge>
                  <small className="text-muted d-flex align-items-center">
                    <Calendar size={12} className="me-1" />
                    {getTimeAgo()}
                  </small>
                </div>
              </div>
              {onDelete && (
                <Button
                  variant="outline-danger"
                  size="sm"
                  onClick={onDelete}
                  className="d-flex align-items-center"
                  style={{ borderRadius: '8px' }}
                >
                  <Trash3 size={14} className="me-2" />
                  Delete
                </Button>
              )}
            </div>
            
            <div className="d-flex align-items-center mb-3">
              <RatingDisplay rating={review.rating} />
              <span className="mx-2">•</span>
              <Badge bg="primary" className="small">
                {review.attractionName}
              </Badge>
            </div>
            
            <p className="text-dark mb-0" style={{ lineHeight: '1.6' }}>
              {review.comment}
            </p>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
  };

// Add Review Modal Component
const AddReviewModal = ({ show, onHide, attractions, onAddReview }) => {
  const [selectedAttraction, setSelectedAttraction] = useState('');
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [userName, setUserName] = useState('');
  const [hoverRating, setHoverRating] = useState(0);
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    
    if (!userName.trim()) newErrors.userName = 'Name is required';
    if (!selectedAttraction) newErrors.selectedAttraction = 'Please select an attraction';
    if (!comment.trim()) newErrors.comment = 'Review comment is required';
    if (comment.trim().length < 10) newErrors.comment = 'Review must be at least 10 characters';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    const attraction = attractions.find(attr => attr.id === parseInt(selectedAttraction));
    
    const reviewData = {
      user: userName.trim(),
      rating: rating,
      comment: comment.trim(),
      attractionId: parseInt(selectedAttraction),
      attractionName: attraction.name,
      category: attraction.category
    };
    
    onAddReview(reviewData);
    
    // Reset form
    setSelectedAttraction('');
    setRating(5);
    setComment('');
    setUserName('');
    setErrors({});
    onHide();
  };

  const RatingStars = ({ rating, onRatingChange, onHover, onLeave }) => (
    <div className="d-flex align-items-center">
      {[1, 2, 3, 4, 5].map(star => (
        <Button
          key={star}
          variant="link"
          className="p-1"
          onClick={() => onRatingChange(star)}
          onMouseEnter={() => onHover(star)}
          onMouseLeave={onLeave}
          style={{ lineHeight: 1 }}
        >
          {star <= (hoverRating || rating) ? 
            <StarFill className="text-warning" size={28} /> : 
            <Star className="text-muted" size={28} />
          }
        </Button>
      ))}
      <span className="ms-3 fw-semibold">
        ({hoverRating || rating} star{(hoverRating || rating) !== 1 ? 's' : ''})
      </span>
    </div>
  );

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
                <Form.Label htmlFor="reviewer-name">Your Name *</Form.Label>
                <Form.Control
                  id="reviewer-name"
                  type="text"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  placeholder="Enter your name"
                  isInvalid={!!errors.userName}
                  style={{ borderRadius: '8px' }}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.userName}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label htmlFor="attraction-select">Select Attraction *</Form.Label>
                <Form.Select
                  id="attraction-select"
                  value={selectedAttraction}
                  onChange={(e) => setSelectedAttraction(e.target.value)}
                  isInvalid={!!errors.selectedAttraction}
                  style={{ borderRadius: '8px' }}
                >
                  <option value="">Choose an attraction...</option>
                  {attractions.map(attraction => (
                    <option key={attraction.id} value={attraction.id}>
                      {attraction.name} ({attraction.category})
                    </option>
                  ))}
                </Form.Select>
                <Form.Control.Feedback type="invalid">
                  {errors.selectedAttraction}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>
          
          <Form.Group className="mb-3">
            <Form.Label>Rating *</Form.Label>
            <RatingStars
              rating={rating}
              onRatingChange={setRating}
              onHover={setHoverRating}
              onLeave={() => setHoverRating(0)}
            />
          </Form.Group>
          
          <Form.Group className="mb-3">
            <Form.Label htmlFor="review-comment">Your Review *</Form.Label>
            <Form.Control
              id="review-comment"
              as="textarea"
              rows={4}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Share your experience with this attraction... What did you like? Any tips for other visitors?"
              isInvalid={!!errors.comment}
              style={{ borderRadius: '8px' }}
            />
            <Form.Control.Feedback type="invalid">
              {errors.comment}
            </Form.Control.Feedback>
            <Form.Text className="text-muted">
              Minimum 10 characters. Be specific about what you liked or didn't like.
            </Form.Text>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onHide}>
            Cancel
          </Button>
          <Button variant="primary" type="submit">
            <PlusCircle size={16} className="me-2" />
            Submit Review
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default ReviewsPage;