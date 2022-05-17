export interface Todo {
  id: string;
  description: string;
  isComplete: boolean;
  dueDate: string;
}

export interface UpdateTodo {
  status: "success" | "fail";
}
