import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import StepHeader from "./StepHeader";

describe("Step Header", () => {
  test("Render component", () => {
    const text = "helo";
    render(<StepHeader text={text} />);
    const component = screen.getByTestId("step-header");
    expect(component).toBeInTheDocument();
    // expect(screen.getByText(test))
    // expect(screen.getByTestId('step-header')).to
  });
});
