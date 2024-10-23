import React from 'react';
import { Button } from '@mantine/core';

interface TodoItemProps {
  id: number;
  taskName: string;
  onEdit: () => void;
  onDelete: () => void;
}

const TodoItem: React.FC<TodoItemProps> = ({ taskName, onEdit, onDelete }) => {
  return (
    <li className="flex justify-between items-center mb-4">
      <span className="font-bold">{taskName}</span>
      <div>
        <Button 
          onClick={onEdit} 
          className="mr-2" // Using Mantine's className prop for margin
          color="green" // Mantine color prop for styling
        >
          Edit
        </Button>
        <Button 
          onClick={onDelete} 
          color="red" // Mantine color prop for styling
        >
          Delete
        </Button>
      </div>
    </li>
  );
};

export default TodoItem;
