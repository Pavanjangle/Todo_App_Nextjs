"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';
import { useTodos, useDeleteTodo } from "@/utlis/api";
import ConfirmationModal from '../components/ConfirmationModal';
import CustomButton from "./sharedComponent/Button";

const Todo: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const { data: todos = [], isLoading, error } = useTodos(); // Fetch todos
  const deleteTodoMutation = useDeleteTodo(); // Delete todo mutation
  const router = useRouter();
  const [opened, setOpened] = useState(false);
  const [todoIdToDelete, setTodoIdToDelete] = useState<number | null>(null);

  // Function to fetch todos from the API
  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading todos</p>;

  const handleDeleteClick = (id: number) => {
    setTodoIdToDelete(id);  
    setOpened(true);       
  };

  // Open modal for adding new task
  const handleAdd = () => {
    router.push("/tasks/new");
  };

  // Open modal for editing existing task
  const handleEdit = (task: { id: number; taskName: string }) => {
    router.push(`/tasks/${task.id}/edit`);
  };

  const handleConfirmDelete = () => {
    if (todoIdToDelete) {
      deleteTodoMutation.mutate(todoIdToDelete);  
      setOpened(false);         
      setTodoIdToDelete(null);   
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-custom-gray">
      <div className="bg-gray-300 shadow-lg rounded-lg p-8 max-w-xl w-full">
        <h1 className="text-2xl font-bold mb-5 text-center">TODO App</h1>

        {/* Search */}
        <input
          type="text"
          placeholder="Search TODOs..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border p-2 mb-6 w-full rounded rounded border-black"
        />

        {/* Add Todo Button */}
        <CustomButton title="Add New TODO" onClick={handleAdd} />


        {/* TODO List */}
        <ul className="list-disc pl-5">
          {todos
            .filter((todo: { taskName: string; }) =>
              todo.taskName.toLowerCase().includes(searchTerm.toLowerCase())
            )
            .map((todo: { id: any; taskName: any; }) => (
              <li
                key={todo.id}
                className="flex justify-between items-center mb-4 font-bold"
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
                    onClick={() => handleDeleteClick(todo.id)} 
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
          onConfirm={handleConfirmDelete} 
        />
      </div>
    </div>
  );
};

export default Todo;
