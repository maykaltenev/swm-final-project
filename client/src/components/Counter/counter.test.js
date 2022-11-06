import { render, screen } from "@testing-library/react";
import Counter from "./Counter";

test("<Counter/>", () => {
  render(<Counter />);

  const plusButton = screen.getByTestId("plusbutton");
});
