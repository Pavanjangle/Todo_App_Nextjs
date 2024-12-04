import React from "react";
import TodoItem from "../components/TodoItem"; 

interface Todo {
  id: number;
  taskName: string;
}

interface TodoListProps {
  todos: Todo[];
  searchTerm: string;
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
}

const TodoList: React.FC<TodoListProps> = ({ todos, searchTerm, onEdit, onDelete }) => {
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
            onEdit={() => onEdit(todo.id)}
            onDelete={() => onDelete(todo.id)}
          />
        ))}
    </ul>
  );
};

export default TodoList;
