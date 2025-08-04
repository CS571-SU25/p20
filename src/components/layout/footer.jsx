import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { House, GeoAlt, Calendar, StarFill, Envelope, Telephone, Globe, Facebook, Twitter, Instagram, Youtube, ArrowUp } from 'react-bootstrap-icons';

const Footer = ({ setCurrentPage }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer style={{ background: 'linear-gradient(135deg, #2c3e50 0%, #34495e 100%)', color: 'white' }}>
      <div style={{ height: '4px', background: 'linear-gradient(90deg, #667eea 0%, #764ba2 50%, #667eea 100%)' }} />
      
      <Container>
        <div className="py-5">
          <Row className="g-5">
            <Col lg={4}>
              <h3 className="h2 fw-bold mb-4 d-flex align-items-center">
                <div className="rounded-circle d-flex align-items-center justify-content-center me-3" style={{ width: '56px', height: '56px', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', border: '3px solid rgba(255,255,255,0.2)' }}>
                  <span style={{ fontSize: '1.8rem' }}>🗽</span>
                </div>
                <div>
                  <div>NYC Tourist Guide</div>
                  <small className="opacity-75" style={{ fontSize: '0.9rem' }}>Your NYC Adventure Starts Here</small>
                </div>
              </h3>
              <p className="text-light mb-4" style={{ lineHeight: '1.6', fontSize: '1.1rem' }}>
                Discover the magic of New York City through curated experiences, insider tips, and personalized itineraries.
              </p>
              
              <div className="d-flex gap-3 mb-4">
                <div className="rounded-circle d-flex align-items-center justify-content-center text-white" style={{ width: '48px', height: '48px', border: '2px solid rgba(255,255,255,0.3)', backgroundColor: 'rgba(255,255,255,0.1)', pointerEvents: 'none' }}>
                  <Facebook size={20} />
                </div>
                <div className="rounded-circle d-flex align-items-center justify-content-center text-white" style={{ width: '48px', height: '48px', border: '2px solid rgba(255,255,255,0.3)', backgroundColor: 'rgba(255,255,255,0.1)', pointerEvents: 'none' }}>
                  <Twitter size={20} />
                </div>
                <div className="rounded-circle d-flex align-items-center justify-content-center text-white" style={{ width: '48px', height: '48px', border: '2px solid rgba(255,255,255,0.3)', backgroundColor: 'rgba(255,255,255,0.1)', pointerEvents: 'none' }}>
                  <Instagram size={20} />
                </div>
                <div className="rounded-circle d-flex align-items-center justify-content-center text-white" style={{ width: '48px', height: '48px', border: '2px solid rgba(255,255,255,0.3)', backgroundColor: 'rgba(255,255,255,0.1)', pointerEvents: 'none' }}>
                  <Youtube size={20} />
                </div>
              </div>
            </Col>

            <Col lg={2} md={6}>
              <h5 className="fw-bold mb-4 text-light">Explore</h5>
              <div className="d-flex flex-column gap-3">
                <button onClick={() => setCurrentPage('home')} className="btn btn-link text-light text-start p-0 text-decoration-none d-flex align-items-center">
                  <House size={16} className="me-3" />
                  <div>
                    <div className="fw-semibold">Homepage</div>
                    <small className="opacity-75">Start your journey</small>
                  </div>
                </button>
                <button onClick={() => setCurrentPage('attractions')} className="btn btn-link text-light text-start p-0 text-decoration-none d-flex align-items-center">
                  <GeoAlt size={16} className="me-3" />
                  <div>
                    <div className="fw-semibold">Attractions</div>
                    <small className="opacity-75">Discover NYC</small>
                  </div>
                </button>
                <button onClick={() => setCurrentPage('itinerary')} className="btn btn-link text-light text-start p-0 text-decoration-none d-flex align-items-center">
                  <Calendar size={16} className="me-3" />
                  <div>
                    <div className="fw-semibold">My Itinerary</div>
                    <small className="opacity-75">Plan your trip</small>
                  </div>
                </button>
                <button onClick={() => setCurrentPage('reviews')} className="btn btn-link text-light text-start p-0 text-decoration-none d-flex align-items-center">
                  <StarFill size={16} className="me-3" />
                  <div>
                    <div className="fw-semibold">Reviews</div>
                    <small className="opacity-75">Share experiences</small>
                  </div>
                </button>
              </div>
            </Col>

            <Col lg={3} md={6}>
              <h5 className="fw-bold mb-4 text-light">Top Categories</h5>
              <Row className="g-3">
                <Col xs={6}>
                  <div className="text-light p-3 w-100 d-flex flex-column align-items-center" style={{ borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)', backgroundColor: 'rgba(255,255,255,0.02)', pointerEvents: 'none' }}>
                    <div style={{ fontSize: '1.5rem', userSelect: 'none' }} className="mb-2">🏛️</div>
                    <div className="fw-semibold small" style={{ userSelect: 'none' }}>Museums</div>
                  </div>
                </Col>
                <Col xs={6}>
                  <div className="text-light p-3 w-100 d-flex flex-column align-items-center" style={{ borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)', backgroundColor: 'rgba(255,255,255,0.02)', pointerEvents: 'none' }}>
                    <div style={{ fontSize: '1.5rem', userSelect: 'none' }} className="mb-2">🌳</div>
                    <div className="fw-semibold small" style={{ userSelect: 'none' }}>Parks</div>
                  </div>
                </Col>
                <Col xs={6}>
                  <div className="text-light p-3 w-100 d-flex flex-column align-items-center" style={{ borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)', backgroundColor: 'rgba(255,255,255,0.02)', pointerEvents: 'none' }}>
                    <div style={{ fontSize: '1.5rem', userSelect: 'none' }} className="mb-2">🗽</div>
                    <div className="fw-semibold small" style={{ userSelect: 'none' }}>Monuments</div>
                  </div>
                </Col>
                <Col xs={6}>
                  <div className="text-light p-3 w-100 d-flex flex-column align-items-center" style={{ borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)', backgroundColor: 'rgba(255,255,255,0.02)', pointerEvents: 'none' }}>
                    <div style={{ fontSize: '1.5rem', userSelect: 'none' }} className="mb-2">🎭</div>
                    <div className="fw-semibold small" style={{ userSelect: 'none' }}>Entertainment</div>
                  </div>
                </Col>
              </Row>
            </Col>

            <Col lg={3}>
              <h5 className="fw-bold mb-4 text-light">Get in Touch</h5>
              <div className="mb-4">
                <div className="d-flex align-items-center mb-3 p-3 rounded-3" style={{ backgroundColor: 'rgba(255,255,255,0.05)', pointerEvents: 'none' }}>
                  <div className="rounded-circle d-flex align-items-center justify-content-center me-3" style={{ width: '40px', height: '40px', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
                    <Envelope className="text-white" size={16} />
                  </div>
                  <div>
                    <div className="text-light fw-semibold" style={{ userSelect: 'none' }}>Email Us</div>
                    <div className="text-light opacity-75 small" style={{ userSelect: 'none' }}>
                      info@nyctouristguide.com
                    </div>
                  </div>
                </div>
                
                <div className="d-flex align-items-center mb-3 p-3 rounded-3" style={{ backgroundColor: 'rgba(255,255,255,0.05)', pointerEvents: 'none' }}>
                  <div className="rounded-circle d-flex align-items-center justify-content-center me-3" style={{ width: '40px', height: '40px', background: 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)' }}>
                    <Telephone className="text-white" size={16} />
                  </div>
                  <div>
                    <div className="text-light fw-semibold" style={{ userSelect: 'none' }}>Call Us</div>
                    <div className="text-light opacity-75 small" style={{ userSelect: 'none' }}>
                      (555) 123-NYC1
                    </div>
                  </div>
                </div>
                
                <div className="d-flex align-items-center p-3 rounded-3" style={{ backgroundColor: 'rgba(255,255,255,0.05)', pointerEvents: 'none' }}>
                  <div className="rounded-circle d-flex align-items-center justify-content-center me-3" style={{ width: '40px', height: '40px', background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)' }}>
                    <Globe className="text-white" size={16} />
                  </div>
                  <div>
                    <div className="text-light fw-semibold" style={{ userSelect: 'none' }}>Visit Online</div>
                    <div className="text-light opacity-75 small" style={{ userSelect: 'none' }}>
                      www.nyctouristguide.com
                    </div>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </div>

        <div className="border-top py-4" style={{ borderColor: 'rgba(255,255,255,0.1)', background: 'rgba(0,0,0,0.2)' }}>
          <Row className="align-items-center">
            <Col md={6}>
              <div className="text-light mb-3 mb-md-0">
                <div className="fw-semibold">&copy; 2025 NYC Tourist Guide. All rights reserved.</div>
                <small className="opacity-75">Built for CS571 - University of Wisconsin-Madison</small>
              </div>
            </Col>
            
            <Col md={6} className="text-md-end">
              <div className="d-flex justify-content-md-end align-items-center gap-4 mb-3">
                <span className="text-light small opacity-75">Privacy Policy</span>
                <span className="text-light small opacity-75">Terms of Service</span>
                <span className="text-light small opacity-75">Accessibility</span>
              </div>
              
              <Button variant="outline-light" size="sm" className="d-flex align-items-center" onClick={scrollToTop} style={{ borderRadius: '25px', borderWidth: '2px', padding: '8px 16px' }}>
                <ArrowUp size={16} className="me-2" />
                Back to Top
              </Button>
            </Col>
          </Row>
          
          <Row className="mt-4 pt-3" style={{ borderTop: '1px solid rgba(255,255,255,0.1)' }}>
            <Col className="text-center">
              <div className="d-flex justify-content-center align-items-center gap-3 mb-2">
                <div className="d-flex align-items-center">
                  <span style={{ fontSize: '1.2rem' }}>👨‍💻</span>
                  <span className="ms-2 fw-semibold text-light">Nikhil Ashokan</span>
                </div>
                <div className="opacity-50">×</div>
                <div className="d-flex align-items-center">
                  <span style={{ fontSize: '1.2rem' }}>👨‍💻</span>
                  <span className="ms-2 fw-semibold text-light">Vikram Varikooty</span>
                </div>
              </div>
              <small className="text-light opacity-75">
                Designed with <span className="text-danger">❤️</span> for NYC travelers
              </small>
            </Col>
          </Row>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;