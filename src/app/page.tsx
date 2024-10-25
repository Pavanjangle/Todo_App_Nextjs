"use client";
import React, { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import ConfirmationModal from "@/components/ConfirmationModal";
import PaginatedSortableTable from "@/components/TodoTable";
import "@mantine/core/styles.css";
import CustomButton from "./sharedComponent/Button";
import { useDeleteTodo, useTodos } from "@/utils/api";
import SearchInput from "@/components/SearchInput";
import EditTask from "./tasks/edit/page";

const Todo: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [handleFetch, sethandleFetch] = useState<boolean>(false);
  const [params, setParams] = useState({
    page: "1",
    limit: "5",
    property: "",
    sort: "reset",
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
  const itemsPerPage = 4;
  const [openEdit, setOpenEdit] = useState(false);
  const [taskName, setTaskName] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [sortDirection, setSortDirection] = useState("reset");

  useEffect(() => {
    sethandleFetch(true);
  }, [params]);

  const handleAction = (id: number, action: string, taskName: string) => {
    setAction(action);
    setTaskId(id);
    if (action === "Delete") {
      setOpened(true);
    } else {
      setTaskName(taskName);
      setOpenEdit(true);
      sethandleFetch(false);
    }
  };

  useEffect(() => {
    const updateQueryParams = () => {
      const fullUrl = `/?page=${currentPage}&limit=${pageSize}&sortField=${"taskName"}&sortOrder=${sortDirection}`;
      router.push(fullUrl);
    };

    updateQueryParams();
  }, [currentPage, sortDirection, pageSize]);

  const handleAdd = () => {
    router.push("/tasks/new");
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
          pageSize={pageSize}
          setPageSize={setPageSize}
          sortDirection={sortDirection}
          setSortDirection={setSortDirection}
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
            }
          }}
        />

        <EditTask
          opened={openEdit}
          onClose={() => {
            setOpenEdit(false);
            sethandleFetch(true);
          }}
          taskName={taskName}
          id={taskId ? taskId.toString() : ""}
        />
      </div>
    </div>
  );
};

export default Todo;
