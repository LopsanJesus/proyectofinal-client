import React from "react";
import { connect } from "react-redux";
import { useTranslation } from "react-i18next";
import "./Profile.scss";

import { /*Badge,*/ Row } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";

const Profile = ({ user }) => {
  const { t, i18n } = useTranslation();

  const handleChange = (event) => {
    i18n.changeLanguage(event.target.value);
  };

  return (
    <>
      <h2>{t("profile")}</h2>
      <br></br>
      <Form className="profile">
        <Form.Group as={Row}>
          <Col md={{ span: 6, offset: 3 }} lg={{ span: 2, offset: 4 }}>
            <Form.Label>{t("form.name")}</Form.Label>
          </Col>
          <Col md={{ span: 6, offset: 3 }} lg={{ span: 3, offset: 0 }}>
            <Form.Control
              type="text"
              placeholder={t("form.name")}
              value={user.name}
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row}>
          <Col md={{ span: 6, offset: 3 }} lg={{ span: 2, offset: 4 }}>
            <Form.Label>{t("form.email")}</Form.Label>
          </Col>
          <Col md={{ span: 6, offset: 3 }} lg={{ span: 3, offset: 0 }}>
            <Form.Control
              type="email"
              placeholder={t("form.email")}
              value={user.email}
            />
          </Col>
        </Form.Group>

        {/* <Form.Group as={Row}>
        <Col md={{ span: 6, offset: 3 }} lg={{ span: 2, offset: 4 }}>
          <Form.Label>{t('form.numberOfApples')}</Form.Label>
        </Col>
        <Col md={{ span: 6, offset: 3 }} lg={{ span: 3, offset: 0 }}>
          <h5><Badge variant="danger">634</Badge></h5>
        </Col>
      </Form.Group> */}

        <Form.Group as={Row}>
          <Col md={{ span: 6, offset: 3 }} lg={{ span: 2, offset: 4 }}>
            <Form.Label>{t("language")}</Form.Label>
          </Col>
          <Col md={{ span: 6, offset: 3 }} lg={{ span: 3, offset: 0 }}>
            <Form.Control
              as="select"
              name="language"
              value={i18n.language}
              onChange={handleChange}
            >
              <option value="en">{t("languages.english")}</option>
              <option value="es">{t("languages.spanish")}</option>
            </Form.Control>
          </Col>
        </Form.Group>
      </Form>
    </>
  );
};

const mapStateToProps = ({ userInfo }) => {
  return {
    user: userInfo.user,
  };
};

export default connect(mapStateToProps, null)(Profile);
