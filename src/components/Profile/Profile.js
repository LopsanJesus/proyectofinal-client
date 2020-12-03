import React from 'react';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';
import './Profile.scss';

import { Container } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";

const Profile = ({ user }) => {
  const { t, i18n } = useTranslation();

  const handleChange = (event) => {
    i18n.changeLanguage(event.target.value)
  };

  return (<>
    Hi {user && user.name}!
    <Container as={Col} md={{ span: 6, offset: 3 }} lg={{ span: 2, offset: 5 }}>
      <Form.Group>
        <Form.Label>{t('language')}</Form.Label>
        <Form.Control as="select" name="language" value={i18n.language} onChange={handleChange}>
          <option value="en">{t('languages.english')}</option>
          <option value="es">{t('languages.spanish')}</option>
        </Form.Control>
      </Form.Group>
    </Container>
  </>);
};

const mapStateToProps = ({ userInfo }) => {
  return {
    user: userInfo.user
  }
}

export default connect(mapStateToProps, null)(Profile);
