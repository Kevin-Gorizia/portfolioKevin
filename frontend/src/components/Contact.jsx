// components/Contact.jsx
import React, { useState } from "react";
import emailjs from "emailjs-com";
import { motion } from "framer-motion";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      // Remplacez ces IDs par vos propres identifiants EmailJS
      const result = await emailjs.send(
        "service_yourserviceid", // Service ID
        "template_yourtemplateid", // Template ID
        formData,
        "your_public_key" // Public Key
      );

      setSubmitStatus("success");
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (error) {
      console.error("Erreur envoi email:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="section contact">
      <div className="container">
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          style={{ color: "white" }}
        >
          Contactez-moi
        </motion.h2>

        <motion.div
          className="contact-content"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="contact-info">
            <h3>Travaillons ensemble</h3>
            <p>
              Vous avez un projet en tête ? Discutons de la façon dont je peux
              vous aider à le concrétiser.
            </p>

            <div className="contact-methods">
              <div className="contact-method">
                <i className="fas fa-envelope"></i>
                <div>
                  <h4>Email</h4>
                  <p>votre.email@portfolio.com</p>
                </div>
              </div>

              <div className="contact-method">
                <i className="fas fa-phone"></i>
                <div>
                  <h4>Téléphone</h4>
                  <p>+33 6 12 34 56 78</p>
                </div>
              </div>

              <div className="contact-method">
                <i className="fas fa-map-marker-alt"></i>
                <div>
                  <h4>Localisation</h4>
                  <p>Paris, France</p>
                </div>
              </div>
            </div>
          </div>

          <form className="contact-form" onSubmit={handleSubmit}>
            {submitStatus === "success" && (
              <div className="alert alert-success">
                <i className="fas fa-check-circle"></i>
                Message envoyé avec succès ! Je vous répondrai dans les plus
                brefs délais.
              </div>
            )}

            {submitStatus === "error" && (
              <div className="alert alert-error">
                <i className="fas fa-exclamation-circle"></i>
                Une erreur est survenue. Veuillez réessayer ou me contacter
                directement par email.
              </div>
            )}

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="name">Nom complet *</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="subject">Sujet *</label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="message">Message *</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows="6"
                required
              ></textarea>
            </div>

            <button
              type="submit"
              className="btn btn-primary"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <i className="fas fa-spinner fa-spin"></i>
                  Envoi en cours...
                </>
              ) : (
                <>
                  <i className="fas fa-paper-plane"></i>
                  Envoyer le message
                </>
              )}
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
