// frontend/src/components/Header.js

import React from 'react';

// This is a functional component. It receives 'props' (properties) from its parent.
// We are "destructuring" props to directly get the 'personalData' object.
const Header = ({ personalData }) => {
  return (
    <header className="cv-header">
      <h1>{personalData.name}</h1>
      <div className="contact-info">
        <span>{personalData.address}</span>
        <span>Email: {personalData.email}</span>
        <span>Phone: {personalData.telephone}</span>
      </div>
    </header>
  );
};

export default Header;