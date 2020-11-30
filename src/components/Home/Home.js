import React from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './Home.scss';

const Home = () => {
  return <div>
    <h1>Bienvenido a Treelang!</h1>
    <h3>Le ofrecemos:</h3>
    <ul>
      <p>Aprendizaje</p>
      <p>Diversión</p>
      <p>Y mucho más</p>
    </ul>
    <Link to="/login">
      <Button variant="primary">
        Acceder
      </Button>
    </Link>
  </div>;
};

export default Home;
