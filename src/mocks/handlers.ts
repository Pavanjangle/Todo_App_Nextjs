import { http, HttpResponse } from "msw";

let todos: { id: number; taskName: string }[] = [];

interface Task {
  id: number;
  taskName: string;
}

const generateId = () =>
  todos.length ? Math.max(...todos.map((todo) => todo.id)) + 1 : 1;

export const handlers = [
  // Intercept "GET /api/todos" requests to get the list of todos
  http.get("/api/todos", ({ request }) => {
    const searchParams = new URLSearchParams(request.url); // req.url.search is the query string part
    const sortOrder = searchParams.get("sortOrder") || "asc";
    const splitData = request.url
      .split("?")[1]
      ?.split("&")
      .find((param) => param.startsWith("page="));
    const page = splitData ? parseInt(splitData.split("=")[1]) : 1;
    const limit = parseInt(searchParams.get("limit") || "5");
    const sortField = searchParams.get("sortField") || "id";
    const sortedData = JSON.parse(JSON.stringify([...todos])).sort(
      (a: { [x: string]: number }, b: { [x: string]: number }) => {
        if (sortOrder === "asc") {
          return a[sortField] > b[sortField] ? 1 : -1;
        } else {
          return a[sortField] < b[sortField] ? 1 : -1;
        }
      }
    );

    // Pagination logic
    const totalPages = Math.ceil(sortedData.length / limit);
    const start = (page - 1) * limit;
    const paginatedData = sortedData.slice(start, start + limit);
    return HttpResponse.json({ data: paginatedData, totalPages });
  }),

  http.get("/api/todos/:id", (req) => {
    const { id } = req.params;
    const item = todos.filter((todo) => todo.id.toString() === id);

    return HttpResponse.json(item?.length ? item[0] : {}, { status: 200 });
  }),

  // Intercept "POST /api/todos" requests to add a new todo
  http.post("/api/todos", async (req) => {
    const { taskName } = (await req.request.json()) as Task;

    // Create a new todo item
    const newTodo = { id: generateId(), taskName };
    todos.push(newTodo);

    return HttpResponse.json(newTodo);
  }),

  // Intercept "DELETE /api/todos/:id" requests to delete a todo
  http.delete("/api/todos/:id", (req) => {
    const { id } = req.params;

    // Filter out the todo with the specified ID
    todos = todos.filter((todo) => todo.id.toString() !== id);

    return HttpResponse.json(todos, { status: 200 });
  }),

  // Intercept "PUT /api/todos/:id" requests to edit a todo
  http.put("/api/todo/:id", async (req) => {
    const { id } = req.params;
    const { taskName } = (await req.request.json()) as Task;

    // Find the todo by ID
    const todoIndex = todos.findIndex((todo) => todo.id.toString() === id);

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
