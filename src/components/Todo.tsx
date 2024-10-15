"use client";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTodos, useDeleteTodo } from "@/Utlis/api";
import ConfirmationModal from './ConfirmationModal';

const Todo: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const { data: todos = [], isLoading, error } = useTodos(); // Fetch todos
  const deleteTodoMutation = useDeleteTodo(); // Delete todo mutation
  const navigate = useNavigate();
  const [opened, setOpened] = useState(false);
  const [todoIdToDelete, setTodoIdToDelete] = useState<number | null>(null);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading todos</p>;

  const handleDeleteClick = (id: number) => {
    setTodoIdToDelete(id);
    setOpened(true);
  };

  const handleAdd = () => {
    navigate("/tasks/new");
  };

  const handleEdit = (task: { id: number; taskName: string }) => {
    navigate(`/tasks/${task.id}/edit`);
  };

  const handleConfirmDelete = () => {
    if (todoIdToDelete) {
      deleteTodoMutation.mutate(todoIdToDelete);
      setOpened(false);
      setTodoIdToDelete(null); // Reset the ID after deletion
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-white">
      <div className="bg-gray-300 shadow-lg rounded-lg p-8 max-w-xl w-full">
        <h1 className="text-2xl font-bold mb-5 text-center">TODO App</h1>

        {/* Search */}
        <input
          type="text"
          placeholder="Search TODOs..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border p-2 mb-6 w-full rounded"
        />

        {/* Add Todo Button */}
        <button
          onClick={handleAdd}
          className="bg-blue-600 text-white px-5 py-2 rounded mb-4 w-full"
        >
          Add New TODO
        </button>

        {/* TODO List */}
        <ul className="list-disc pl-5">
          {todos
            .filter((todo) =>
              todo.taskName.toLowerCase().includes(searchTerm.toLowerCase())
            )
            .map((todo) => (
              <li
                key={todo.id}
                className="flex justify-between items-center mb-4"
              >
                <span>{todo.taskName}</span>
                <div>
                  <button
                    onClick={() => handleEdit(todo)}
                    className="bg-green-600 text-white px-3 py-2 rounded mr-2"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => handleDeleteClick(todo.id)} // Updated to use the new function
                    className="bg-red-500 text-white px-3 py-2 rounded"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
        </ul>

        {/* Confirmation Modal */}
        <ConfirmationModal
          opened={opened}
          onClose={() => setOpened(false)}
          onConfirm={handleConfirmDelete} // Handle confirmation
        />
      </div>
    </div>
  );
};

export default Todo;
