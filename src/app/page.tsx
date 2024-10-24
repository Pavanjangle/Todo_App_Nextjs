"use client";
import React, { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import ConfirmationModal from "@/components/ConfirmationModal";
import PaginatedSortableTable from "@/components/TodoTable";
import "@mantine/core/styles.css";
import CustomButton from "./sharedComponent/Button";
import { useDeleteTodo, useTodos } from "@/utils/api";
import SearchInput from "@/components/SearchInput";

const Todo: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [handleFetch, sethandleFetch] = useState<boolean>(false);
  const [params, setParams] = useState({
    page: "1",
    limit: "5",
    property: "taskName",
    sort: "asc",
  });
  const [action, setAction] = useState<string>("");
  const {
    data: todos = { data: [], totalPages: 0 },
    isLoading,
    error,
  } = useTodos(
    params.page,
    params.limit,
    params.property,
    params.sort,
    handleFetch
  ); // Fetch todos
  const deleteTodoMutation = useDeleteTodo();
  const router = useRouter();
  const [opened, setOpened] = useState(false);
  const [taskId, setTaskId] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  useEffect(() => {
    sethandleFetch(true);
  }, [params]);

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
    setAction("");
  };

  const handleConfirmDelete = () => {
    if (taskId) {
      deleteTodoMutation.mutate(taskId);
      setOpened(false);
      setTaskId(null);
      setAction("");
    }
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const filteredData = useMemo(
    () =>
      todos?.data?.filter((todo: { taskName: string }) =>
        todo.taskName.toLowerCase().includes(searchTerm.toLowerCase())
      ),
    [todos?.data, searchTerm]
  );

  // Setting up the table instance using useReactTable
  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading todos</p>;

  return (
    <div className="min-h-screen bg-custom-gray flex justify-center items-center">
      <div className="bg-gray-300 shadow-lg rounded-lg p-8 max-w-xl w-full">
        <h1 className="text-2xl font-bold mb-5 text-center">TODO App</h1>

        <SearchInput value={searchTerm} onChange={handleSearch} />
        <CustomButton title="Add New TODO" onClick={handleAdd} />
        <PaginatedSortableTable
          data={filteredData}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          itemsPerPage={itemsPerPage}
          totalPages={todos?.totalPages}
          handleAction={handleAction}
          handleSorting={(
            page: string,
            limit: string,
            sortField: string,
            sortOrder: string
          ) => {
            const data = {
              page: page,
              limit: limit,
              property: sortField,
              sort: sortOrder,
            };
            setParams(data);
          }}
        />
        {/* Confirmation Modal */}
        <ConfirmationModal
          opened={opened}
          actionType={action}
          confirmButtonTitle={action}
          message={
            action === "Delete"
              ? "Do you really want to delete this task?"
              : "Are you sure want to edit this task?"
          }
          onClose={() => setOpened(false)}
          onConfirm={(action) => {
            if (action === "Delete") {
              handleConfirmDelete();
            } else if (action === "Yes") {
              handleEdit();
            }
          }}
        />
      </div>
    </div>
  );
};

export default Todo;
