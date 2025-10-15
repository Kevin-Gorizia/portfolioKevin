const express = require("express");
const cors = require("cors");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();
const app = express();

app.use(cors());
app.use(express.json());

// Routes pour les projets
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
    const project = await prisma.project.create({
      data: req.body,
    });
    res.json(project);
  } catch (error) {
    res.status(500).json({ error: "Erreur lors de la création du projet" });
  }
});

// Routes pour les compétences
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

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Serveur backend démarré sur http://localhost:${PORT}`);
});
