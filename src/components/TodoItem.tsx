import React from "react";

interface TodoItemProps {
  id: number;
  taskName: string;
  onEdit: () => void;
  onDelete: () => void;
}

const TodoItem: React.FC<TodoItemProps> = ({ taskName, onEdit, onDelete }) => {
  return (
    <li className="flex justify-between items-center mb-4 font-bold">
      <span>{taskName}</span>
      <div>
        <button
          onClick={onEdit}
          className="bg-green-600 text-white px-3 py-2 rounded mr-2"
        >
          Edit
        </button>
        <button
          onClick={onDelete}
          className="bg-red-500 text-white px-3 py-2 rounded"
        >
          Delete
        </button>
      </div>
    </li>
  );
};

export default TodoItem;
