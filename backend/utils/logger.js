import { createLogger, format, transports } from "winston";
import path from "path";
import fs from "fs";

const __dirname = path.resolve();

// 🔹 Crée le dossier logs s’il n’existe pas
const logDir = path.join(__dirname, "logs");
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}

// 🔹 Définition du format de log
const logFormat = format.combine(
  format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
  format.printf(
    (info) => `${info.timestamp} [${info.level.toUpperCase()}]: ${info.message}`
  )
);

// 🔹 Création du logger principal
const logger = createLogger({
  level: "info",
  format: logFormat,
  transports: [
    // 🗂️ Fichier pour tous les logs
    new transports.File({
      filename: path.join(logDir, "combined.log"),
      level: "info",
    }),

    // 🟥 Fichier séparé pour les erreurs
    new transports.File({
      filename: path.join(logDir, "error.log"),
      level: "error",
    }),
  ],
});

// 🔹 En mode dev → affiche aussi dans la console avec couleur
if (process.env.NODE_ENV !== "production") {
  logger.add(
    new transports.Console({
      format: format.combine(format.colorize(), logFormat),
    })
  );
}

export default logger;
