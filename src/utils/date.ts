import { Todo } from "../interfaces/todos";

export const padTo2Digits = (num: number) => {
  return num.toString().padStart(2, "0");
};

export const formatDate = (date: Date) => {
  return [
    padTo2Digits(date.getDate()),
    padTo2Digits(date.getMonth() + 1),
    date.getFullYear(),
  ].join("-");
};

export const descSort = (firstTodo: Todo, secondTodo: Todo) => {
  return firstTodo.dueDate > secondTodo.dueDate
    ? -1
    : firstTodo.dueDate < secondTodo.dueDate
    ? 1
    : 0;
};
