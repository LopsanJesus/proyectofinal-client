import React from 'react';
import { Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import './Home.scss';

const Home = () => {
  const { t } = useTranslation();
  return <div>
    <h1>Bienvenido a Treelang!</h1>
    <h2>Si quieres saber más sobre nosotros:</h2>
    <Link to="/about">
      <Button variant="primary">
        {t('about')}
      </Button>
    </Link>
    <h3>Le ofrecemos:</h3>
    <ul>
      <p>Aprendizaje</p>
      <p>Diversión</p>
      <p>Y mucho más</p>
    </ul>
    <Link to="/login">
      <Button variant="primary">
        {t('letsStart')}
      </Button>
    </Link>
  </div>;
};

export default Home;
