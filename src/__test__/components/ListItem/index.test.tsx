import { fireEvent, render, waitFor } from "@testing-library/react";
import ListItem from "../../../components/ListItem";
import { Todo } from "../../../interfaces/todos";

const MOCK_TODO: Todo = {
  description: "test description",
  dueDate: "01-01-2022",
  id: "1",
  isComplete: false,
};

describe("ListItem component tests", () => {
  it("should render correctly", () => {
    const customFunc = jest.fn();
    const { getByText } = render(
      <ListItem
        description={MOCK_TODO.description}
        dueDate={MOCK_TODO.dueDate}
        id={MOCK_TODO.id}
        isComplete={MOCK_TODO.isComplete}
        handleItemListChecked={customFunc}
      />
    );
    expect([
      getByText(MOCK_TODO.description),
      getByText(MOCK_TODO.dueDate),
    ]).toBeTruthy();
  });

  it("should execute callback function when checkbox clicked", () => {
    const customFunc = jest.fn();
    const { getByLabelText } = render(
      <ListItem
        description={MOCK_TODO.description}
        dueDate={MOCK_TODO.dueDate}
        id={MOCK_TODO.id}
        isComplete={MOCK_TODO.isComplete}
        handleItemListChecked={customFunc}
      />
    );
    fireEvent.click(getByLabelText(MOCK_TODO.description));
    waitFor(() => expect(customFunc).toBeCalledTimes(1));
  });
});
