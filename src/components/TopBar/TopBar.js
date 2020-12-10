import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import appConfig from "../../config/app";
import { NavDropdown } from "react-bootstrap";
import "./TopBar.scss";
import { useTranslation } from "react-i18next";


const TopBar = ({
  user
}) => {
  const { t } = useTranslation();
  const src = "../../../full-apple.png";

  return (
    <Navbar bg="light" variant="light" expand="sm" sticky="top">
      <Navbar.Brand>
        <Link to="/"><img src="/treelang-title.png" alt={appConfig.title} /></Link>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Item className="mr-auto">
            <Link to="/discover">{t('discover.link')}</Link>
          </Nav.Item>
          {user && <>
            <Nav.Item className="mr-auto">
              <Link to="/my-forest">{t('my_forest')}</Link>
            </Nav.Item>
          </>}
        </Nav>
        <Nav id="right-nav">
          {user ? <>
            <Navbar.Text className="Username">{user && user.name}</Navbar.Text>
            <NavDropdown
              title={
                <span>
                  <img className="profile-image" src={src} alt="User Pic" />
                </span>
              }
              id="collasible-nav-dropdown"
            >
              <NavDropdown.Item className="mr-auto">
                <Link to="/profile">{t('profile')}</Link>
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item className="mr-auto">
                <Link to="/logout">{t('logout')}</Link>
              </NavDropdown.Item>
            </NavDropdown>
          </>
            :
            <>
              <Nav.Link className="mr-auto">
                <Link to="/login">{t('form.login')}</Link>
              </Nav.Link>
            </>}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

const mapStateToProps = ({ userInfo }) => {
  return {
    user: userInfo.user,
  };
};

export default connect(mapStateToProps, null)(TopBar);
