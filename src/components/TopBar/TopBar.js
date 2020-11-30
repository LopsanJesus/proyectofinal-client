import React from "react";
import { Link } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import config from "../../config";
import { NavDropdown } from "react-bootstrap";
import './TopBar.scss';

const TopBar = () => {
  const src = "../../../full-apple.png";
  return (
    <Navbar bg="dark" variant="light" expand="sm" sticky="top">
      <Navbar.Brand>
        <Link to="/">{config.title}</Link>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link className="mr-auto">
            <Link to="/my-forest">My Forest</Link>
          </Nav.Link>
          <Nav.Link className="mr-auto">
            <Link to="/about">About</Link>
          </Nav.Link>
        </Nav>
        <Nav id="right-nav">
          <NavDropdown title={
            <span>
              <img className="profile-image"
                src={src}
                alt="User Pic"
              />
            </span>
          } id="collasible-nav-dropdown">
            <NavDropdown.Item className="mr-auto">
              <Link to="/profile">Profile</Link>
            </NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item className="mr-auto">
              <Link to="/logout">Log Out</Link>
            </NavDropdown.Item>
          </NavDropdown>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default TopBar;
