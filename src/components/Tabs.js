// frontend/src/components/Tabs.js
import React from 'react';
import './Tabs.css'; // We'll create this next

const Tabs = ({ activeTab, setActiveTab }) => {
  return (
    <div className="tabs-container">
      <button
        className={`tab-button ${activeTab === 'cv' ? 'active' : ''}`}
        onClick={() => setActiveTab('cv')}
      >
        Dynamic CV Builder
      </button>
      <button
        className={`tab-button ${activeTab === 'letter' ? 'active' : ''}`}
        onClick={() => setActiveTab('letter')}
      >
        AI Cover Letter Generator
      </button>
    </div>
  );
};

export default Tabs;