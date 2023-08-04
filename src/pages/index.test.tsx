import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Home from "./index";

jest.mock("next/router", () => ({ useRouter: jest.fn() }));
describe("Play app flow", () => {
  const useRouter = jest.spyOn(require("next/router"), "useRouter");
  useRouter.mockImplementation(() => ({
    events: {
      on: jest.fn(),
      off: jest.fn,
    },
  }));
  test("render button", () => {
    render(<Home />);
    const playButton = screen.getByTestId("play-button");
    expect(playButton).toBeInTheDocument();
    fireEvent.click(playButton);
    expect(screen.getByText("Do you want to choose categories for your quest?"))
      .toBeInTheDocument;
  });
  test("Click play with categories", () => {
    render(<Home />);
    const playButton = screen.getByTestId("play-button");

    expect(playButton).toBeInTheDocument();
    fireEvent.click(playButton);
    expect(screen.getByText("Do you want to choose categories for your quest?"))
      .toBeInTheDocument;

    const yesButton = screen.getByTestId("yes-button");
    expect(yesButton).toBeInTheDocument();
    fireEvent.click(yesButton);
    expect(screen.getByText("Select categories :")).toBeInTheDocument();
  });
  test("Clik play without categories", () => {
    render(<Home />);
    const playButton = screen.getByTestId("play-button");
    expect(playButton).toBeInTheDocument();
    fireEvent.click(playButton);
    expect(screen.getByText("Do you want to choose categories for your quest?"))
      .toBeInTheDocument;
    const yesButton = screen.getByTestId("no-button");
    expect(yesButton).toBeInTheDocument();
    fireEvent.click(yesButton);
    expect(screen.getByText("Select Difficulty :")).toBeInTheDocument();
  });
});
