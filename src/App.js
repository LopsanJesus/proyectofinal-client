import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  const [ users, setUsers ] = useState("");  

  useEffect(() => {
    //fetch("http://localhost:4000/users")
    fetch("https://treelang-api.herokuapp.com/users")
      .then(res => res.text())
      .then(res => setUsers(res))
      .catch(() => console.log("Error en la API"))
  });

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Users:
          { users }
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
