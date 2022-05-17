import { render, waitFor } from "@testing-library/react";
import TodoList from "../../../components/TodoList";

const TODOS = {
  firstTodo: {
    description: "Call Mom",
    date: "26-06-2020",
  },
  secondTodo: {
    description: "Feed the cat",
    date: "24-06-2020",
  },
  thirdtodo: {
    description: "RUN LA marathon",
    date: "21-03-2021",
  },
  fourthTodo: {
    description: "Walk the dog",
  },
  fifthTodo: {
    description: "File 2020 Taxes",
    date: "10-03-2020",
  },
  sixthTodo: {
    description: "Fold laundry",
  },
};

describe("Spinner component tests", () => {
  it("should render all todos", () => {
    const { getByText } = render(<TodoList />);
    waitFor(() => {
      expect([
        getByText(TODOS.firstTodo.description),
        getByText(TODOS.firstTodo.date),
        getByText(TODOS.secondTodo.description),
        getByText(TODOS.secondTodo.date),
        getByText(TODOS.thirdtodo.description),
        getByText(TODOS.thirdtodo.date),
        getByText(TODOS.fourthTodo.description),
        getByText(TODOS.fifthTodo.description),
        getByText(TODOS.fifthTodo.date),
        getByText(TODOS.sixthTodo.description),
      ]).toBeTruthy();
    });
  });
});
