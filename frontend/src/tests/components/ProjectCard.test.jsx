/**
 * @file ProjectCard.test.jsx
 * @description Tests unitaires complets pour le composant ProjectCard
 */

import "@testing-library/jest-dom"; // ✅ matchers supplémentaires
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ProjectCard from "../../components/ProjectCard"; // ✅ Assure-toi que le chemin est correct

// Mock Next.js Image component
jest.mock("next/image", () => ({
  __esModule: true,
  default: (props) => <img {...props} />,
}));

describe("🧩 ProjectCard Component", () => {
  const mockProject = {
    id: 1,
    title: "Portfolio Kevin",
    description: "Un site moderne pour présenter mes projets.",
    imageUrl: "/images/portfolio.png",
    projectUrl: "https://kevinsite.com",
    githubUrl: "https://github.com/Kevin-Gorizia/portfolioKevin",
    technologies: "React, Node.js, Express",
  };

  const mockProjectNoGithub = {
    id: 2,
    title: "Royal Massage",
    description: "Site vitrine avec un design moderne et fluide.",
    imageUrl: "/images/royal-massage.png",
    projectUrl: "https://royal-massage-front.vercel.app/",
    githubUrl: null,
    technologies: "React, CSS, JavaScript",
  };

  test("affiche correctement le titre et la description", () => {
    render(<ProjectCard project={mockProject} />);
    expect(screen.getByText(/Portfolio Kevin/i)).toBeInTheDocument();
    expect(
      screen.getByText(/Un site moderne pour présenter mes projets/i)
    ).toBeInTheDocument();
  });

  test("affiche bien l'image du projet", () => {
    render(<ProjectCard project={mockProject} />);
    const image = screen.getByRole("img");
    expect(image).toHaveAttribute("src", mockProject.imageUrl);
    expect(image).toHaveAttribute("alt", mockProject.title);
  });

  test("affiche les technologies utilisées", () => {
    render(<ProjectCard project={mockProject} />);
    expect(screen.getByText(/React/i)).toBeInTheDocument();
    expect(screen.getByText(/Node.js/i)).toBeInTheDocument();
    expect(screen.getByText(/Express/i)).toBeInTheDocument();
  });

  test("affiche les liens vers le site et GitHub", () => {
    render(<ProjectCard project={mockProject} />);
    const projectLink = screen.getByRole("link", { name: /voir le projet/i });
    const githubLink = screen.getByRole("link", { name: /voir sur github/i });

    expect(projectLink).toHaveAttribute("href", mockProject.projectUrl);
    expect(projectLink).toHaveAttribute("target", "_blank");
    expect(githubLink).toHaveAttribute("href", mockProject.githubUrl);
  });

  test("n'affiche pas le lien GitHub si githubUrl est null", () => {
    render(<ProjectCard project={mockProjectNoGithub} />);
    const githubLink = screen.queryByText(/voir sur github/i);
    expect(githubLink).toBeNull();
  });

  test("le clic sur le lien du projet fonctionne", async () => {
    render(<ProjectCard project={mockProject} />);
    const user = userEvent.setup();
    const projectLink = screen.getByRole("link", { name: /voir le projet/i });

    await user.click(projectLink);

    expect(projectLink).toHaveAttribute("href", mockProject.projectUrl);
    expect(projectLink).toHaveAttribute("target", "_blank");
  });

  test("contient un titre, une description et des liens accessibles", () => {
    render(<ProjectCard project={mockProject} />);
    expect(screen.getByRole("img")).toBeVisible();
    expect(screen.getByText(/Portfolio Kevin/i)).toBeVisible();
    expect(screen.getByText(/présenter mes projets/i)).toBeVisible();
  });
});
