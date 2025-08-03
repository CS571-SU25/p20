import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { Search } from 'lucide-react';
import SearchFilterBar from '../UI/SearchFilterBar';
import AttractionCard from '../Attractions/AttractionCard';

// Add the getAttractionImage function here
const getAttractionImage = (attractionName) => {
  const imageMap = {
    // Using Unsplash search URLs for specific landmarks
    'Central Park': 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=400&h=300&fit=crop&q=80',
    'Statue of Liberty': 'https://images.unsplash.com/photo-1605832449-a7c56d8d4a7c?w=400&h=300&fit=crop&q=80',
    'Times Square': 'https://images.unsplash.com/photo-1485738422979-f5c462d49f74?w=400&h=300&fit=crop&q=80',
    'Empire State Building': 'https://images.unsplash.com/photo-1605038940908-b7b3c29db51b?w=400&h=300&fit=crop&q=80',
    'Brooklyn Bridge': 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop&q=80',
    'One World Trade Center': 'https://images.unsplash.com/photo-1500916434205-0c77489c6cf7?w=400&h=300&fit=crop&q=80',
    'High Line': 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop&q=80',
    'Top of the Rock': 'https://images.unsplash.com/photo-1500676158375-6a44ce8b4516?w=400&h=300&fit=crop&q=80',
    'Chrysler Building': 'https://images.unsplash.com/photo-1499092346589-b9b6be3e94b2?w=400&h=300&fit=crop&q=80',
    'Rockefeller Center': 'https://images.unsplash.com/photo-1518391846015-55a9cc003b25?w=400&h=300&fit=crop&q=80',
    'Flatiron Building': 'https://images.unsplash.com/photo-1568515387631-8b650bbcdb90?w=400&h=300&fit=crop&q=80',
    'Grand Central Terminal': 'https://images.unsplash.com/photo-1520940014165-2dc5a066ac84?w=400&h=300&fit=crop&q=80',
    'Wall Street': 'https://images.unsplash.com/photo-1541336032412-2048a678540d?w=400&h=300&fit=crop&q=80',
    'Staten Island Ferry': 'https://images.unsplash.com/photo-1518391846015-55a9cc003b25?w=400&h=300&fit=crop&q=80',
    
    // Museums
    'Metropolitan Museum of Art': 'https://images.unsplash.com/photo-1551775313-7f2ad2c5a0b7?w=400&h=300&fit=crop&q=80',
    'Museum of Modern Art': 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop&q=80',
    'American Museum of Natural History': 'https://images.unsplash.com/photo-1518391846015-55a9cc003b25?w=400&h=300&fit=crop&q=80',
    'Guggenheim Museum': 'https://images.unsplash.com/photo-1555436169-e8d4cf13d2b3?w=400&h=300&fit=crop&q=80',
    '9/11 Memorial & Museum': 'https://images.unsplash.com/photo-1539037116277-4db20889f2d4?w=400&h=300&fit=crop&q=80',
    
    // Entertainment & Neighborhoods
    'Broadway Theater District': 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop&q=80',
    'Madison Square Garden': 'https://images.unsplash.com/photo-1531537571171-a707bf2683da?w=400&h=300&fit=crop&q=80',
    'Coney Island': 'https://images.unsplash.com/photo-1544960503-7ad531ac50d0?w=400&h=300&fit=crop&q=80',
    'Little Italy': 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400&h=300&fit=crop&q=80',
    'Chinatown': 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=400&h=300&fit=crop&q=80',
    'SoHo': 'https://images.unsplash.com/photo-1534430480872-3498386e7856?w=400&h=300&fit=crop&q=80',
    'Greenwich Village': 'https://images.unsplash.com/photo-1536431311719-398b6704d4cc?w=400&h=300&fit=crop&q=80'
  };
  
  // Debug: Check what names you're getting
  console.log('Searching for image:', attractionName);
  
  // Try exact match first
  if (imageMap[attractionName]) {
    console.log('Found exact match!');
    return imageMap[attractionName];
  }
  
  // Try partial match (case insensitive)
  const partialMatch = Object.keys(imageMap).find(key => 
    attractionName.toLowerCase().includes(key.toLowerCase()) ||
    key.toLowerCase().includes(attractionName.toLowerCase())
  );
  
  if (partialMatch) {
    console.log('Found partial match:', partialMatch);
    return imageMap[partialMatch];
  }
  
  console.log('No match found, using default');
  // Default NYC skyline
  return 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=400&h=300&fit=crop&q=80';
};

const AttractionsPage = ({ 
  attractions, 
  itinerary, 
  addToItinerary, 
  setSelectedAttraction, 
  searchTerm, 
  setSearchTerm, 
  selectedCategory, 
  setSelectedCategory 
}) => {
  const categories = ['all', ...new Set(attractions.map(a => a.category))];
  
  const filteredAttractions = attractions.filter(attraction => {
    const matchesSearch = attraction.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         attraction.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || attraction.category.toLowerCase() === selectedCategory.toLowerCase();
    return matchesSearch && matchesCategory;
  });

  return (
    <Container fluid className="px-4 py-4">
      <Row>
        <Col>
          <div className="mb-4">
            <h1 className="display-5 fw-bold text-dark mb-3">All Attractions</h1>
            <p className="lead text-muted mb-4">
              Explore all {attractions.length} amazing attractions in New York City. Use the search and filter tools to find exactly what you're looking for.
            </p>
            
            <SearchFilterBar
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              categories={categories}
            />
          </div>

          <div className="mb-3">
            <p className="text-muted small">
              Showing {filteredAttractions.length} of {attractions.length} attractions
              {selectedCategory !== 'all' && (
                <span className="ms-2">
                  in <span className="fw-medium">{selectedCategory}</span>
                </span>
              )}
            </p>
          </div>

          <Row xs={1} md={2} lg={3} xl={4} className="g-4">
            {filteredAttractions.map(attraction => (
              <Col key={attraction.id}>
                <AttractionCard
                  attraction={{
                    ...attraction,
                    image: attraction.image || getAttractionImage(attraction.name)
                  }}
                  onAddToItinerary={addToItinerary}
                  isInItinerary={itinerary.some(item => item.id === attraction.id)}
                  onViewDetails={setSelectedAttraction}
                />
              </Col>
            ))}
          </Row>

          {filteredAttractions.length === 0 && (
            <Card className="text-center py-5 mt-5">
              <Card.Body>
                <Search size={64} className="text-muted mb-3" />
                <h4 className="text-muted mb-2">No attractions found matching your criteria</h4>
                <p className="text-muted mb-4">Try adjusting your search terms or filters</p>
                <Button
                  variant="primary"
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedCategory('all');
                  }}
                >
                  Clear All Filters
                </Button>
              </Card.Body>
            </Card>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default AttractionsPage;