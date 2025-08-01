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
    <Container fluid className="px-4 py-4">
      <Row>
        <Col className="p-0">
          <Card className="shadow-sm mb-4 w-100">
            <Card.Body>
              <h1 className="mb-4">Build Your Itinerary</h1>

              <Row className="mb-4">
                <Col md={6}>
                  <Form.Group controlId="itineraryName">
                    <Form.Label>Itinerary Name</Form.Label>
                    <Form.Control
                      type="text"
                      value={itineraryName}
                      onChange={(e) => setItineraryName(e.target.value)}
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group controlId="visitDate">
                    <Form.Label>Visit Date</Form.Label>
                    <Form.Control
                      type="date"
                      value={selectedDate}
                      onChange={(e) => setSelectedDate(e.target.value)}
                    />
                  </Form.Group>
                </Col>
              </Row>

              <div className="d-flex flex-wrap gap-2 mb-4">
                <Badge bg="primary">{itinerary.length} attractions</Badge>
                <Badge bg="success">~{calculateTotalTime()} hours total</Badge>
                <Button variant="outline-secondary" onClick={exportItinerary}>
                  <Download size={16} className="me-1" /> Export
                </Button>
                <Button variant="outline-primary" onClick={shareItinerary}>
                  <Share2 size={16} className="me-1" /> Share
                </Button>
              </div>

              {itinerary.length === 0 ? (
                <div className="text-center py-5">
                  <Calendar size={48} className="text-muted mb-3" />
                  <p className="text-muted fs-5">No attractions added yet</p>
                  <p className="text-muted">Browse attractions to start building your itinerary!</p>
                  <Button variant="primary" onClick={() => setCurrentPage('attractions')}>
                    Browse Attractions
                  </Button>
                </div>
              ) : (
                <>
                  <div className="mb-4">
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

                  <Card className="bg-light">
                    <Card.Body>
                      <h5 className="mb-3">Optimized Route</h5>
                      <div className="d-flex align-items-center text-muted mb-2">
                        <Route size={16} className="me-2" />
                        <small>Route optimization considers travel time and proximity between attractions</small>
                      </div>
                      <small className="text-muted">
                        💡 <strong>Pro Tips:</strong> Visit outdoor attractions like Central Park and Brooklyn Bridge during good weather, 
                        and save indoor attractions like museums for rainy days. Start early to avoid crowds!
                      </small>
                    </Card.Body>
                  </Card>
                </>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default ItineraryPage;
