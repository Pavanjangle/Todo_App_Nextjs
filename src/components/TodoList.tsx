import React from "react";
import TodoItem from "./TodoItem";

interface Todo {
  id: number;
  taskName: string;
}

interface TodoListProps {
  todos: Todo[];
  onEdit: (todo: Todo) => void;
  onDelete: (id: number) => void;
  searchTerm: string;
}

const TodoList: React.FC<TodoListProps> = ({ todos, onEdit, onDelete, searchTerm }) => {
  return (
    <ul className="list-disc pl-5">
      {todos
        .filter((todo) =>
          todo.taskName.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .map((todo) => (
          <TodoItem
            key={todo.id}
            id={todo.id}
            taskName={todo.taskName}
            onEdit={() => onEdit(todo)}
            onDelete={() => onDelete(todo.id)}
          />
        ))}
    </ul>
  );
};

export default TodoList;
