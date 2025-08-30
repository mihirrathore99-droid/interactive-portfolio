// frontend/src/components/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar">
      <Link to="/" className="nav-logo">Mihir Raj Rathore</Link>
      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/tools">CV & Tools</Link>
      </div>
    </nav>
  );
};

export default Navbar;