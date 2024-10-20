import { http, HttpResponse } from "msw";

// Initialize an in-memory list of todos
let todos: { id: number; taskName: string }[] = [];

interface Task {
  id: number;
  taskName: string;
}

// Helper function to generate unique IDs
const generateId = () => (todos.length ? Math.max(...todos.map((todo) => todo.id)) + 1 : 1);

export const handlers = [
  // Intercept "GET /api/todos" requests to get the list of todos
  http.get("/api/todos", () => {
    return HttpResponse.json(todos);
  }),

  // Intercept "POST /api/todos" requests to add a new todo
  http.post("/api/todos", async (req) => {
    const { taskName } = await req.request.json() as Task;                                              

    // Create a new todo item
    const newTodo = { id: generateId(), taskName };
    todos.push(newTodo); 

    return HttpResponse.json(newTodo); 
  }),

  // Intercept "DELETE /api/todos/:id" requests to delete a todo
  http.delete("/api/todos/:id", (req) => {
    const { id } = req.params;

    // Filter out the todo with the specified ID
    todos = todos.filter((todo) => (todo.id).toString() !== id);

    return HttpResponse.json(todos, {status: 200}); 
  }),

  // Intercept "PUT /api/todos/:id" requests to update a todo
  http.put("/api/todos/:id", async (req) => {
    const { id } = req.params;
    const { taskName } = await req.request.json() as Task;

    // Update the todo with the specified ID
    const todoIndex = todos.findIndex((todo) => todo.id.toString() === id);
    if (todoIndex !== -1) {
      todos[todoIndex].taskName = taskName;
      return HttpResponse.json(todos[todoIndex], { status: 200 });
    }

    return HttpResponse.json({ error: "Todo not found" }, { status: 404 });
  }),
];
