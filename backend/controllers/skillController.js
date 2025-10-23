import { PrismaClient } from "@prisma/client";
import { z } from "zod";
import logger from "../utils/logger.js";

const prisma = new PrismaClient();

const skillSchema = z.object({
  name: z.string().min(1),
  level: z.string().min(1),
  category: z.string().min(1),
  icon: z.string().optional(),
});

export const getSkills = async (req, res, next) => {
  try {
    const skills = await prisma.skill.findMany({
      orderBy: { name: "asc" },
    });
    res.json({ success: true, data: skills });
  } catch (error) {
    next(error);
  }
};

export const createSkill = async (req, res, next) => {
  try {
    const parsed = skillSchema.parse(req.body);
    const skill = await prisma.skill.create({ data: parsed });
    res.status(201).json({ success: true, data: skill });
  } catch (error) {
    if (error?.name === "ZodError") {
      logger.warn("Validation error createSkill", { details: error.errors });
      return res.status(400).json({ success: false, error: error.errors });
    }
    next(error);
  }
};
