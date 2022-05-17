import { useCallback, useEffect, useState } from "react";
import { Todo, UpdateTodo } from "../../interfaces/todos";
import Api from "../../utils/api";
import { GET_URL } from "../../utils/constants";
import { descSort, formatDate } from "../../utils/date";
import ListItem from "../ListItem";
import Spinner from "../Spinner";
import "./styles.css";

const TodoList = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [orderedTodos, setOrderedTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(false);

  const handleItemListChecked = async (todo: Todo) => {
    const url = `https://944ba3c5-94c3-4369-a9e6-a509d65912e2.mock.pstmn.io/patch/${todo.id}`;
    // update
    const response = await Api<UpdateTodo>(url, "PATCH", {
      isComplete: !todo.isComplete,
    });
    const temp = [...todos];
    const index = temp.findIndex((currTodo) => todo.id === currTodo.id);
    temp[index] = {
      ...temp[index],
      isComplete: !todo.isComplete,
    };
    setTodos(temp);
  };

  const getTodos = useCallback(async () => {
    setLoading(true);
    const response = await Api<Todo[]>(GET_URL, "GET");
    setTodos(response);
    setLoading(false);
  }, []);

  const orderTodos = () => {
    const completed: Todo[] = [],
      overdue: Todo[] = [],
      onTime: Todo[] = [];
    const currDate = new Date().getTime();
    todos.forEach((todo) => {
      const todoDate = todo.dueDate ? new Date(todo.dueDate).getTime() : 0;
      if (todo.isComplete) {
        if (!todo.dueDate) {
          return completed.push({ ...todo });
        }
        return completed.unshift({ ...todo });
      } else if (!todo.dueDate) {
        return onTime.push(todo);
      } else if (currDate > todoDate) {
        if (!todo.dueDate) {
          return overdue.push({ ...todo });
        }
        return overdue.unshift({ ...todo });
      } else {
        if (!todo.dueDate) {
          return onTime.push({ ...todo });
        }
        return onTime.unshift({ ...todo });
      }
    });

    completed.length > 0 && completed.sort(descSort);
    overdue.length > 0 && overdue.sort(descSort);
    onTime.length > 0 && onTime.sort(descSort);

    setOrderedTodos([...overdue, ...onTime, ...completed]);
  };

  useEffect(() => {
    getTodos();
  }, []);

  useEffect(() => {
    orderTodos();
  }, [todos]);

  return (
    <div className="container">
      {loading ? (
        <Spinner />
      ) : (
        <ul className="list">
          {orderedTodos.length > 0 &&
            orderedTodos.map((todo, idx) => (
              <ListItem
                key={`${idx}-${todo.id}`}
                description={todo.description}
                dueDate={todo.dueDate}
                id={todo.id}
                isComplete={todo.isComplete}
                handleItemListChecked={handleItemListChecked}
              />
            ))}
        </ul>
      )}
    </div>
  );
};

export default TodoList;
