import React from 'react';
import {
  Container,
  Row,
  Col,
  Button,
  Badge,
  Card,
  Form
} from 'react-bootstrap';
import { Calendar, Download, Share2, Route } from 'lucide-react';
import ItineraryItem from '../Itinerary/itineraryItem';

const ItineraryPage = ({
  itinerary,
  removeFromItinerary,
  notes,
  updateNotes,
  itineraryName,
  setItineraryName,
  selectedDate,
  setSelectedDate,
  setCurrentPage
}) => {
  const calculateTotalTime = () => {
    return itinerary.reduce((total, attraction) => {
      const duration = parseInt(attraction.duration.split('-')[1] || attraction.duration.split('-')[0]);
      return total + duration;
    }, 0);
  };

  const exportItinerary = () => {
    const itineraryData = {
      name: itineraryName,
      date: selectedDate,
      attractions: itinerary.map(attraction => ({
        ...attraction,
        notes: notes[attraction.id] || ''
      })),
      totalTime: calculateTotalTime()
    };

    const blob = new Blob([JSON.stringify(itineraryData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${itineraryName.replace(/\s+/g, '_')}_itinerary.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const shareItinerary = () => {
    if (navigator.share) {
      navigator.share({
        title: itineraryName,
        text: `Check out my NYC itinerary with ${itinerary.length} attractions!`,
        url: window.location.href
      });
    } else {
      const shareText = `${itineraryName}\n\nMy NYC Itinerary:\n${itinerary.map((attr, index) => `${index + 1}. ${attr.name}`).join('\n')}`;
      navigator.clipboard.writeText(shareText);
      alert('Itinerary copied to clipboard!');
    }
  };

  return (
    <Container fluid className="px-0 py-0" style={{minHeight: '100vh'}}>
      <Row className="g-0" style={{minHeight: '100vh'}}>
        <Col className="px-4 py-4">
          <div className="mb-4">
            <h1 className="display-5 fw-bold text-dark mb-3">Build Your Itinerary</h1>
            <p className="lead text-muted">
              Plan your perfect NYC adventure by organizing your favorite attractions into a personalized itinerary.
            </p>
          </div>

          <Row className="mb-4">
            <Col md={6}>
              <Form.Group controlId="itineraryName" className="mb-3">
                <Form.Label className="fw-bold">Itinerary Name</Form.Label>
                <Form.Control
                  type="text"
                  value={itineraryName}
                  onChange={(e) => setItineraryName(e.target.value)}
                  placeholder="My NYC Adventure"
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="visitDate" className="mb-3">
                <Form.Label className="fw-bold">Visit Date</Form.Label>
                <Form.Control
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                />
              </Form.Group>
            </Col>
          </Row>

          <div className="d-flex flex-wrap gap-2 mb-4">
            <Badge bg="primary" className="fs-6 px-3 py-2">
              {itinerary.length} attractions
            </Badge>
            <Badge bg="success" className="fs-6 px-3 py-2">
              ~{calculateTotalTime()} hours total
            </Badge>
            <Button 
              variant="outline-secondary" 
              size="sm"
              onClick={exportItinerary}
              disabled={itinerary.length === 0}
            >
              <Download size={16} className="me-1" /> Export
            </Button>
            <Button 
              variant="outline-primary" 
              size="sm"
              onClick={shareItinerary}
              disabled={itinerary.length === 0}
            >
              <Share2 size={16} className="me-1" /> Share
            </Button>
          </div>

          {itinerary.length === 0 ? (
            <Card className="text-center py-5 bg-light border-0">
              <Card.Body>
                <Calendar size={64} className="text-muted mb-3" />
                <h4 className="text-muted mb-2">No attractions added yet</h4>
                <p className="text-muted mb-4">
                  Browse attractions to start building your perfect NYC itinerary!
                </p>
                <Button 
                  variant="primary" 
                  size="lg"
                  onClick={() => setCurrentPage('attractions')}
                >
                  Browse Attractions
                </Button>
              </Card.Body>
            </Card>
          ) : (
            <>
              <div className="mb-4">
                <h3 className="mb-3">Your Itinerary</h3>
                {itinerary.map((attraction, index) => (
                  <ItineraryItem
                    key={attraction.id}
                    attraction={attraction}
                    index={index}
                    onRemove={removeFromItinerary}
                    notes={notes}
                    onNotesChange={updateNotes}
                  />
                ))}
              </div>

              <Card className="bg-light border-0">
                <Card.Body>
                  <Row>
                    <Col md={8}>
                      <h5 className="mb-3 text-primary">
                        <Route size={24} className="me-2" />
                        Optimized Route
                      </h5>
                      <p className="text-muted mb-2">
                        Route optimization considers travel time and proximity between attractions to help you make the most of your visit.
                      </p>
                      <div className="alert alert-info border-0 mb-0">
                        <strong>💡 Pro Tips:</strong>
                        <ul className="mb-0 mt-2">
                          <li>Visit outdoor attractions like Central Park and Brooklyn Bridge during good weather</li>
                          <li>Save indoor attractions like museums for rainy days</li>
                          <li>Start early to avoid crowds at popular destinations</li>
                          <li>Allow extra time for transportation between distant attractions</li>
                        </ul>
                      </div>
                    </Col>
                    <Col md={4} className="text-center">
                      <div className="bg-white rounded p-3 shadow-sm">
                        <h6 className="text-muted">Total Estimated Time</h6>
                        <h2 className="text-primary mb-0">{calculateTotalTime()}</h2>
                        <small className="text-muted">hours</small>
                      </div>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            </>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default ItineraryPage;