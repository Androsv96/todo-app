import { render } from "@testing-library/react";
import Spinner from "../../../components/Spinner";

describe("Spinner component tests", () => {
  it("should render classes correctly", () => {
    const { getByTestId } = render(<Spinner />);
    expect(getByTestId("spinner").classList.contains("spinner")).toBeTruthy();
  });
});
