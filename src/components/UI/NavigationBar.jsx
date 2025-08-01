import React from 'react';
import { Navbar, Nav, Container, Badge } from 'react-bootstrap';
import { MapPin, Star, Calendar, Users } from 'lucide-react';

const NavigationBar = ({ currentPage, setCurrentPage, itineraryCount }) => {
  const navItems = [
    { id: 'home', label: 'Home', icon: MapPin },
    { id: 'attractions', label: 'Attractions', icon: Star },
    { id: 'itinerary', label: 'My Itinerary', icon: Calendar },
    { id: 'reviews', label: 'Reviews', icon: Users }
  ];

  return (
    <Navbar bg="white" expand="lg" className="shadow-lg border-bottom sticky-top" style={{ zIndex: 1050 }}>
      <Container fluid className="px-4 px-lg-5">
        {/* Brand/Logo */}
        <Navbar.Brand 
          href="#" 
          onClick={() => setCurrentPage('home')}
          className="fw-bold text-primary d-flex align-items-center fs-4 hover-brand"
          style={{ cursor: 'pointer' }}
        >
          <MapPin className="me-2" size={24} />
          NYC Tourist Guide
        </Navbar.Brand>

        {/* Mobile Toggle */}
        <Navbar.Toggle aria-controls="navbar-nav" />
        
        {/* Navigation Items */}
        <Navbar.Collapse id="navbar-nav">
          <Nav className="ms-auto">
            {navItems.map(item => {
              const Icon = item.icon;
              const isActive = currentPage === item.id;
              
              return (
                <Nav.Link 
                  key={item.id}
                  href="#" 
                  onClick={(e) => {
                    e.preventDefault();
                    setCurrentPage(item.id);
                  }}
                  className={`d-flex align-items-center px-3 py-2 mx-1 rounded-pill fw-medium position-relative nav-item-custom ${
                    isActive ? 'bg-primary text-white shadow-sm' : 'text-dark hover-nav-item'
                  }`}
                  style={{ 
                    cursor: 'pointer',
                    transition: 'all 0.2s ease-in-out',
                    textDecoration: 'none'
                  }}
                >
                  <Icon className="me-2" size={18} />
                  {item.label}
                  {item.id === 'itinerary' && itineraryCount > 0 && (
                    <Badge 
                      bg="danger" 
                      pill 
                      className="position-absolute top-0 start-100 translate-middle ms-2"
                      style={{ fontSize: '0.7rem' }}
                    >
                      {itineraryCount}
                    </Badge>
                  )}
                </Nav.Link>
              );
            })}
          </Nav>
        </Navbar.Collapse>
      </Container>

      {/* Custom CSS */}
      <style jsx>{`
        .hover-brand:hover {
          transform: scale(1.02);
          transition: transform 0.2s ease-in-out;
        }
        
        .nav-item-custom {
          transition: all 0.2s ease-in-out !important;
        }
        
        .hover-nav-item:hover {
          background-color: #f8f9fa !important;
          color: #0d6efd !important;
          transform: translateY(-1px);
          box-shadow: 0 2px 4px rgba(0,0,0,0.1) !important;
        }
        
        .navbar {
          backdrop-filter: blur(10px);
          background-color: rgba(255, 255, 255, 0.95) !important;
        }
        
        .shadow-lg {
          box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15) !important;
        }
      `}</style>
    </Navbar>
  );
};

export default NavigationBar;