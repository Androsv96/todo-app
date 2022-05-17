import { render } from "@testing-library/react";
import Header from "../../../components/Header";

describe("Header component tests", () => {
  it("should render correctly", () => {
    const { getByText } = render(<Header />);
    expect(getByText("Todo App")).toBeTruthy();
  });

  it("header tag should have correct classname", () => {
    const { getByText } = render(<Header />);
    const header = getByText("Todo App");
    expect(header.classList.contains("header")).toBeTruthy();
  });
});
