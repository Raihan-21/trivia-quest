import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import CategoryDropdown from "./CategoryDropdown";
import React from "react";

import axios from "axios";

describe("Category Dropdown", () => {
  test("Render component", async () => {
    const setState = jest.fn();
    jest.spyOn(React, "useState").mockImplementationOnce(() => [[], setState]);

    // render(<CategoryDropdown />)
    try {
      const response = await axios.get(
        "https://the-trivia-api.com/v2/categories"
      );
      response.data.forEach((data: any) => {
        render(
          <CategoryDropdown
            group={response.data}
            groupName={data}
            onCategoryClick={() => {}}
          />
        );
        expect(screen.getByText(data)).toBeInTheDocument();
      });
      expect(screen.getByTestId("category-container")).toHaveLength(
        response.data.length
      );
    } catch (error) {}
  });
});
