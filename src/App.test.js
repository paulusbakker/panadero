import { render, screen } from "@testing-library/react";
import App from "./App";

describe("App", () => {
  test("toont basisbediening voor recepten", () => {
    render(<App />);
    expect(screen.getByLabelText(/recept:/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /nieuw/i })).toBeInTheDocument();
  });
});
