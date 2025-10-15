// components/Skills.jsx
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import axios from "axios";

const Skills = () => {
  const [skills, setSkills] = useState([]);
  const [activeCategory, setActiveCategory] = useState("all");

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/skills");
        setSkills(response.data);
      } catch (error) {
        console.error("Erreur lors du chargement des compétences:", error);
        // Données de démo
        setDemoSkills();
      }
    };

    fetchSkills();
  }, []);

  const setDemoSkills = () => {
    const demoSkills = [
      {
        id: 1,
        name: "React",
        level: "90",
        category: "Frontend",
        icon: "react",
      },
      {
        id: 2,
        name: "Node.js",
        level: "85",
        category: "Backend",
        icon: "nodejs",
      },
      {
        id: 3,
        name: "TypeScript",
        level: "80",
        category: "Frontend",
        icon: "typescript",
      },
      {
        id: 4,
        name: "JavaScript",
        level: "95",
        category: "Frontend",
        icon: "javascript",
      },
      {
        id: 5,
        name: "HTML/CSS",
        level: "90",
        category: "Frontend",
        icon: "css3",
      },
      {
        id: 6,
        name: "MongoDB",
        level: "75",
        category: "Database",
        icon: "mongodb",
      },
      {
        id: 7,
        name: "PostgreSQL",
        level: "70",
        category: "Database",
        icon: "postgresql",
      },
      {
        id: 8,
        name: "Express.js",
        level: "80",
        category: "Backend",
        icon: "express",
      },
      { id: 9, name: "Git", level: "85", category: "Tools", icon: "git" },
      {
        id: 10,
        name: "Docker",
        level: "60",
        category: "DevOps",
        icon: "docker",
      },
      { id: 11, name: "AWS", level: "65", category: "Cloud", icon: "aws" },
      {
        id: 12,
        name: "Python",
        level: "70",
        category: "Backend",
        icon: "python",
      },
    ];
    setSkills(demoSkills);
  };

  const categories = [
    { id: "all", name: "Toutes" },
    { id: "Frontend", name: "Frontend" },
    { id: "Backend", name: "Backend" },
    { id: "Database", name: "Bases de données" },
    { id: "Tools", name: "Outils" },
    { id: "DevOps", name: "DevOps" },
    { id: "Cloud", name: "Cloud" },
  ];

  const filteredSkills =
    activeCategory === "all"
      ? skills
      : skills.filter((skill) => skill.category === activeCategory);

  const getSkillIcon = (iconName) => {
    const iconMap = {
      react: "fab fa-react",
      nodejs: "fab fa-node-js",
      typescript: "fas fa-code",
      javascript: "fab fa-js-square",
      css3: "fab fa-css3-alt",
      mongodb: "fas fa-database",
      postgresql: "fas fa-database",
      express: "fas fa-server",
      git: "fab fa-git-alt",
      docker: "fab fa-docker",
      aws: "fab fa-aws",
      python: "fab fa-python",
    };
    return iconMap[iconName] || "fas fa-code";
  };

  return (
    <section id="skills" className="section">
      <div className="container">
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Mes Compétences
        </motion.h2>

        <motion.p
          className="section-subtitle"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          Technologies et outils que j'utilise pour créer des applications
          modernes
        </motion.p>

        {/* Filtres par catégorie */}
        <motion.div
          className="skills-filters"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {categories.map((category) => (
            <button
              key={category.id}
              className={`filter-btn ${
                activeCategory === category.id ? "active" : ""
              }`}
              onClick={() => setActiveCategory(category.id)}
            >
              {category.name}
            </button>
          ))}
        </motion.div>

        {/* Grille des compétences */}
        <motion.div
          className="skills-grid"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          {filteredSkills.map((skill, index) => (
            <motion.div
              key={skill.id}
              className="skill-card"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{
                scale: 1.05,
                transition: { duration: 0.2 },
              }}
            >
              <div className="skill-header">
                <div className="skill-icon">
                  <i className={getSkillIcon(skill.icon)}></i>
                </div>
                <h3 className="skill-name">{skill.name}</h3>
              </div>

              <div className="skill-level">
                <div className="skill-level-bar">
                  <motion.div
                    className="skill-level-progress"
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.level}%` }}
                    transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
                  ></motion.div>
                </div>
                <span className="skill-percentage">{skill.level}%</span>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Statistiques */}
        <motion.div
          className="skills-stats"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="stat-item">
            <div className="stat-number">50+</div>
            <div className="stat-label">Projets réalisés</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">3+</div>
            <div className="stat-label">Années d'expérience</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">100%</div>
            <div className="stat-label">Satisfaction client</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">24/7</div>
            <div className="stat-label">Support disponible</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
