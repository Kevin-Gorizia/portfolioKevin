import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  // --- Ajout de projets ---
  const projects = [
    {
      title: "Portfolio Kevin",
      description:
        "Mon site portfolio pour présenter mes projets et compétences.",
      imageUrl: "/images/portfolio.png",
      projectUrl: "https://kevinsite.com",
      githubUrl: "https://github.com/Kevin-Gorizia/portfolioKevin",
      technologies: ["React", "Node.js", "Express"],
      featured: true,
    },
    {
      title: "Site E-commerce",
      description: "Un petit site e-commerce en React et Node.js.",
      imageUrl: "/images/ecommerce.png",
      projectUrl: "https://myecommerce.com",
      githubUrl: null,
      technologies: ["React", "Node.js", "Express", "Stripe"],
      featured: false,
    },
    {
      title: "Royal Massage",
      description:
        "Site de présentation pour Royal Massage avec booking et design moderne.",
      imageUrl: "/images/royal-massage.png", // capture d'écran du site
      projectUrl: "https://royal-massage-front.vercel.app/",
      githubUrl: null, // lien GitHub si dispo
      technologies: ["React", "Vite", "CSS", "JavaScript"],
      featured: true,
    },
  ];

  for (const project of projects) {
    await prisma.project.create({ data: project });
  }

  // --- Ajout de compétences ---
  const skills = [
    {
      name: "React",
      level: "Expert",
      category: "Frontend",
      icon: "react-icon.png",
    },
    {
      name: "Node.js",
      level: "Avancé",
      category: "Backend",
      icon: "node-icon.png",
    },
    {
      name: "Prisma",
      level: "Intermédiaire",
      category: "Backend",
      icon: "prisma-icon.png",
    },
    {
      name: "Tailwind CSS",
      level: "Avancé",
      category: "Frontend",
      icon: "tailwind-icon.png",
    },
    { name: "Git", level: "Avancé", category: "Tools", icon: "git-icon.png" },
  ];

  for (const skill of skills) {
    await prisma.skill.create({ data: skill });
  }

  console.log("✅ Seed terminé !");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
