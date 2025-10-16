import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import logger from "./utils/logger.js";
import { requestLogger, limiter, errorHandler } from "./middlewares/index.js";

// Controllers
import {
  getAllProjects,
  getFeaturedProjects,
  createProject,
} from "./controllers/projectController.js";
import { getAllSkills } from "./controllers/skillController.js";

dotenv.config();

const app = express();

// ===== MIDDLEWARES =====
app.use(cors());
app.use(express.json());
app.use(requestLogger);

// ===== LOG DEMARRAGE =====
logger.info("🚀 Initialisation du serveur...");

// ===== ROUTE TEST =====
app.get("/", (req, res) => {
  logger.info("Nouvelle requête sur /");
  res.send("Bienvenue sur mon API Portfolio !");
});

// ===== PROJECT ROUTES =====
app.get("/api/projects", getAllProjects);
app.get("/api/projects/featured", getFeaturedProjects);
app.post("/api/projects", createProject);

// ===== SKILL ROUTES =====
app.get("/api/skills", getAllSkills);

// ===== CONTACT ROUTE (exemple avec rate limiter) =====
import rateLimit from "express-rate-limit";
import { sendContactMessage } from "./controllers/contactController.js";

const contactLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 5, // max 5 requêtes par IP
  message: "Trop de requêtes depuis cette IP, réessayez plus tard.",
});

app.post("/api/contact", contactLimiter, sendContactMessage);

// ===== ERROR HANDLER =====
app.use(errorHandler);

// ===== SERVER =====
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  logger.info(`✅ Serveur lancé sur http://localhost:${PORT}`);
});
