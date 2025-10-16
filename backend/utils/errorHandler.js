export const errorHandler = (err, req, res, next) => {
  console.error("❌ Erreur backend :", err.message);
  res.status(500).json({
    message: "Erreur serveur",
    details: err.message,
  });
};
