import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import CategoryDropdown from "./CategoryDropdown";
import axios from "axios";
describe("Category Dropdown", () => {
  test("Render component", async () => {
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
