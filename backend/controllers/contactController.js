import { z } from "zod";
import logger from "../utils/logger.js";

const contactSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  subject: z.string().min(1),
  message: z.string().min(1),
});

export const sendContactMessage = async (req, res, next) => {
  try {
    const data = contactSchema.parse(req.body);
    // TODO: implémenter envoi réel (nodemailer / provider) en utilisant les clés depuis process.env
    logger.info(`Contact reçu: ${data.email} — sujet: ${data.subject}`);
    return res.status(200).json({ success: true, message: "Message reçu" });
  } catch (error) {
    if (error?.name === "ZodError") {
      return res.status(400).json({ success: false, error: error.errors });
    }
    next(error);
  }
};
