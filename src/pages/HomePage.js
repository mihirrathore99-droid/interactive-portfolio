// frontend/src/pages/HomePage.js

import React from 'react';
import { Link } from 'react-router-dom';
import profilePic from '../assets/profile-pic.png';
// Import the project images
import al7475Image from '../assets/al7475_stress.jpeg';
import nabImage from '../assets/nab_stress.jpeg';
import '../App.css';

const HomePage = () => {
  return (
    <>
      <div className="home-container hero-bg">
        <div className="hero-section">
          <div className="hero-text">
            <h1>Mihir Raj Rathore</h1>
            <h2>Mechanical Engineer | CAE & Vehicle Dynamics Enthusiast</h2>
            <p className="hero-bio">
              A dedicated and results-oriented Mechanical Engineer with a passion for leveraging technology to solve complex challenges. 
              Currently specializing in Vehicle Integration and Noise Reduction at BMW AG, with a strong foundation in Finite Element Analysis, CAD, and data-driven optimization.
            </p>
            <div className="hero-buttons">
              <Link to="/tools" className="btn btn-primary">
                Interactive CV & Tools
              </Link>
              <a href="https://www.linkedin.com/in/mihir-raj-rathore/" target="_blank" rel="noopener noreferrer" className="btn btn-secondary">
                LinkedIn
              </a>
            </div>
          </div>
          <div className="hero-image-container">
            <img src={profilePic} alt="Mihir Raj Rathore" className="hero-image" />
          </div>
        </div>
      </div>

      {/* --- NEW: FEATURED PROJECT SECTION --- */}
      <div className="home-container project-bg">
        <div className="project-showcase">
          <div className="project-header">
            <h2>Featured Project: FEA Material Analysis</h2>
            <p>A case study on optimizing the structural integrity of a high-load rack and pinion assembly.</p>
          </div>

          <div className="project-body">
            <div className="project-challenge">
              <h3>The Challenge</h3>
              <p>To identify an alternative to the standard Al 7475 alloy that would enhance strength, load capacity, and fatigue resistance, thereby increasing the component's structural integrity under operational stress.</p>
              <h4>Tools Used:</h4>
              <ul className="tools-list">
                <li>ANSYS</li>
                <li>SolidWorks</li>
                <li>CATIA</li>
              </ul>
            </div>
            
            <div className="project-analysis">
              <h3>Side-by-Side Analysis</h3>
              <div className="comparison-container">
                <div className="comparison-item">
                  <img src={al7475Image} alt="FEA on Aluminum 7475" />
                  <h4>Standard: Aluminum 7475</h4>
                  <p>Demonstrates moderate deformation and standard fatigue performance.</p>
                </div>
                <div className="comparison-item">
                  <img src={nabImage} alt="FEA on Nickel Aluminum Bronze" />
                  <h4>Optimized: Nickel Aluminum Bronze</h4>
                  <p>Shows superior strength, minimal deformation, and excellent fatigue life.</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="project-outcome">
            <h3>The Outcome</h3>
            <p className="outcome-text">The analysis concluded that the Nickel Aluminum Bronze alloy was the optimal choice, resulting in a <strong>20% increase in the structural integrity</strong> of the component and significantly improved performance under transient loads.</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;