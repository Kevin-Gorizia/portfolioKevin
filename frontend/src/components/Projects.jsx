import React, { useState, useEffect, useMemo, Suspense } from "react";
import PropTypes from "prop-types";
import axios from "axios";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { FaExternalLinkAlt, FaGithub } from "react-icons/fa";

const ProjectCard = ({ project, index }) => (
  <motion.div
    key={project.id}
    className="project-card"
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
    whileHover={{ y: -10 }}
  >
    <div className="project-image-container">
      <img
        src={project.imageUrl}
        alt={project.title}
        className="project-image"
        loading="lazy"
      />
      <div className="project-overlay">
        <a
          href={project.projectUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="project-preview-btn"
        >
          <FaExternalLinkAlt />
          Voir le site
        </a>
      </div>
    </div>

    <div className="project-content">
      <h3 className="project-title">{project.title}</h3>
      <p className="project-description">{project.description}</p>

      <div className="project-technologies">
        {project.technologies.map((tech, techIndex) => (
          <span key={`${project.id}-${techIndex}`} className="tech-tag">
            {tech}
          </span>
        ))}
      </div>

      <div className="project-links">
        <a
          href={project.projectUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="project-link"
        >
          <FaExternalLinkAlt />
          Live Demo
        </a>
        {project.githubUrl && (
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="project-link"
          >
            <FaGithub />
            Code Source
          </a>
        )}
      </div>
    </div>
  </motion.div>
);

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const demoProjects = useMemo(
    () => [
      {
        id: 1,
        title: "Application E-commerce",
        description:
          "Plateforme de vente en ligne complète avec panier, paiement et administration.",
        imageUrl:
          "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=500&auto=format&fit=crop&q=60",
        projectUrl: "#",
        githubUrl: "#",
        technologies: ["React", "Node.js", "MongoDB", "Stripe"],
        featured: true,
      },
      // ...autres projets demo
    ],
    []
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const response = await axios.get("http://localhost:5000/api/projects");
        setProjects(response.data);
      } catch (error) {
        console.error("Erreur:", error);
        setError(error.message);
        setProjects(demoProjects);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [demoProjects]);

  if (isLoading) {
    return <div className="loading">Chargement des projets...</div>;
  }

  if (error) {
    return <div className="error">Erreur: {error}</div>;
  }

  return (
    <section id="projects" className="section">
      <div className="container">
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Mes Projets Récents
        </motion.h2>

        <Suspense fallback={<div>Chargement...</div>}>
          <div className="projects-grid">
            {projects.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </div>
        </Suspense>
      </div>
    </section>
  );
};

ProjectCard.propTypes = {
  project: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    imageUrl: PropTypes.string.isRequired,
    projectUrl: PropTypes.string.isRequired,
    githubUrl: PropTypes.string,
    technologies: PropTypes.arrayOf(PropTypes.string).isRequired,
    featured: PropTypes.bool,
  }).isRequired,
  index: PropTypes.number.isRequired,
};

export default Projects;
