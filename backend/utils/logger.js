import path from "path";
import { fileURLToPath } from "url";
import { createLogger, format, transports } from "winston";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const logDir = path.join(__dirname, "..", "logs");

const { combine, timestamp, printf } = format;
const logFormat = printf(({ level, message, timestamp, ...meta }) => {
  const metaStr = Object.keys(meta).length ? JSON.stringify(meta) : "";
  return `${timestamp} [${level}] ${message} ${metaStr}`;
});

const level = process.env.NODE_ENV === "production" ? "warn" : "info";

const logger = createLogger({
  level,
  format: combine(timestamp(), logFormat),
  transports: [
    new transports.File({
      filename: path.join(logDir, "combined.log"),
      level: "info",
    }),
    new transports.File({
      filename: path.join(logDir, "error.log"),
      level: "error",
    }),
  ],
});

if (process.env.NODE_ENV !== "production") {
  logger.add(
    new transports.Console({
      format: format.combine(format.colorize(), logFormat),
    })
  );
}

export default logger;
