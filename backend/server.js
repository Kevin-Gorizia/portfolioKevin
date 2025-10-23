import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import compression from "compression";
import logger from "./utils/logger.js";
import { requestLogger, limiter, errorHandler } from "./middlewares/index.js";

// Controllers
import {
  getProjects,
  getFeaturedProjects,
  createProject,
} from "./controllers/projectController.js";
import { getSkills } from "./controllers/skillController.js";
import { sendContactMessage } from "./controllers/contactController.js";

dotenv.config();

const app = express();

// ===== MIDDLEWARES =====
const allowedOrigins = (process.env.ALLOWED_ORIGINS || "http://localhost:5173")
  .split(",")
  .map((s) => s.trim());

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin))
        return callback(null, true);
      callback(new Error("Origin non autorisée"));
    },
    optionsSuccessStatus: 200,
  })
);
app.use(helmet());
app.use(compression());
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
app.get("/api/projects", getProjects);
app.get("/api/projects/featured", getFeaturedProjects);
app.post("/api/projects", createProject);

// ===== SKILL ROUTES =====
app.get("/api/skills", getSkills);

// ===== CONTACT ROUTE =====
app.post("/api/contact", limiter, sendContactMessage);

// ===== ERROR HANDLER =====
app.use(errorHandler);

// ===== SERVER =====
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  logger.info(`✅ Serveur lancé sur http://localhost:${PORT}`);
});
