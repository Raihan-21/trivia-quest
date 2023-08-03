// import {describe}
import { render, screen, fireEvent } from "@testing-library/react";
import ContinueButton from "./ContinueButton";

import "@testing-library/jest-dom";

describe("Continue Button", () => {
  test("Render Button", () => {
    render(
      <ContinueButton
        onClick={() => {
          console.log("uye");
        }}
      />
    );
    const rendered = screen.getByTestId("button");
    expect(rendered).toBeInTheDocument();
    expect(screen.getByText("Continue")).toBeInTheDocument();
  });
  test("Click function", () => {
    render(
      <ContinueButton
        onClick={() => {
          console.log("uye");
        }}
      />
    );
    const button = screen.getByTestId("button");
    fireEvent.click(button);
  });
});
