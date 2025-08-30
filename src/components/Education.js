// frontend/src/components/Education.js

import React from 'react';

const Education = ({ education }) => {
  return (
    <section className="cv-section">
      <h2>Education</h2>
      {education.map((edu) => (
        <div key={edu.id} className="education-item">
          <h4>{edu.degree}</h4>
          <p className="education-institution">{edu.institution} | {edu.date}</p>
          <p>{edu.details}</p>
        </div>
      ))}
    </section>
  );
};

export default Education;