import React from 'react';
import { Container, Row, Col, Button, Badge, Card, Form } from 'react-bootstrap';
import { Calendar, Download, Share, Signpost, Clock, Plus } from 'react-bootstrap-icons';
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
    <div style={{ backgroundColor: '#f8f9fa', minHeight: '100vh', paddingBottom: '80px' }}>
      {/* Hero Section */}
      <div style={{ 
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
        padding: '60px 0'
      }}>
        <Container>
          <Row className="align-items-center">
            <Col lg={8}>
              <h1 className="display-4 fw-bold mb-3">Your NYC Itinerary</h1>
              <p className="fs-5 mb-0" style={{ opacity: 0.9 }}>
                Plan your perfect day with {itinerary.length} selected attractions
              </p>
            </Col>
            <Col lg={4} className="text-center">
              <div className="d-flex justify-content-center gap-4">
                <div className="text-center">
                  <div className="h2 fw-bold mb-0">{itinerary.length}</div>
                  <small style={{ opacity: 0.8 }}>Attractions</small>
                </div>
                <div className="text-center">
                  <div className="h2 fw-bold mb-0">{calculateTotalTime()}h</div>
                  <small style={{ opacity: 0.8 }}>Total Time</small>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>

      <Container className="py-5">
        {/* Controls Section */}
        <Card className="border-0 shadow-sm mb-4" style={{ borderRadius: '16px' }}>
          <Card.Body className="p-4">
            <Row className="g-4 align-items-end">
              <Col md={4}>
                <Form.Label htmlFor="itinerary-name" className="fw-bold text-dark mb-2">
                  Itinerary Name
                </Form.Label>
                <Form.Control
                  id="itinerary-name"
                  type="text"
                  value={itineraryName}
                  onChange={(e) => setItineraryName(e.target.value)}
                  className="form-control-lg"
                  style={{ borderRadius: '8px' }}
                />
              </Col>
              <Col md={3}>
                <Form.Label htmlFor="visit-date" className="fw-bold text-dark mb-2">
                  Visit Date
                </Form.Label>
                <Form.Control
                  id="visit-date"
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="form-control-lg"
                  style={{ borderRadius: '8px' }}
                />
              </Col>
              <Col md={5}>
                <div className="d-flex gap-2">
                  <Button
                    variant="outline-primary"
                    onClick={exportItinerary}
                    disabled={itinerary.length === 0}
                    className="d-flex align-items-center"
                    style={{ borderRadius: '8px' }}
                  >
                    <Download size={16} className="me-2" />
                    Export
                  </Button>
                  <Button
                    variant="outline-success"
                    onClick={shareItinerary}
                    disabled={itinerary.length === 0}
                    className="d-flex align-items-center"
                    style={{ borderRadius: '8px' }}
                  >
                    <Share size={16} className="me-2" />
                    Share
                  </Button>
                  <Button
                    variant="primary"
                    onClick={() => setCurrentPage('attractions')}
                    className="d-flex align-items-center"
                    style={{ borderRadius: '8px' }}
                  >
                    <Plus size={16} className="me-2" />
                    Add More
                  </Button>
                </div>
              </Col>
            </Row>
          </Card.Body>
        </Card>

        {itinerary.length === 0 ? (
          /* Empty State */
          <Card className="border-0 shadow-sm text-center py-5" style={{ borderRadius: '16px' }}>
            <Card.Body>
              <div className="mb-4" style={{ fontSize: '4rem', opacity: 0.3 }}>
                📋
              </div>
              <h3 className="fw-bold text-dark mb-3">Your itinerary is empty</h3>
              <p className="text-muted fs-5 mb-4">
                Start building your perfect NYC experience by adding attractions to your itinerary
              </p>
              <Button
                variant="primary"
                size="lg"
                onClick={() => setCurrentPage('attractions')}
                className="px-4 py-3"
                style={{ borderRadius: '12px' }}
              >
                <Plus size={20} className="me-2" />
                Browse Attractions
              </Button>
            </Card.Body>
          </Card>
        ) : (
          <Row className="g-4">
            {/* Itinerary Items */}
            <Col lg={8}>
              <div className="d-flex justify-content-between align-items-center mb-4">
                <h2 className="fw-bold text-dark mb-0">Your Plan</h2>
                <div className="d-flex align-items-center gap-3">
                  <Badge bg="primary" className="fs-6 px-3 py-2">
                    {itinerary.length} stops
                  </Badge>
                  <Badge bg="success" className="fs-6 px-3 py-2">
                    ~{calculateTotalTime()} hours
                  </Badge>
                </div>
              </div>

              {/* Drag Instructions */}
              <div className="alert alert-success d-flex align-items-center mb-4" style={{ borderRadius: '12px' }}>
                <Plus className="me-2" size={18} />
                <small>
                  <strong>Tip:</strong> Your attractions are listed in the order you added them. Perfect for planning your route!
                </small>
              </div>

              <div className="d-flex flex-column gap-4">
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
            </Col>

            {/* Sidebar */}
            <Col lg={4}>
              <div className="sticky-top" style={{ top: '100px' }}>
                {/* Summary Card */}
                <Card className="border-0 shadow-sm mb-4" style={{ borderRadius: '16px' }}>
                  <Card.Body className="p-4">
                    <h3 className="fw-bold text-dark mb-3">
                      <Signpost size={20} className="me-2 text-primary" />
                      Trip Summary
                    </h3>
                    <div className="mb-3">
                      <div className="d-flex justify-content-between align-items-center mb-2">
                        <span className="text-muted">Total Attractions:</span>
                        <span className="fw-bold">{itinerary.length}</span>
                      </div>
                      <div className="d-flex justify-content-between align-items-center mb-2">
                        <span className="text-muted">Estimated Time:</span>
                        <span className="fw-bold">{calculateTotalTime()} hours</span>
                      </div>
                      <div className="d-flex justify-content-between align-items-center">
                        <span className="text-muted">Visit Date:</span>
                        <span className="fw-bold">{new Date(selectedDate).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </Card.Body>
                </Card>

                {/* Tips Card */}
                <Card className="border-0 shadow-sm" style={{ borderRadius: '16px' }}>
                  <Card.Body className="p-4">
                    <h3 className="fw-bold text-dark mb-3">💡 Pro Tips</h3>
                    <div className="small text-muted">
                      <div className="mb-3">
                        <div className="fw-semibold text-dark mb-1">📝 Add Notes</div>
                        <p className="mb-0">Click the pencil icon to add personal reminders</p>
                      </div>
                      <div className="mb-3">
                        <div className="fw-semibold text-dark mb-1">🗑️ Delete Notes</div>
                        <p className="mb-0">Use the X button to remove notes completely</p>
                      </div>
                      <div className="mb-3">
                        <div className="fw-semibold text-dark mb-1">🎫 Book Tickets</div>
                        <p className="mb-0">Use the Book button to visit official websites</p>
                      </div>
                      <div>
                        <div className="fw-semibold text-dark mb-1">💾 Export & Share</div>
                        <p className="mb-0">Save your itinerary or share with friends</p>
                      </div>
                    </div>
                  </Card.Body>
                </Card>
              </div>
            </Col>
          </Row>
        )}
      </Container>
    </div>
  );
};

export default ItineraryPage;