import React from 'react';
import { Button, Card } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import './About.scss';

const About = () => {
  const { t } = useTranslation();

  return <>
    <Card
      bg="info"
      text="white"
      className="aboutCard"
    >
      <Card.Header>{t('about.daw')}</Card.Header>
      <Card.Body>
        <Card.Title>Jesús López Sánchez (lopsanjesus@gmail.com)</Card.Title>
        <Card.Text>
          <p>{t('about.repositories')}</p>
          <p>
            <a href="https://github.com/LopsanJesus/treelang-client">
              <Button variant="outline-dark">
                {t('about.client')}
              </Button>
            </a>
          </p>
          <p>
            <a href="https://github.com/LopsanJesus/treelang-api">
              <Button variant="outline-dark">
                {t('about.server')}
              </Button>
            </a>
          </p>
        </Card.Text>
      </Card.Body>
    </Card>
  </>;
};

export default About;
