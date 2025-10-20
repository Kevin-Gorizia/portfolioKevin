import React, { useState, useEffect, useMemo, Suspense } from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import axios from "axios";
import PropTypes from "prop-types";
import {
  FaReact,
  FaNodeJs,
  FaPython,
  FaGitAlt,
  FaDocker,
  FaAws,
  FaCss3Alt,
  FaJsSquare,
} from "react-icons/fa";
import {
  SiMongodb,
  SiPostgresql,
  SiTypescript,
  SiExpress,
} from "react-icons/si";

const Skills = () => {
  const [skills, setSkills] = useState([]);
  const [activeCategory, setActiveCategory] = useState("all");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const demoSkills = useMemo(
    () => [
      { id: 1, name: "React", level: 90, category: "Frontend", icon: FaReact },
      {
        id: 2,
        name: "Node.js",
        level: 85,
        category: "Backend",
        icon: FaNodeJs,
      },
      {
        id: 3,
        name: "TypeScript",
        level: 80,
        category: "Frontend",
        icon: SiTypescript,
      },
      {
        id: 4,
        name: "JavaScript",
        level: 95,
        category: "Frontend",
        icon: FaJsSquare,
      },
      {
        id: 5,
        name: "HTML/CSS",
        level: 90,
        category: "Frontend",
        icon: FaCss3Alt,
      },
      {
        id: 6,
        name: "MongoDB",
        level: 75,
        category: "Database",
        icon: SiMongodb,
      },
      {
        id: 7,
        name: "PostgreSQL",
        level: 70,
        category: "Database",
        icon: SiPostgresql,
      },
      {
        id: 8,
        name: "Express.js",
        level: 80,
        category: "Backend",
        icon: SiExpress,
      },
      { id: 9, name: "Git", level: 85, category: "Tools", icon: FaGitAlt },
      { id: 10, name: "Docker", level: 60, category: "DevOps", icon: FaDocker },
      { id: 11, name: "AWS", level: 65, category: "Cloud", icon: FaAws },
      {
        id: 12,
        name: "Python",
        level: 70,
        category: "Backend",
        icon: FaPython,
      },
    ],
    []
  );

  const categories = useMemo(
    () => [
      { id: "all", name: "Toutes" },
      { id: "Frontend", name: "Frontend" },
      { id: "Backend", name: "Backend" },
      { id: "Database", name: "Bases de données" },
      { id: "Tools", name: "Outils" },
      { id: "DevOps", name: "DevOps" },
      { id: "Cloud", name: "Cloud" },
    ],
    []
  );

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const response = await axios.get("http://localhost:5000/api/skills");
        setSkills(response.data);
      } catch (error) {
        console.error("Erreur lors du chargement des compétences:", error);
        setError(error.message);
        setSkills(demoSkills);
      } finally {
        setIsLoading(false);
      }
    };
    fetchSkills();
  }, [demoSkills]);

  const filteredSkills = useMemo(
    () =>
      activeCategory === "all"
        ? skills.length
          ? skills
          : demoSkills
        : (skills.length ? skills : demoSkills).filter(
            (skill) => skill.category === activeCategory
          ),
    [activeCategory, skills, demoSkills]
  );

  const SkillsStats = () => (
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
  );

  if (isLoading) {
    return <div className="loading">Chargement des compétences...</div>;
  }

  if (error) {
    return <div className="error">Erreur: {error}</div>;
  }

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

        <motion.div
          className="skills-grid"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          {filteredSkills.map((skill, index) => {
            const Icon = skill.icon;
            return (
              <motion.div
                key={skill.id}
                className="skill-card"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
              >
                <div className="skill-header">
                  <Suspense fallback={<div>Chargement...</div>}>
                    <Icon className="skill-icon" />
                  </Suspense>
                  <h3 className="skill-name">{skill.name}</h3>
                </div>

                <div className="skill-level">
                  <div className="skill-level-bar">
                    <motion.div
                      className="skill-level-progress"
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level}%` }}
                      transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
                    />
                  </div>
                  <span className="skill-percentage">{skill.level}%</span>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        <SkillsStats />
      </div>
    </section>
  );
};

Skills.propTypes = {
  skills: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      level: PropTypes.number.isRequired,
      category: PropTypes.string.isRequired,
      icon: PropTypes.elementType.isRequired,
    })
  ),
};

export default Skills;
