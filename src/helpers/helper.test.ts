import "@testing-library/jest-dom";
import { queryGenerator } from "./helper";
describe("Query Generator", () => {
  test("Single params", () => {
    const singleParam = {
      param1: "test1",
    };
    expect(queryGenerator(singleParam)).toMatch("?param1=test1");
  });
  test("Multiple params", () => {
    const singleParam = {
      param1: "test1",
      param2: "test2",
    };
    expect(queryGenerator(singleParam)).toMatch("?param1=test1&param2=test2");
  });
  test("Empty params value", () => {
    const emptyParam = { empty: "" };
    expect(queryGenerator(emptyParam)).toMatch("");
  });
  test("Without params", () => {
    const emptyParam = {};
    expect(queryGenerator(emptyParam)).toMatch("");
  });
});
