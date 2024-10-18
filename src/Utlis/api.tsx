"use client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

// Fetch all todos
export const useTodos = () => {
  return useQuery({
    queryKey: ["todos"], 
    queryFn: async () => {
      const response = await fetch("/api/todos");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    },
    enabled:true
  });
};

// Fetch todo by ID
export const useTodoById = (id: string) => {
  return useQuery({
    queryKey: ["todo", id], 
    queryFn: async () => {
      const response = await fetch(`/api/todos/${id}`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    }
  });
};

// Add a new todo

export const useSaveTodo = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (taskName: string) => {
      const response = await fetch("/api/todos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ taskName }),
      });
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] })
    },
  });
};


// Edit a todo
export const useEditTodo = (id: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (taskName: string) => {
      const response = await fetch(`/api/todo/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ taskName }),
      });
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] })
    },
  });
};

// Delete a todo
export const useDeleteTodo = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: number) => {
      const response = await fetch(`/api/todos/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] })
    },
  });
};
