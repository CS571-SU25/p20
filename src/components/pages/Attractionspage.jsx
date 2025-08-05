import React, { useState } from 'react';
import { Container, Row, Col, Card, Button, Form, InputGroup, Badge } from 'react-bootstrap';
import { Search, SortAlphaDown, Grid3x3Gap, List, Star } from 'react-bootstrap-icons';
import AttractionCard from '../Attractions/AttractionCard';

const AttractionsPage = ({ 
  attractions, 
  itinerary, 
  addToItinerary, 
  removeFromItinerary,
  setSelectedAttraction, 
  searchTerm, 
  setSearchTerm, 
  selectedCategory, 
  setSelectedCategory 
}) => {
  const [viewMode, setViewMode] = useState('grid');
  const [sortBy, setSortBy] = useState('name');
  
  const categories = ['all', ...new Set(attractions.map(a => a.category))];
  
  let filteredAttractions = attractions.filter(attraction => {
    const matchesSearch = attraction.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         attraction.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || attraction.category.toLowerCase() === selectedCategory.toLowerCase();
    return matchesSearch && matchesCategory;
  });

  // Sort attractions
  filteredAttractions.sort((a, b) => {
    switch(sortBy) {
      case 'name': return a.name.localeCompare(b.name);
      case 'rating': return b.rating - a.rating;
      case 'duration': return parseInt(a.duration) - parseInt(b.duration);
      default: return 0;
    }
  });

  const getCategoryCount = (category) => {
    if (category === 'all') return attractions.length;
    return attractions.filter(attr => attr.category.toLowerCase() === category.toLowerCase()).length;
  };

  return (
    <div style={{ backgroundColor: '#f8f9fa', minHeight: '100vh', paddingBottom: '80px' }}>
      <Container fluid className="px-0">
        {/* Modern Hero Section */}
        <div style={{ 
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white',
          padding: '60px 0'
        }}>
          <Container>
            <Row className="align-items-center">
              <Col lg={8}>
                <h1 className="display-4 fw-bold mb-3" style={{ letterSpacing: '-0.02em' }}>
                  Explore NYC
                </h1>
                <p className="fs-5 mb-4" style={{ opacity: 0.9, lineHeight: 1.6 }}>
                  Discover {attractions.length} handpicked attractions across the five boroughs. 
                  From world-famous landmarks to local favorites.
                </p>
                <div className="d-flex gap-4">
                  <div className="text-center">
                    <div className="h3 fw-bold mb-0">{attractions.length}</div>
                    <small style={{ opacity: 0.8 }}>Attractions</small>
                  </div>
                  <div className="text-center">
                    <div className="h3 fw-bold mb-0">{categories.length - 1}</div>
                    <small style={{ opacity: 0.8 }}>Categories</small>
                  </div>
                  <div className="text-center">
                    <div className="h3 fw-bold mb-0">{itinerary.length}</div>
                    <small style={{ opacity: 0.8 }}>In Itinerary</small>
                  </div>
                </div>
              </Col>
            </Row>
          </Container>
        </div>

        <Container className="py-4">
          {/* Search and Controls */}
          <Card className="border-0 shadow-sm mb-4" style={{ borderRadius: '12px' }}>
            <Card.Body className="p-4">
              <Row className="g-4">
                <Col lg={5}>
                  <Form.Label className="fw-semibold text-dark mb-2">Search</Form.Label>
                  <InputGroup size="lg">
                    <InputGroup.Text 
                      className="border-end-0" 
                      style={{ backgroundColor: '#f8f9fa', border: '1px solid #dee2e6' }}
                    >
                      <Search size={18} className="text-muted" />
                    </InputGroup.Text>
                    <Form.Control
                      type="text"
                      placeholder="Search attractions..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="border-start-0"
                      style={{ fontSize: '1rem' }}
                    />
                  </InputGroup>
                </Col>
                
                <Col lg={3}>
                  <Form.Label className="fw-semibold text-dark mb-2">Category</Form.Label>
                  <Form.Select 
                    size="lg"
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                  >
                    {categories.map(category => (
                      <option key={category} value={category}>
                        {category === 'all' ? 'All Categories' : category}
                      </option>
                    ))}
                  </Form.Select>
                </Col>

                <Col lg={2}>
                  <Form.Label className="fw-semibold text-dark mb-2">Sort By</Form.Label>
                  <Form.Select 
                    size="lg"
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                  >
                    <option value="name">Name</option>
                    <option value="rating">Rating</option>
                    <option value="duration">Duration</option>
                  </Form.Select>
                </Col>

                <Col lg={2} className="d-flex flex-column">
                  <Form.Label className="fw-semibold text-dark mb-2">View</Form.Label>
                  <div className="btn-group" role="group">
                    <Button
                      variant={viewMode === 'grid' ? 'primary' : 'outline-secondary'}
                      onClick={() => setViewMode('grid')}
                      className="flex-fill"
                    >
                      <Grid3x3Gap size={16} />
                    </Button>
                    <Button
                      variant={viewMode === 'list' ? 'primary' : 'outline-secondary'}
                      onClick={() => setViewMode('list')}
                      className="flex-fill"
                    >
                      <List size={16} />
                    </Button>
                  </div>
                </Col>
              </Row>

              {/* Active Filters */}
              {(searchTerm || selectedCategory !== 'all') && (
                <Row className="mt-3">
                  <Col>
                    <div className="d-flex align-items-center gap-2 flex-wrap">
                      <small className="text-muted fw-semibold">Active filters:</small>
                      {searchTerm && (
                        <Badge 
                          bg="primary" 
                          className="d-flex align-items-center gap-2"
                          style={{ fontSize: '0.8rem' }}
                        >
                          Search: "{searchTerm}"
                          <button 
                            className="btn-close btn-close-white"
                            style={{ fontSize: '0.6rem' }}
                            onClick={() => setSearchTerm('')}
                          />
                        </Badge>
                      )}
                      {selectedCategory !== 'all' && (
                        <Badge 
                          bg="success" 
                          className="d-flex align-items-center gap-2"
                          style={{ fontSize: '0.8rem' }}
                        >
                          {selectedCategory}
                          <button 
                            className="btn-close btn-close-white"
                            style={{ fontSize: '0.6rem' }}
                            onClick={() => setSelectedCategory('all')}
                          />
                        </Badge>
                      )}
                      <Button
                        variant="link"
                        size="sm"
                        className="p-0 text-decoration-none"
                        onClick={() => {
                          setSearchTerm('');
                          setSelectedCategory('all');
                        }}
                      >
                        Clear all
                      </Button>
                    </div>
                  </Col>
                </Row>
              )}
            </Card.Body>
          </Card>

          {/* Results Summary */}
          <div className="d-flex justify-content-between align-items-center mb-4">
            <div>
              <h2 className="fw-bold text-dark mb-1">
                {filteredAttractions.length} Result{filteredAttractions.length !== 1 ? 's' : ''}
              </h2>
              <p className="text-muted mb-0">
                {selectedCategory !== 'all' && `in ${selectedCategory} • `}
                Sorted by {sortBy}
              </p>
            </div>
            {filteredAttractions.length > 0 && (
              <div className="d-flex align-items-center gap-2 text-muted">
                <SortAlphaDown size={16} />
                <small>Sorted by {sortBy}</small>
              </div>
            )}
          </div>

          {/* Attractions Display */}
          {filteredAttractions.length > 0 ? (
            <Row xs={1} md={2} lg={viewMode === 'grid' ? 3 : 2} xl={viewMode === 'grid' ? 4 : 2} className="g-4">
              {filteredAttractions.map(attraction => (
                <Col key={attraction.id}>
                  <AttractionCard
                    attraction={attraction}
                    onAddToItinerary={addToItinerary}
                    onRemoveFromItinerary={removeFromItinerary}
                    isInItinerary={itinerary.some(item => item.id === attraction.id)}
                    onViewDetails={setSelectedAttraction}
                  />
                </Col>
              ))}
            </Row>
          ) : (
            <Card className="border-0 shadow-sm text-center py-5" style={{ borderRadius: '12px' }}>
              <Card.Body>
                <Search size={64} className="text-muted mb-4" style={{ opacity: 0.3 }} />
                <h4 className="fw-bold text-dark mb-3">No attractions match your search</h4>
                <p className="text-muted mb-4 fs-5">
                  Try adjusting your search terms or category filter
                </p>
                <Button
                  variant="primary"
                  size="lg"
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedCategory('all');
                  }}
                  style={{ borderRadius: '8px' }}
                >
                  Reset Filters
                </Button>
              </Card.Body>
            </Card>
          )}
        </Container>
      </Container>
    </div>
  );
};

export default AttractionsPage;