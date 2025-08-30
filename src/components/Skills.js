// frontend/src/components/Skills.js

import React from 'react';

const Skills = ({ skills }) => {
  return (
    <section className="cv-section">
      <h2>Knowledge and Skills</h2>
      <div className="skills-grid">
        <p><strong>Languages:</strong> {skills.languages}</p>
        <p><strong>Microsoft Software:</strong> {skills.it_knowledge['Microsoft Software']}</p>
        <p><strong>CAD/CAE/CAM:</strong> {skills.it_knowledge['CAD/CAE/CAM']}</p>
        <p><strong>Programming:</strong> {skills.it_knowledge.Programming}</p>
        <p><strong>Other Skills:</strong> {skills.other_skills}</p>
      </div>
    </section>
  );
};

export default Skills;