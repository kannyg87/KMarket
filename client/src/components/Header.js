// src/Header.js

import React, {useContext} from 'react';
import { Link } from 'react-router-dom';
import '../index.css'; 
import { UserContext } from '../context/user';

const Header = () => {
  const {user, setUser} = useContext(UserContext)
  console.log(user)
  return (
    <header className="header">
      <div className="container">
        <h1 className="logo">MyApp</h1>
        <nav className="nav">
          <h1> hello {user}</h1>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;
