const express = require("express");
const cors = require("cors");
const { PrismaClient } = require("@prisma/client");
const path = require("path");

const prisma = new PrismaClient();
const app = express();

// Middleware global pour gérer les erreurs
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Une erreur interne est survenue." });
});

app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

app.use(express.json());

// 🔹 Route racine pour test
app.get("/", (req, res) => {
  res.send("🚀 Backend en marche !");
});

// 🔹 Routes pour les projets
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

// 🔹 Routes pour les compétences
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

// 🔹 Optionnel : servir le frontend React (si build existant)
// app.use(express.static(path.join(__dirname, "../frontend/dist")));
// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
// });

// 🔹 Lancer le serveur

// Middleware global pour gérer les erreurs
app.use((err, req, res, next) => {
  console.error(err.stack); // affiche l’erreur dans le terminal
  res.status(500).json({ error: "Une erreur est survenue !" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Serveur backend démarré sur http://localhost:${PORT}`);
});
