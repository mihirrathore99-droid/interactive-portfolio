// frontend/src/components/Experience.js

import React from 'react';

const Experience = ({ experiences, selectedExperiences, onToggleExperience }) => {
  return (
    <section className="cv-section">
      <div className="section-header">
        <h2>Experience</h2>
        <p className="section-hint">(Toggle checkboxes to include/exclude from final CV)</p>
      </div>

      {experiences.map((job) => (
        <div key={job.id} className="job-container selectable-item">
          <input
            type="checkbox"
            className="item-checkbox"
            checked={selectedExperiences[job.id] || false} // Default to false if not set
            onChange={() => onToggleExperience(job.id)}
          />
          <div className="job">
            <h4>{job.role}</h4>
            <p className="job-company">{job.company} | {job.date}</p>
            {/* The details (bullet points) are still here, we'll hide them via CSS later if needed,
                but for the PDF generation, the state is what matters. */}
            <ul>
              {job.points.map((point, index) => (
                <li key={index}>{point}</li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </section>
  );
};

export default Experience;