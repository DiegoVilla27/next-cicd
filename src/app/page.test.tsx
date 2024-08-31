import { render } from "@testing-library/react";
import Home from "./page";
import styles from "./page.module.css";

it("should render the main container with the correct class", () => {
  const { container } = render(<Home />);
  const mainElement = container.querySelector("main");
  expect(mainElement).toHaveClass(styles.main);
});
