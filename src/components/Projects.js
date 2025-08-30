// frontend/src/components/Projects.js

import React from 'react';

const Projects = ({ projects }) => {
  return (
    <section className="cv-section">
      <h2>Academic Projects</h2>
      {projects.map((project) => (
        <div key={project.id} className="project-item">
          <h4>{project.title}</h4>
          <p className="project-date">{project.date}</p>
          <ul>
            {project.points.map((point, index) => (
              <li key={index}>{point}</li>
            ))}
          </ul>
        </div>
      ))}
    </section>
  );
};

export default Projects;