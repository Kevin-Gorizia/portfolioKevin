import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ProjectCard from "../../components/ProjectCard";

// Mock data qui correspond à votre structure réelle
const mockProject = {
  _id: "1",
  title: "Portfolio Kevin",
  description: "Un site moderne pour présenter mes projets",
  image: "/portfolio.jpg",
  technologies: ["React", "Node.js", "Express"],
  projectUrl: "https://portfolio-kevin.com",
  githubUrl: "https://github.com/kevin/portfolio",
};

describe("🧩 ProjectCard Component", () => {
  test("affiche correctement le titre et la description", () => {
    render(<ProjectCard project={mockProject} />);

    expect(screen.getByText("Portfolio Kevin")).toBeInTheDocument();
    expect(
      screen.getByText(/Un site moderne pour présenter mes projets/i)
    ).toBeInTheDocument();
  });

  test("affiche bien l'image du projet", () => {
    render(<ProjectCard project={mockProject} />);

    const image = screen.getByRole("img");
    expect(image).toHaveAttribute("src", mockProject.image);
    expect(image).toHaveAttribute("alt", mockProject.title);
  });

  test("affiche les technologies utilisées", () => {
    render(<ProjectCard project={mockProject} />);

    expect(screen.getByText("React")).toBeInTheDocument();
    expect(screen.getByText("Node.js")).toBeInTheDocument();
    expect(screen.getByText("Express")).toBeInTheDocument();
  });

  test("affiche les liens vers le site et GitHub", () => {
    render(<ProjectCard project={mockProject} />);

    const projectLink = screen.getByRole("link", { name: /voir le projet/i });
    const githubLink = screen.getByRole("link", { name: /voir sur github/i });

    expect(projectLink).toHaveAttribute("href", mockProject.projectUrl);
    expect(projectLink).toHaveAttribute("target", "_blank");
    expect(githubLink).toHaveAttribute("href", mockProject.githubUrl);
    expect(githubLink).toHaveAttribute("target", "_blank");
  });

  test("le clic sur le lien du projet fonctionne", async () => {
    render(<ProjectCard project={mockProject} />);
    const user = userEvent.setup();

    const projectLink = screen.getByRole("link", { name: /voir le projet/i });
    await user.click(projectLink);

    expect(projectLink).toHaveAttribute("href", mockProject.projectUrl);
  });
});
