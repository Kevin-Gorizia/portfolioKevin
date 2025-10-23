import React from "react";
import { render, screen } from "@testing-library/react";
import App from "../../App.jsx";

// Mock pour le fichier CSS
jest.mock("../../App.css", () => ({}));

// Mock de react-router-dom
jest.mock("react-router-dom", () => ({
  BrowserRouter: ({ children }) => <div>{children}</div>,
  Routes: ({ children }) => <div>{children}</div>,
  Route: ({ element }) => element,
  Link: ({ children, ...props }) => <a {...props}>{children}</a>,
  NavLink: ({ children, ...props }) => <a {...props}>{children}</a>,
}));

// Mock des composants enfants
jest.mock("../../components/Header", () => ({
  __esModule: true,
  default: () => <header data-testid="header-mock">Header</header>,
}));

jest.mock("../../components/Hero", () => ({
  __esModule: true,
  default: () => <div data-testid="hero-mock">Hero Section</div>,
}));

jest.mock("../../components/Projects", () => ({
  __esModule: true,
  default: () => <div data-testid="projects-mock">Projects Section</div>,
}));

jest.mock("../../components/Skills", () => ({
  __esModule: true,
  default: () => <div data-testid="skills-mock">Skills Section</div>,
}));

jest.mock("../../components/Contact", () => ({
  __esModule: true,
  default: () => <div data-testid="contact-mock">Contact Section</div>,
}));

jest.mock("../../components/Footer", () => ({
  __esModule: true,
  default: () => <footer data-testid="footer-mock">Footer</footer>,
}));

// Mock pour framer-motion - VERSION CORRIGÉE
jest.mock("framer-motion", () => {
  // Définir les composants motion sans utiliser React directement
  const createMotionComponent = (elementType) => {
    const Component = ({
      children,
      whileInView,
      initial,
      animate,
      transition,
      ...props
    }) => {
      // Utiliser React.createElement indirectement via le contexte du test
      const React = require("react");
      return React.createElement(elementType, props, children);
    };
    return Component;
  };

  return {
    motion: {
      div: createMotionComponent("div"),
      section: createMotionComponent("section"),
      h2: createMotionComponent("h2"),
      h3: createMotionComponent("h3"),
      h4: createMotionComponent("h4"),
      p: createMotionComponent("p"),
      footer: createMotionComponent("footer"),
      button: createMotionComponent("button"),
      span: createMotionComponent("span"),
    },
  };
});

describe("App Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders the main app with all sections", () => {
    render(<App />);

    expect(screen.getByTestId("header-mock")).toBeInTheDocument();
    expect(screen.getByTestId("hero-mock")).toBeInTheDocument();
    expect(screen.getByTestId("projects-mock")).toBeInTheDocument();
    expect(screen.getByTestId("skills-mock")).toBeInTheDocument();
    expect(screen.getByTestId("contact-mock")).toBeInTheDocument();
    expect(screen.getByTestId("footer-mock")).toBeInTheDocument();
  });
});
