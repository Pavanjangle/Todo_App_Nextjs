"use client";
import React, { useState } from "react";
import { useRouter } from 'next/navigation';
import ConfirmationModal from '../components/ConfirmationModal';
import CustomButton from "./sharedComponent/Button"; 
import TodoList from "../components/TodoList";
import { useDeleteTodo, useTodos } from "@/utils/api";
import SearchInput from "@/components/SearchInput";

const Todo: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const { data: todos = [], isLoading, error } = useTodos();
  const deleteTodoMutation = useDeleteTodo(); 
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

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-custom-gray">
      <div className="bg-gray-300 shadow-lg rounded-lg p-8 max-w-xl w-full">
        <h1 className="text-2xl font-bold mb-5 text-center">TODO App</h1>

        {/* Search */}
        <SearchInput value={searchTerm} onChange={handleSearch}/>
        {/* Add Todo Button */}
        <CustomButton title="Add New TODO" onClick={handleAdd} />
        {/* TODO List */}
        <TodoList 
          todos={todos} 
          onEdit={handleEdit} 
          onDelete={handleDeleteClick} 
          searchTerm={searchTerm} 
        />
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
