import logger from "./utils/logger.js";

export const errorHandler = (err, req, res, next) => {
  logger.error(`❌ Erreur backend : ${err.message}`);
  res.status(500).json({
    message: "Erreur serveur",
    details: err.message,
  });
};
