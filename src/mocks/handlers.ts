import { http, HttpResponse } from "msw";

// Initialize an in-memory list of todos
let todos: { id: number; taskName: string }[] = [
];

// Helper function to generate unique IDs
const generateId = () => (todos.length ? Math.max(...todos.map((todo) => todo.id)) + 1 : 1);

export const handlers = [
  // Intercept "GET /api/todos" requests to get the list of todos
  http.get("/api/todos", () => {
    return HttpResponse.json(todos); // Respond with the list of todos
  }),

  // Intercept "POST /api/todos" requests to add a new todo
  http.post("/api/todos", async (req) => {
	 
    const { taskName } = await req.request.json(); 

    // Create a new todo item
    const newTodo = { id: generateId(), taskName };
    todos.push(newTodo); 

    return HttpResponse.json(newTodo); // Respond with the new todo
  }),

  // Intercept "DELETE /api/todos/:id" requests to delete a todo
  http.delete("/api/todos/:id", (req) => {
    const { id } = req.params;
	

    // Filter out the todo with the specified ID
    todos = todos.filter((todo) => (todo.id).toString() !== id);

    return HttpResponse.json(todos, {status:200}); 
  }),
];
