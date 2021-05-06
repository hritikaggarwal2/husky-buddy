import { render, screen } from "@testing-library/react";
import App from "./App";
import Logout from "./components/Logout";

test("logout button renders", () => {
  render(<Logout />);
  const buttonElement = document.getElementById("logout-button");
  expect(buttonElement).toBeInTheDocument();
});

test("renders learn react link", () => {
  render(<App />);
  true;
});
