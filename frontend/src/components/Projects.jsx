import React, { useState, useEffect, useMemo, Suspense } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import ProjectCard from "./ProjectCard";
import { motion } from "framer-motion";

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const demoProjects = useMemo(
    () => [
      {
        id: 1,
        title: "Portfolio Kevin",
        description:
          "Un site moderne pour présenter mes projets et compétences avec un design élégant et responsive.",
        imageUrl: "/images/portfolio.jpg",
        projectUrl: "https://kevin-gorizia.com",
        githubUrl: "https://github.com/Kevin-Gorizia/portfolioKevin",
        technologies: ["React", "Vite", "CSS3", "JavaScript"],
        featured: true,
      },
      {
        id: 2,
        title: "Application E-commerce",
        description:
          "Plateforme de vente en ligne complète avec panier, paiement et administration.",
        imageUrl: "/images/ecommerce.jpg",
        projectUrl: "#",
        githubUrl: "#",
        technologies: ["React", "Node.js", "MongoDB", "Stripe"],
        featured: true,
      },
      {
        id: 3,
        title: "Application de Gestion",
        description:
          "Outil de gestion pour entreprises avec tableau de bord et rapports avancés.",
        imageUrl: "/images/dashboard.jpg",
        projectUrl: "#",
        githubUrl: "#",
        technologies: ["Vue.js", "Express", "PostgreSQL", "Chart.js"],
        featured: false,
      },
    ],
    []
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const response = await axios.get("http://localhost:5000/api/projects");

        // Si l'API retourne des données, on les utilise
        if (response.data && response.data.length > 0) {
          setProjects(response.data);
        } else {
          // Sinon, on utilise les projets de démo
          setProjects(demoProjects);
        }
      } catch (error) {
        console.error("Erreur lors du chargement des projets:", error);
        setError("Impossible de charger les projets depuis le serveur");
        // En cas d'erreur, on utilise les projets de démo
        setProjects(demoProjects);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [demoProjects]);

  // Animation variants pour framer-motion
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  if (isLoading) {
    return (
      <section id="projects" className="section projects-section">
        <div className="container">
          <div className="loading">Chargement des projets...</div>
        </div>
      </section>
    );
  }

  return (
    <section id="projects" className="section projects-section">
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="section-title">Mes Projets Récents</h2>
          <p className="section-subtitle">
            Découvrez une sélection de mes réalisations les plus significatives
          </p>
        </motion.div>

        {error && (
          <motion.div
            className="error-message"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <p>{error}</p>
            <p className="demo-notice">
              Affichage des projets de démonstration
            </p>
          </motion.div>
        )}

        <Suspense
          fallback={<div className="loading">Chargement des projets...</div>}
        >
          <motion.div
            className="projects-grid"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {projects.map((project, index) => (
              <motion.div
                key={project.id || project._id}
                variants={itemVariants}
                whileHover={{
                  y: -8,
                  transition: { duration: 0.3 },
                }}
              >
                <ProjectCard project={project} index={index} />
              </motion.div>
            ))}
          </motion.div>
        </Suspense>

        {projects.length === 0 && !isLoading && (
          <motion.div
            className="no-projects"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <p>Aucun projet à afficher pour le moment.</p>
          </motion.div>
        )}
      </div>
    </section>
  );
};

// PropTypes pour le composant Projects
Projects.propTypes = {
  // Vous pouvez ajouter des props si nécessaire
};

export default Projects;
