"use client";
import React, { useMemo, useState } from "react";
import { useRouter } from 'next/navigation';
import { useReactTable, getCoreRowModel, getSortedRowModel, ColumnDef } from "@tanstack/react-table";
import { useTodos, useDeleteTodo } from "@/Utlis/api";
import ConfirmationModal from "@/components/ConfirmationModal";
import Table from "@/components/TodoTable";
import '@mantine/core/styles.css';
import { Button } from "@mantine/core";
import CustomButton from "./sharedComponent/Button";

const Todo: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [action, setAction] = useState<string>("");

  const { data: todos = [], isLoading, error } = useTodos(); // Fetch todos
  const deleteTodoMutation = useDeleteTodo(); // Delete todo mutation
  const router = useRouter();
  const [opened, setOpened] = useState(false);
  const [taskId, setTaskId] = useState<number | null>(null);
  const [pageSize, setPageSize] = useState(10);
  const [data, setData] = useState([]);

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  const handleAction = (id: number, action: string) => {
    setAction(action);
    setTaskId(id);
    setOpened(true);
  };

  const handleAdd = () => {
    router.push("/tasks/new");
  };

  const handleEdit = () => {
    router.push(`/tasks/${taskId}/edit`);
    setAction('');
  };


  const handleConfirmDelete = () => {
    if (taskId) {
      deleteTodoMutation.mutate(taskId);
      setOpened(false);
      setTaskId(null);
      setAction('');
    }
  };

  const handlePageSizeChange = (size: number) => {
    setPageSize(size);
    setCurrentPage(1); // Reset to the first page on page size change
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
            onClick={() => handleAction(row.original.id, "Yes")}
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
            onClick={() => handleAction(row.original.id, "Delete")}
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
    todos.filter((todo: { taskName: string; }) => todo.taskName.toLowerCase().includes(searchTerm.toLowerCase())),
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
    initialState: {
      sorting: [{ id: 'taskName', desc: false }], // Apply default ascending sorting to the 'name' column
    },
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading todos</p>;

  function handleSortChange(): void {
    throw new Error("Function not implemented.");
  }

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

        <CustomButton title="Add New TODO" onClick={handleAdd} />


        {/* Render the Table component */}
        <Table
          table={tableInstance}
          currentPage={currentPage}
          totalPages={Math.ceil(data.length / pageSize)}
          onPageChange={setCurrentPage}
          onSortChange={handleSortChange}
          pageSize={pageSize}
          // eslint-disable-next-line react/jsx-no-duplicate-props
          onPageSizeChange={handlePageSizeChange} table={undefined} onSortChange={function (): void {
            // throw new Error("Function not implemented.");
          }} />

        {/* Confirmation Modal */}
        <ConfirmationModal
          opened={opened}
          actionType={action}
          confirmButtonTitle={action}
          message={action === 'Delete' ? 'Do you really want to delete this task?' : "Are you sure want to edit this task?"}
          onClose={() => setOpened(false)}
          onConfirm={(action) => {
            if (action === 'Delete') {
              handleConfirmDelete();
            } else if (action === 'Yes') {
              handleEdit();
            }
          }}
        />
      </div>
    </div>
  );
};

export default Todo;
