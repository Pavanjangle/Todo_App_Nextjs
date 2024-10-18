import { http, HttpResponse } from "msw";
import { todo } from "node:test";

// Initialize an in-memory list of todos
let todos: { id: number; taskName: string }[] = [];

// Helper function to generate unique IDs
const generateId = () => (todos.length ? Math.max(...todos.map((todo) => todo.id)) + 1 : 1);

export const handlers = [
  // Intercept "GET /api/todos" requests to get the list of todos
  http.get("/api/todos", () => {
    return HttpResponse.json(todos); // Respond with the list of todos
  }),

  http.get("/api/todos/:id", (req) => {
  
    const { id } = req.params;
 

    // Filter out the todo with the specified ID
    let item = todos.filter((todo) => (todo.id).toString() === id);

    return HttpResponse.json(item?.length?item[0]:{}, {status: 200});
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

    return HttpResponse.json(todos, {status: 200}); 
  }),

  // Intercept "PUT /api/todos/:id" requests to edit a todo
  http.put("/api/todo/:id", async (req) => {
    const { id } = req.params;
    const { taskName } = await req.request.json();

    // Find the todo by ID
    const todoIndex = todos.findIndex((todo) =>  (todo.id).toString() === id);
    

    // If the todo is not found, respond with a 404 status
    if (todoIndex === -1) {

      return HttpResponse.json({ message: "Todo not found" }, { status: 404 });
    }

    // Update the task name of the found todo
    todos[todoIndex].taskName = taskName;

    // Respond with the updated todo
    return HttpResponse.json(todos[todoIndex], { status: 200 });
  }),
];
