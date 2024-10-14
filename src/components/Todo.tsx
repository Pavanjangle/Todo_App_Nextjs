  "use client";
  import React, { useEffect, useState } from "react";
  import { useNavigate, } from "react-router-dom";

  const Todo: React.FC = () => {
    const [todos, setTodos] = useState<{ id: number; taskName: string }[]>([]);
    const [searchTerm, setSearchTerm] = useState<string>("");
    const navigate = useNavigate();

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
      navigate("/tasks/new");

    };

    // Open modal for editing existing task
    const handleEdit = (task: { id: number; taskName: string }) => {
      navigate(`/tasks/${task.id}/edit`);
    };

    // Delete todo function
    const deleteTodo = async (id: number) => {
      try {
        await fetch(`/api/todos/${id}/edit`, { method: "DELETE" });
        setTodos((prev) => prev.filter((todo) => todo.id !== id));
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
      <div className="flex justify-center items-center min-h-screen bg-white-300">
        <div className="bg-gray-200 shadow-lg rounded-lg p-8 max-w-xl w-full">
          <h1 className="text-2xl font-bold mb-5 text-center">TODO App</h1>

          {/* Search */}
          <input
            type="text"
            placeholder="Search TODOs..."
            value={searchTerm}
            onChange={handleSearch}
            className="border p-2 mb-6 w-full rounded"
          />

          {/* Add Todo Button */}
          <button
            onClick={handleAdd}
            className="bg-blue-500 text-white px-5 py-2 rounded mb-4 w-full"
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
                <li key={todo.id} className="flex justify-between items-center mb-4">
                  <span>{todo.taskName}</span>
                  <div>
                    <button
                      onClick={() => handleEdit(todo)}
                      className="bg-green-500 text-white px-3 py-2 rounded mr-2"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteTodo(todo.id)}
                      className="bg-red-500 text-white px-3 py-2 rounded"
                    >
                      Delete
                    </button>
                  </div>
                </li>
              ))}
          </ul>


        </div>
      </div>
    );
  };

  export default Todo;
