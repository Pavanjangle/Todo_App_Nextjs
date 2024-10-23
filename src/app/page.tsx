"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';
import CustomButton from "./sharedComponent/Button";
import TodoList from "../components/TodoList"; 
import SearchInput from "@/components/SearchInput";

const Todo: React.FC = () => {
  const [todos, setTodos] = useState<{ id: number; taskName: string }[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const router = useRouter();

  // Function to fetch todos from the API
  const fetchTodos = async () => {
    try {
      const response = await fetch("/api/todos");
      const data = await response.json();
      setTodos(data);
    } catch (error) {
      setTodos([]);
    }
  };

  // Open modal for adding new task
  const handleAdd = () => {
    router.push("/tasks/new");
  };

  // Open modal for editing existing task
  const handleEdit = (id: number) => {
    router.push(`/tasks/${id}/edit`);
  };

  // Delete todo function
  const deleteTodo = async (id: number) => {
    try {
      await fetch(`/api/todos/${id}`, { method: "DELETE" });
      fetchTodos();
    } catch (error) {
      console.error("Error deleting TODO: ", error);
    }
  };

  // Handle search input
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  // Effect to fetch todos on component mount
  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <div className="flex justify-center items-center min-h-screen bg-custom-gray">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-xl w-full">
        <h1 className="text-2xl font-bold mb-5 text-center">TODO APP</h1>

        {/* Search */}
        <SearchInput value={searchTerm} onChange={handleSearch}/>
        
        <CustomButton title="Add New TODO" onClick={handleAdd} />
        
        {/* TODO List */}
        <TodoList
          todos={todos}
          searchTerm={searchTerm}
          onEdit={handleEdit}
          onDelete={deleteTodo}
        />
      </div>
    </div>
  );
};

export default Todo;
