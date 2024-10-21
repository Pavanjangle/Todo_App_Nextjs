"use client";
export const saveTodo = async (taskName: string) => {
  try {
    // Add new todo
    const response = await fetch("/api/todos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ taskName: taskName }),
    });
    if (response.ok) {
      return true
    } else {
      return false
    }
  } catch (error) {
    console.error("Error saving TODO: ", error);
  }
};

export const editTodo = async (taskName: string, id: string) => {
  try {

    // If currentTask exists, it means we're editing
    const response = await fetch(`/api/todo/${id}`, {
      method: "put",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ taskName: taskName }),
    });
    if (response.ok) {
      return true
    } else {
      return false
    }
  } catch (error) {
    console.error("Error saving TODO: ", error);
  }
};

export const fetchTodoById = async (id: string) => {
  try {
    const response = await fetch(`/api/todos/${id}`);
    const data = await response.json();
    return (data);
  } catch (error) {
    return ({});
  }
};



