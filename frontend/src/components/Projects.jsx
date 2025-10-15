// components/Projects.jsx (version améliorée)
import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [featuredProjects, setFeaturedProjects] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [projectsRes, featuredRes] = await Promise.all([
          axios.get("http://localhost:5000/api/projects"),
          axios.get("http://localhost:5000/api/projects/featured"),
        ]);
        setProjects(projectsRes.data);
        setFeaturedProjects(featuredRes.data);
      } catch (error) {
        console.error("Erreur:", error);
        // Données de démo si le backend n'est pas disponible
        setDemoData();
      }
    };

    fetchData();
  }, []);

  const setDemoData = () => {
    const demoProjects = [
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
      {
        id: 2,
        title: "Réseau Social",
        description:
          "Application sociale avec messagerie en temps réel et partage de contenu.",
        imageUrl:
          "https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?w=500&auto=format&fit=crop&q=60",
        projectUrl: "#",
        githubUrl: "#",
        technologies: ["React", "Socket.io", "Express", "PostgreSQL"],
        featured: true,
      },
      {
        id: 3,
        title: "Application de Gestion",
        description:
          "Outil de gestion de projet avec tableau Kanban et analytics.",
        imageUrl:
          "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=500&auto=format&fit=crop&q=60",
        projectUrl: "#",
        githubUrl: "#",
        technologies: ["Vue.js", "Laravel", "MySQL", "Chart.js"],
        featured: false,
      },
    ];
    setProjects(demoProjects);
    setFeaturedProjects(demoProjects.filter((p) => p.featured));
  };

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

        <div className="projects-grid">
          {projects.map((project, index) => (
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
                />
                <div className="project-overlay">
                  <a
                    href={project.projectUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="project-preview-btn"
                  >
                    <i className="fas fa-external-link-alt"></i>
                    Voir le site
                  </a>
                </div>
              </div>

              <div className="project-content">
                <h3 className="project-title">{project.title}</h3>
                <p className="project-description">{project.description}</p>

                <div className="project-technologies">
                  {project.technologies.map((tech, techIndex) => (
                    <span key={techIndex} className="tech-tag">
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
                    <i className="fas fa-external-link-alt"></i>
                    Live Demo
                  </a>
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="project-link"
                    >
                      <i className="fab fa-github"></i>
                      Code Source
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
