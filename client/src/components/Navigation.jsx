import React from 'react';
import { Navbar, Nav, Dropdown, Icon } from 'rsuite'
import { Link } from 'react-router-dom'

function Navigation () {
  return (
    <Navbar>
      <Navbar.Header>
        <a href="#" className="navbar-brand logo">EntertainMe</a>
      </Navbar.Header>
      <Navbar.Body>
        <Nav>
          <Link to="/"><Nav.Item icon={<Icon icon="home" />}>Home</Nav.Item></Link>
          <Link to="/about"><Nav.Item>About</Nav.Item></Link>
          <Link to="/movies"><Nav.Item>Movies</Nav.Item></Link>
          <Link to="/series"><Nav.Item>TV Series</Nav.Item></Link>
        </Nav>
      </Navbar.Body>
    </Navbar>
  )
}

export default Navigation