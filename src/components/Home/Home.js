import React from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import "./Home.scss";

const Home = () => {
  const { t, i18n } = useTranslation();

  const changeLanguage = (ev) => {
    i18n.changeLanguage(ev.target.value);
  };

  return (
    <div>
      <h1>{t("home.welcome")}</h1>
      <Container>
        <Row>
          <Col>
            <h3>{t("home.inTreelangTitle")}</h3>
          </Col>
          <Col>
            <h3>{t("home.knowMoreAboutUs")}</h3>
          </Col>
        </Row>
        <Row>
          <Col>
            <p>{t("home.learning")}</p>
            <p>{t("home.fun")}</p>
            <p>{t("home.muchmore")}</p>
            <Link to="/discover">
              <Button variant="primary">{t("home.letsStart")}</Button>
            </Link>
          </Col>
          <Col>
            <Link to="/about">
              <Button variant="primary" className="homeButton">
                {t("home.about")}
              </Button>
            </Link>
            {i18n && (
              <>
                <h5>{t("home.changeLanguage")}</h5>
                <select value={i18n.language} onChange={changeLanguage}>
                  {Object.keys(i18n.store.data).map((item) => {
                    return (
                      <option value={item} key={item}>
                        {t("languages.codes." + item)}
                      </option>
                    );
                  })}
                </select>
              </>
            )}
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Home;
