"use client";
import React, { useEffect, useState } from "react";
import { Modal, TextInput, Button } from '@mantine/core';

const Todo: React.FC = () => {
  const [todos, setTodos] = useState<{ id: number; taskName: string }[]>([]);
  const [newTodo, setNewTodo] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [editTodo, setEditTodo] = useState<{ id: number; taskName: string } | null>(null);
  const [editModalOpen, setEditModalOpen] = useState<boolean>(false);

  // Function to fetch todos from the API
  const fetchTodos = async () => {
    try {
      const response = await fetch("/api/todos");
      if (!response.ok) {
        setTodos([]);
      } else {
        const data = await response.json();
        setTodos(data);
      }
    } catch (error) {
      setTodos([]);
    }
  };

  // Add new todo
  const addTodo = async () => {
    const trimmedTodo = newTodo.trim();
    if (!trimmedTodo) return;

    try {
      const response = await fetch("/api/todos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ taskName: trimmedTodo }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      setNewTodo(""); 
      fetchTodos(); 
    } catch (error) {
      console.error("Error adding TODO: ", error); 
    }
  };
``
  // Delete todo function
  const deleteTodo = async (id: number) => {
    try {
      const response = await fetch(`/api/todos/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      } else {
        fetchTodos();
      }

      setTodos((prev) => prev.filter((todo) => todo.id !== id)); 
    } catch (error) {
      console.error("Error deleting TODO: ", error); 
    }
  };

  // Open the edit modal and set the current todo for editing
  const openEditModal = (todo: { id: number; taskName: string }) => {
    setEditTodo(todo);
    setEditModalOpen(true);
  };

  // Update the todo
  const updateTodo = async () => {
    if (!editTodo) return;

    const trimmedTaskName = editTodo.taskName.trim();
    if (!trimmedTaskName) return;  

    try {
      const response = await fetch(`/api/todos/${editTodo.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ taskName: trimmedTaskName }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      fetchTodos(); 
      setEditModalOpen(false); 
      setEditTodo(null); 
    } catch (error) {
      console.error("Error updating TODO: ", error); 
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
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
        <h1 className="text-2xl font-bold mb-6 text-center">TODO APP</h1>

        {/* Search */}
        <input
          type="text"
          placeholder="Search TODOs..."
          value={searchTerm}
          onChange={handleSearch}
          className="border p-2 mb-6 w-full rounded border-black border"
        />

        {/* Input and Submit Button */}
        <div className="flex mb-6">
          <input
            type="text"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            placeholder="Add a new TODO..."
            className="border-black border p-2 flex-grow mr-2 rounded"
          />
          <Button
            onClick={addTodo}
            styles={{
              root: {
                backgroundColor: "#238be6",
                color: "white",
                padding: "0.5rem 1.25rem",
                borderRadius: "0.375rem",
                transition: "background-color 200ms",
                "&:hover": {
                  backgroundColor: "#2563eb",
                },
              },
            }}
          >
            Add TODO
          </Button>
        </div>

        {/* TODO List */}
        <ul className="list-disc pl-5 font-bold">
          {todos
            .filter((todo) =>
              todo.taskName.toLowerCase().includes(searchTerm.toLowerCase())
            )
            .map((todo) => (
              <li key={todo.id} className="flex justify-between items-center mb-4">
                <span>{todo.taskName}</span>
                <div className="flex space-x-2">
                  <Button
                    onClick={() => openEditModal(todo)} 
                    styles={{
                      root: {
                        backgroundColor: "green", 
                        color: "white",
                        padding: "0.5rem 0.75rem",
                        borderRadius: "0.375rem",
                        transition: "background-color 200ms",
                        "&:hover": {
                          backgroundColor: "#f8c291", 
                        },
                      },
                    }}
                  >
                    Edit
                  </Button>
                  <Button
                    onClick={() => deleteTodo(todo.id)}
                    styles={{
                      root: {
                        backgroundColor: "#f56565", 
                        color: "white",
                        padding: "0.5rem 0.75rem",
                        borderRadius: "0.375rem",
                        transition: "background-color 200ms",
                        "&:hover": {
                          backgroundColor: "#c53030", 
                        },
                      },
                    }}
                  >
                    Delete
                  </Button>
                </div>
              </li>
            ))}
        </ul>

        {/* Edit Modal */}
        <Modal opened={editModalOpen} style={{ zIndex: "1000" }} onClose={() => setEditModalOpen(false)} title="Edit TODO">
          <TextInput
            label="Task Name"
            value={editTodo ? editTodo.taskName : ""}
            onChange={(e) =>
              setEditTodo({ ...editTodo!, taskName: e.target.value })
            }
          />
          <Button
            onClick={updateTodo}
            styles={{ root: { marginTop: "1rem" } }}
          >
            Update TODO
          </Button>
        </Modal>
      </div>
    </div>
  );
};

export default Todo;
