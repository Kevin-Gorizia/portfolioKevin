import rateLimit from "express-rate-limit";

const limiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 10, // max 10 requêtes par IP
  message: "Trop de requêtes, réessayez plus tard.",
});

export default limiter;
