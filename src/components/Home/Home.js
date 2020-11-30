import React from 'react';
import { Link } from 'react-router-dom';
import './Home.scss';

const Home = () => {
  return <div>
    <Link to="/login">
      login
    </Link>
  </div>;
};

export default Home;
