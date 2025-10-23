// components/Footer.jsx
import React from "react";
import { motion } from "framer-motion";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          {/* Colonne 1: Présentation */}
          <motion.div
            className="footer-col"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="footer-logo">Portfolio</h3>
            <p className="footer-description">
              Développeur web passionné par la création d'applications modernes
              et performantes. Toujours à la recherche de nouveaux défis et
              opportunités.
            </p>
            <div className="social-links">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="social-link"
                aria-label="GitHub"
              >
                <i className="fab fa-github"></i>
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="social-link"
                aria-label="LinkedIn"
              >
                <i className="fab fa-linkedin"></i>
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="social-link"
                aria-label="Twitter"
              >
                <i className="fab fa-twitter"></i>
              </a>
              <a
                href="mailto:votre.email@portfolio.com"
                className="social-link"
                aria-label="Email"
              >
                <i className="fas fa-envelope"></i>
              </a>
            </div>
          </motion.div>

          {/* Colonne 2: Liens rapides */}
          <motion.div
            className="footer-col"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h4 className="footer-title">Navigation</h4>
            <ul className="footer-links">
              <li>
                <a
                  href="#home"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection("home");
                  }}
                >
                  Accueil
                </a>
              </li>
              <li>
                <a
                  href="#projects"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection("projects");
                  }}
                >
                  Projets
                </a>
              </li>
              <li>
                <a
                  href="#skills"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection("skills");
                  }}
                >
                  Compétences
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection("contact");
                  }}
                >
                  Contact
                </a>
              </li>
            </ul>
          </motion.div>

          {/* Colonne 3: Services */}
          <motion.div
            className="footer-col"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h4 className="footer-title">Services</h4>
            <ul className="footer-links">
              <li>
                <a href="#services">Développement Frontend</a>
              </li>
              <li>
                <a href="#services">Développement Backend</a>
              </li>
              <li>
                <a href="#services">Applications React</a>
              </li>
              <li>
                <a href="#services">API REST</a>
              </li>
              <li>
                <a href="#services">Bases de données</a>
              </li>
            </ul>
          </motion.div>

          {/* Colonne 4: Contact */}
          <motion.div
            className="footer-col"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h4 className="footer-title">Contact</h4>
            <div className="contact-info">
              <div className="contact-item">
                <i className="fas fa-envelope"></i>
                <span>hkevin.gorizia@gmail.com</span>
              </div>
              <div className="contact-item">
                <i className="fas fa-phone"></i>
                <span>+33 6 65 14 84 20</span>
              </div>
              <div className="contact-item">
                <i className="fas fa-map-marker-alt"></i>
                <span>Paris, France</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          className="footer-bottom"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <div className="footer-bottom-content">
            <div className="copyright">
              &copy; {currentYear} Portfolio. Tous droits réservés.
            </div>
            <div className="footer-bottom-links">
              <a href="#privacy">Politique de confidentialité</a>
              <a href="#terms">Conditions d'utilisation</a>
              <button
                className="back-to-top"
                onClick={scrollToTop}
                aria-label="Retour en haut"
              >
                <i className="fas fa-chevron-up"></i>
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
