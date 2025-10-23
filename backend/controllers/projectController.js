import { PrismaClient } from "@prisma/client";
import { z } from "zod";
import logger from "../utils/logger.js";

const prisma = new PrismaClient();

const projectSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  imageUrl: z.string().optional(),
  projectUrl: z.string().optional(),
  githubUrl: z.string().nullable().optional(),
  technologies: z.array(z.string()).optional(),
  featured: z.boolean().optional(),
});

export const getProjects = async (req, res, next) => {
  try {
    const projects = await prisma.project.findMany({
      orderBy: { createdAt: "desc" },
    });
    res.json({ success: true, data: projects });
  } catch (error) {
    next(error);
  }
};

export const getFeaturedProjects = async (req, res, next) => {
  try {
    const projects = await prisma.project.findMany({
      where: { featured: true },
      orderBy: { createdAt: "desc" },
    });
    res.json({ success: true, data: projects });
  } catch (error) {
    next(error);
  }
};

export const createProject = async (req, res, next) => {
  try {
    const parsed = projectSchema.parse(req.body);
    const data = {
      title: parsed.title,
      description: parsed.description,
      imageUrl: parsed.imageUrl ?? "",
      projectUrl: parsed.projectUrl ?? "",
      githubUrl: parsed.githubUrl ?? null,
      technologies: parsed.technologies ?? [],
      featured: parsed.featured ?? false,
    };
    const project = await prisma.project.create({ data });
    res.status(201).json({ success: true, data: project });
  } catch (error) {
    if (error?.name === "ZodError") {
      logger.warn("Validation error createProject", { details: error.errors });
      return res.status(400).json({ success: false, error: error.errors });
    }
    next(error);
  }
};
