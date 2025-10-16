import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// 🔹 Récupérer tous les projets
export const getProjects = async (req, res, next) => {
  try {
    const projects = await prisma.project.findMany({
      orderBy: { createdAt: "desc" },
    });
    res.json(projects);
  } catch (error) {
    next(error);
  }
};

// 🔹 Récupérer les projets "en vedette"
export const getFeaturedProjects = async (req, res, next) => {
  try {
    const projects = await prisma.project.findMany({
      where: { featured: true },
      orderBy: { createdAt: "desc" },
    });
    res.json(projects);
  } catch (error) {
    next(error);
  }
};

// 🔹 Ajouter un projet
export const createProject = async (req, res, next) => {
  try {
    const project = await prisma.project.create({
      data: req.body,
    });
    res.status(201).json(project);
  } catch (error) {
    next(error);
  }
};
