import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// 🔹 Récupérer toutes les compétences
export const getSkills = async (req, res, next) => {
  try {
    const skills = await prisma.skill.findMany();
    res.json(skills);
  } catch (error) {
    next(error);
  }
};
