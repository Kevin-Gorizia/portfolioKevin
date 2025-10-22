import { render, screen } from "@testing-library/react";
import Header from "../../components/Header";

test("renders the header with the correct title", () => {
  render(<Header />);
  expect(screen.getByText(/portfolio/i)).toBeInTheDocument();
});
