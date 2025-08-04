import React from 'react';
import { Navbar, Nav, Container, Badge } from 'react-bootstrap';
import { House, Building, Calendar, ChatSquareText } from 'react-bootstrap-icons';

const NavigationBar = ({ currentPage, setCurrentPage, itineraryCount }) => {
  const navItems = [
    { key: 'home', label: 'Home', icon: House },
    { key: 'attractions', label: 'Attractions', icon: Building },
    { key: 'itinerary', label: 'My Itinerary', icon: Calendar },
    { key: 'reviews', label: 'Reviews', icon: ChatSquareText }
  ];

  return (
    <Navbar 
      bg="dark" 
      variant="dark" 
      expand="lg" 
      className="shadow-sm" 
      fixed="top"
      style={{ zIndex: 1030 }}
    >
      <Container>
        <Navbar.Brand 
          className="fw-bold d-flex align-items-center"
          onClick={() => setCurrentPage('home')}
          style={{ cursor: 'pointer' }}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              setCurrentPage('home');
            }
          }}
        >
          🗽 NYC Travel Guide
        </Navbar.Brand>
        
        <Navbar.Toggle 
          aria-controls="main-navbar-nav"
          aria-label="Toggle navigation menu"
        />
        
        <Navbar.Collapse id="main-navbar-nav">
          <Nav className="ms-auto">
            {navItems.map(({ key, label, icon: Icon }) => (
              <Nav.Link
                key={key}
                onClick={() => setCurrentPage(key)}
                className={`d-flex align-items-center px-3 ${currentPage === key ? 'active fw-bold' : ''}`}
                aria-current={currentPage === key ? 'page' : undefined}
                style={{ cursor: 'pointer' }}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    setCurrentPage(key);
                  }
                }}
              >
                <Icon size={18} className="me-2" aria-hidden="true" />
                {label}
                {key === 'itinerary' && itineraryCount > 0 && (
                  <Badge 
                    bg="primary" 
                    className="ms-2"
                    aria-label={`${itineraryCount} items in itinerary`}
                  >
                    {itineraryCount}
                  </Badge>
                )}
              </Nav.Link>
            ))}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavigationBar;