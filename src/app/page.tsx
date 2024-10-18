"use client";
import React, { useMemo, useState } from "react";
import { useRouter } from 'next/navigation';
import { useReactTable, getCoreRowModel, getSortedRowModel, ColumnDef } from "@tanstack/react-table";
import { useTodos, useDeleteTodo } from "@/Utlis/api";
import ConfirmationModal from "@/components/ConfirmationModal";
import Table from "@/components/TodoTable";
import '@mantine/core/styles.css';
import { Button } from "@mantine/core";

const Todo: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const { data: todos = [], isLoading, error } = useTodos(); // Fetch todos
  const deleteTodoMutation = useDeleteTodo(); // Delete todo mutation
  const router = useRouter();
  const [opened, setOpened] = useState(false);
  const [todoIdToDelete, setTodoIdToDelete] = useState<number | null>(null);

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  const handleDeleteClick = (id: number) => {
    setTodoIdToDelete(id);
    setOpened(true);
  };

  const handleAdd = () => {
    router.push("/tasks/new");
  };

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

  const columns = useMemo<ColumnDef<any>[]>(() => [
    {
      accessorKey: "id",
      header: "ID",
    },
    {
      accessorKey: "taskName",
      header: "Task Name",
    },
    {
      accessorKey: "actions",
      header: "Actions",
      cell: ({ row }) => (
        <div>
          <Button
            onClick={() => handleEdit(row.original)}
            variant="dark"
            styles={{
              root: {
                backgroundColor: '#4CAF50', 
                color: 'black', 
                '&:hover': {
                  backgroundColor: '#bdbdbd', 
                },
              },
            }}
          >
            Edit
          </Button>
          <Button
            onClick={() => handleDeleteClick(row.original.id)}
            color="red"
            variant="light"
            styles={{
              root: {
                backgroundColor: '#ff4d4d', 
                color: '#000', 
                '&:hover': {
                  backgroundColor: '#cc0000', 
                },
              },
            }}
            className="ml-2"
          >
            Delete
          </Button>
        </div>
      ),
    },
  ], []);

  const filteredData = useMemo(() =>
    todos.filter(todo => todo.taskName.toLowerCase().includes(searchTerm.toLowerCase())),
    [todos, searchTerm]
  );

  // Calculate pagination
  const totalItems = filteredData.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredData.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredData, currentPage, itemsPerPage]);

  // Setting up the table instance using useReactTable
  const table = useReactTable({
    data: paginatedData, // Use paginated data for the table
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading todos</p>;

  return (
    <div className="min-h-screen bg-custom-gray flex justify-center items-center">
      <div className="bg-gray-300 shadow-lg rounded-lg p-8 max-w-xl w-full">
        <h1 className="text-2xl font-bold mb-5 text-center">TODO App</h1>

        <input
          type="text"
          placeholder="Search TODOs..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border p-2 mb-6 w-full rounded border-black border"
        />

        <Button onClick={handleAdd} color="blue" fullWidth className="mb-4">
          Add New TODO
        </Button>

        {/* Render the Table component */}
        <Table
          table={table}
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
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
