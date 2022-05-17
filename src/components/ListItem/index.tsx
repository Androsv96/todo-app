import { Todo } from "../../interfaces/todos";
import { formatDate } from "../../utils/date";
import "./styles.css";

interface ListItemProp extends Todo {
  handleItemListChecked: (todo: Todo) => void;
}

const ListItem = ({ handleItemListChecked, ...todo }: ListItemProp) => {
  const handleOnCheck = (todo: Todo) => handleItemListChecked(todo);

  const isOverdue = () => {
    const currDate = new Date().getTime();
    const todoDate = todo.dueDate ? new Date(todo.dueDate).getTime() : 0;
    if (!todoDate) return 0;
    return currDate > todoDate ? 1 : 0;
  };

  return (
    <li
      className={`item ${todo.isComplete && "completed"} ${
        isOverdue() && "overdue"
      }`}
    >
      <div className="item-data">
        <div className={`${todo.isComplete && "completed-text"}`}>
          <input
            id={`${todo.id}`}
            type="checkbox"
            onChange={() => handleOnCheck(todo)}
            defaultChecked={todo.isComplete}
          />
          <label htmlFor={`${todo.id}`} className="description">
            {todo.description}
          </label>
        </div>
        {todo.dueDate && (
          <span className="datestamp">
            {formatDate(new Date(todo.dueDate))}
          </span>
        )}
      </div>
    </li>
  );
};

export default ListItem;
