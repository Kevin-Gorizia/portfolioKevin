import logger from "../utils/logger.js";

export const errorHandler = (err, req, res, next) => {
  logger.error(`❌ Erreur backend : ${err?.message || "unknown"}`, {
    stack: err?.stack,
  });
  const status = err?.status || 500;
  res.status(status).json({
    success: false,
    error: {
      message: err?.message || "Erreur serveur",
      code: err?.code || "INTERNAL_ERROR",
    },
  });
};
