"use client";
import React, { useMemo, useState } from "react";
import { useRouter } from 'next/navigation';
import ConfirmationModal from "@/components/ConfirmationModal";
import PaginatedSortableTable from "@/components/TodoTable";
import '@mantine/core/styles.css';
import CustomButton from "./sharedComponent/Button";
import { useDeleteTodo, useTodos } from "@/utils/api";

const Todo: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [action, setAction] = useState<string>("");

  const { data: todos = [], isLoading, error } = useTodos(); // Fetch todos
  const deleteTodoMutation = useDeleteTodo(); // Delete todo mutation
  const router = useRouter();
  const [opened, setOpened] = useState(false);
  const [taskId, setTaskId] = useState<number | null>(null);
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

  const filteredData = useMemo(() =>
    todos.filter((todo: { taskName: string; }) => todo.taskName.toLowerCase().includes(searchTerm.toLowerCase())),
    [todos, searchTerm]
  );

  // Calculate pagination
  const totalItems = filteredData.length;

  // Setting up the table instance using useReactTable
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
        <CustomButton title="Add New TODO" onClick={handleAdd} />
        <PaginatedSortableTable
          data={filteredData}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          itemsPerPage={itemsPerPage}
          totalItems={totalItems}
          handleAction={handleAction} // Pass handleAction to the table
        />
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
