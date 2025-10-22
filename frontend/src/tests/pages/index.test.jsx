import { render, screen } from "@testing-library/react";
import HomePage from "./index.jsx";

// If using Jest, no import is needed for 'test' as it's global.
// If using Vitest, import 'test' and 'expect' as follows:
import { test, expect } from "vitest";

test("renders the homepage with a welcome message", () => {
  render(<HomePage />);
  const welcomeMessage = screen.getByText(/Bienvenue sur mon portfolio/i);
  expect(welcomeMessage).toBeInTheDocument();
});
