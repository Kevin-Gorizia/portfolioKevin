const express = require("express");
const cors = require("cors");
const { PrismaClient } = require("@prisma/client");
const rateLimit = require("express-rate-limit");

const prisma = new PrismaClient();
const app = express();

// Middlewares globaux
app.use(cors());
app.use(express.json());

// --- Rate limiter pour l'endpoint contact ---
const contactLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 5, // max 5 requêtes par IP
  message: "Trop de requêtes depuis cette IP, réessayez plus tard.",
});

app.use("/api/contact", contactLimiter);

// --- Routes pour les projets ---
app.get("/api/projects", async (req, res) => {
  try {
    const projects = await prisma.project.findMany({
      orderBy: { createdAt: "desc" },
    });
    res.json(projects);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Erreur lors de la récupération des projets" });
  }
});

app.get("/api/projects/featured", async (req, res) => {
  try {
    const projects = await prisma.project.findMany({
      where: { featured: true },
      orderBy: { createdAt: "desc" },
    });
    res.json(projects);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Erreur lors de la récupération des projets" });
  }
});

app.post("/api/projects", async (req, res) => {
  try {
    const project = await prisma.project.create({ data: req.body });
    res.json(project);
  } catch (error) {
    res.status(500).json({ error: "Erreur lors de la création du projet" });
  }
});

// --- Routes pour les compétences ---
app.get("/api/skills", async (req, res) => {
  try {
    const skills = await prisma.skill.findMany();
    res.json(skills);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Erreur lors de la récupération des compétences" });
  }
});

// --- Endpoint contact ---
app.post("/api/contact", async (req, res) => {
  try {
    // ici tu peux gérer l'envoi d'email ou stockage en DB
    res.json({ message: "Message reçu !" });
  } catch (error) {
    res.status(500).json({ error: "Erreur lors de l'envoi du message" });
  }
});

// --- Démarrage du serveur ---
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Serveur backend démarré sur http://localhost:${PORT}`);
});
