import React from 'react';
import { Navbar, Nav, Dropdown, Icon } from 'rsuite'
import { Link } from 'react-router-dom'

function Navigation () {
  return (
    <Navbar appearance="inverse">
      <Navbar.Header>
        <p className="navbar-brand logo">EntertainMe</p>
      </Navbar.Header>
      <Navbar.Body>
        <Nav>
          <Link to="/"><Nav.Item icon={<Icon icon="home" />}>Home</Nav.Item></Link>
          <Link to="/movies"><Nav.Item>Movies</Nav.Item></Link>
          <Link to="/series"><Nav.Item>TV Series</Nav.Item></Link>
          <Link to="/favorites"><Nav.Item>Favorites</Nav.Item></Link>
        </Nav>
      </Navbar.Body>
    </Navbar>
  )
}

export default Navigation