import React from "react";

const ProjectCard = ({ project }) => {
  if (!project) return null;

  return (
    <div className="project-card" data-testid="project-card">
      <img
        src={project.image}
        alt={project.title}
        className="project-image"
        role="img"
      />
      <div className="project-content">
        <h3 className="project-title">{project.title}</h3>
        <p className="project-description">{project.description}</p>

        <div className="project-technologies">
          {project.technologies &&
            project.technologies.map((tech, index) => (
              <span key={index} className="tech-tag">
                {tech}
              </span>
            ))}
        </div>

        <div className="project-links">
          {project.projectUrl && (
            <a
              href={project.projectUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="project-link"
            >
              Voir le projet
            </a>
          )}
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="project-link"
            >
              Voir sur GitHub
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
