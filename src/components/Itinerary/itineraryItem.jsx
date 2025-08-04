import React, { useState } from 'react';
import { Card, Button, Form, Row, Col, Badge, Modal } from 'react-bootstrap';
import { Clock, GeoAlt, Trash3, BoxArrowUpRight, PencilSquare, Eye, X } from 'react-bootstrap-icons';

const ItineraryItem = ({ attraction, index, onRemove, notes, onNotesChange }) => {
  const [isEditingNotes, setIsEditingNotes] = useState(false);
  const [showNotesModal, setShowNotesModal] = useState(false);
  const [tempNotes, setTempNotes] = useState(notes[attraction.id] || '');

  const currentNotes = notes[attraction.id] || '';
  const hasNotes = currentNotes.trim().length > 0;
  const isNotesLong = currentNotes.length > 100;

  const handleSaveNotes = () => {
    onNotesChange(attraction.id, tempNotes);
    setIsEditingNotes(false);
  };

  const handleCancelEdit = () => {
    setTempNotes(currentNotes);
    setIsEditingNotes(false);
  };

  const handleStartEdit = () => {
    setTempNotes(currentNotes);
    setIsEditingNotes(true);
  };

  const handleDeleteNotes = () => {
    onNotesChange(attraction.id, '');
    setIsEditingNotes(false);
  };

  const truncateText = (text, maxLength) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  return (
    <>
      <Card 
        className="border-0 shadow-sm mb-3 position-relative overflow-hidden"
        style={{ 
          borderRadius: '16px',
          transition: 'all 0.3s ease'
        }}
      >
        <Card.Body className="p-4">
          <Row className="g-4">
            {/* Left: Step Number and Image */}
            <Col md={3} className="d-flex align-items-center">
              <div className="d-flex align-items-center w-100">
                {/* Step Number */}
                <div 
                  className="d-flex align-items-center justify-content-center text-white fw-bold me-3"
                  style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '12px',
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    fontSize: '1.2rem',
                    minWidth: '48px'
                  }}
                >
                  {index + 1}
                </div>
                
                {/* Attraction Image */}
                <div className="position-relative" style={{ width: '80px', height: '80px', minWidth: '80px' }}>
                  <img
                    src={attraction.image}
                    alt={`${attraction.name} - ${attraction.category} attraction`}
                    className="w-100 h-100 rounded-3"
                    style={{ objectFit: 'cover' }}
                  />
                  <Badge 
                    bg="primary" 
                    className="position-absolute top-0 start-0 m-1 small"
                    style={{ fontSize: '0.6rem', borderRadius: '8px' }}
                  >
                    {attraction.category}
                  </Badge>
                </div>
              </div>
            </Col>

            {/* Center: Attraction Details */}
            <Col md={6}>
              <div className="h-100 d-flex flex-column justify-content-between">
                <div>
                  <h5 className="fw-bold text-dark mb-2 lh-sm">
                    {attraction.name}
                  </h5>
                  
                  <div className="d-flex align-items-center text-muted mb-2 small">
                    <Clock size={14} className="me-2" />
                    <span className="me-3">{attraction.duration}</span>
                    <GeoAlt size={14} className="me-2" />
                    <span>{attraction.category}</span>
                  </div>

                  <p className="text-muted small mb-0" style={{ 
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                    lineHeight: '1.4'
                  }}>
                    {attraction.description}
                  </p>
                </div>

                {/* Hours and Book Now */}
                <div className="d-flex align-items-center justify-content-between mt-3">
                  <div className="d-flex align-items-center text-muted small">
                    <Clock size={14} className="me-2" />
                    <span>{attraction.hours}</span>
                  </div>
                  <Button
                    as="a"
                    href={attraction.bookingUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    variant="outline-primary"
                    size="sm"
                    className="d-flex align-items-center"
                    style={{ borderRadius: '8px', fontSize: '0.8rem' }}
                  >
                    <BoxArrowUpRight size={14} className="me-1" />
                    Book
                  </Button>
                </div>
              </div>
            </Col>

            {/* Right: Notes and Actions */}
            <Col md={3}>
              <div className="h-100 d-flex flex-column">
                {/* Personal Notes Section */}
                <div className="flex-grow-1 mb-3">
                  <div className="d-flex align-items-center justify-content-between mb-2">
                    <Form.Label className="fw-semibold text-dark mb-0 small">
                      Personal Notes
                    </Form.Label>
                    {!isEditingNotes && hasNotes && (
                      <div className="d-flex gap-1">
                        <Button
                          variant="link"
                          size="sm"
                          className="p-0 text-muted"
                          onClick={handleStartEdit}
                          title="Edit notes"
                        >
                          <PencilSquare size={14} />
                        </Button>
                        <Button
                          variant="link"
                          size="sm"
                          className="p-0 text-danger"
                          onClick={handleDeleteNotes}
                          title="Delete notes"
                        >
                          <X size={14} />
                        </Button>
                      </div>
                    )}
                    {!isEditingNotes && !hasNotes && (
                      <Button
                        variant="link"
                        size="sm"
                        className="p-0 text-muted"
                        onClick={handleStartEdit}
                        title="Add notes"
                      >
                        <PencilSquare size={14} />
                      </Button>
                    )}
                  </div>

                  {isEditingNotes ? (
                    /* Edit Mode */
                    <div>
                      <Form.Control
                        as="textarea"
                        rows={3}
                        value={tempNotes}
                        onChange={(e) => setTempNotes(e.target.value)}
                        placeholder="Add your thoughts, tips, or reminders..."
                        className="small mb-2"
                        style={{ 
                          borderRadius: '8px',
                          resize: 'none',
                          fontSize: '0.85rem'
                        }}
                        autoFocus
                      />
                      <div className="d-flex gap-1">
                        <Button
                          variant="primary"
                          size="sm"
                          onClick={handleSaveNotes}
                          className="flex-grow-1"
                          style={{ fontSize: '0.75rem' }}
                        >
                          Save
                        </Button>
                        <Button
                          variant="outline-secondary"
                          size="sm"
                          onClick={handleCancelEdit}
                          style={{ fontSize: '0.75rem' }}
                        >
                          Cancel
                        </Button>
                        {hasNotes && (
                          <Button
                            variant="outline-danger"
                            size="sm"
                            onClick={handleDeleteNotes}
                            title="Delete notes"
                            style={{ fontSize: '0.75rem' }}
                          >
                            <X size={12} />
                          </Button>
                        )}
                      </div>
                    </div>
                  ) : (
                    /* Display Mode */
                    <div>
                      {hasNotes ? (
                        <div>
                          <div 
                            className="bg-light p-3 rounded-3 small text-dark"
                            style={{ 
                              fontSize: '0.85rem',
                              lineHeight: '1.4',
                              minHeight: '60px',
                              border: '1px solid #e9ecef'
                            }}
                          >
                            {isNotesLong ? truncateText(currentNotes, 100) : currentNotes}
                          </div>
                          {isNotesLong && (
                            <Button
                              variant="link"
                              size="sm"
                              className="p-0 mt-1 text-primary"
                              onClick={() => setShowNotesModal(true)}
                              style={{ fontSize: '0.75rem' }}
                            >
                              <Eye size={12} className="me-1" />
                              View full notes
                            </Button>
                          )}
                        </div>
                      ) : (
                        <div 
                          className="bg-light p-3 rounded-3 text-center text-muted"
                          style={{ 
                            fontSize: '0.8rem',
                            minHeight: '60px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            border: '1px dashed #dee2e6',
                            cursor: 'pointer'
                          }}
                          onClick={handleStartEdit}
                        >
                          <div>
                            <PencilSquare size={16} className="mb-1" />
                            <div>Click to add notes</div>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Remove Button */}
                <Button
                  variant="outline-danger"
                  size="sm"
                  onClick={() => onRemove(attraction.id)}
                  className="d-flex align-items-center justify-content-center w-100"
                  style={{ borderRadius: '8px' }}
                >
                  <Trash3 size={14} className="me-2" />
                  Remove
                </Button>
              </div>
            </Col>
          </Row>
        </Card.Body>

        {/* Progress Line (connecting to next item) */}
        {index !== undefined && (
          <div 
            className="position-absolute"
            style={{
              left: '64px',
              bottom: '-12px',
              width: '2px',
              height: '24px',
              backgroundColor: '#dee2e6',
              zIndex: 1
            }}
          />
        )}
      </Card>

      {/* Notes Modal for long notes */}
      <Modal 
        show={showNotesModal} 
        onHide={() => setShowNotesModal(false)}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title className="h5">
            Notes for {attraction.name}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div 
            className="p-3 bg-light rounded-3"
            style={{ 
              fontSize: '0.9rem',
              lineHeight: '1.6',
              whiteSpace: 'pre-wrap'
            }}
          >
            {currentNotes || 'No notes added yet.'}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="primary"
            onClick={() => {
              setShowNotesModal(false);
              handleStartEdit();
            }}
          >
            <PencilSquare size={16} className="me-2" />
            Edit Notes
          </Button>
          <Button
            variant="outline-danger"
            onClick={() => {
              handleDeleteNotes();
              setShowNotesModal(false);
            }}
          >
            <X size={16} className="me-2" />
            Delete Notes
          </Button>
          <Button 
            variant="secondary" 
            onClick={() => setShowNotesModal(false)}
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ItineraryItem;