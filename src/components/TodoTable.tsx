import React, {SetStateAction, Dispatch, useEffect } from "react";
import { Table, Pagination, Button, Select } from "@mantine/core";
interface DataItem {
  id: number;
  taskName: string;
  data: unknown[];
}

interface PaginatedSortableTableProps {
  data: DataItem[];
  handleAction: (id: number, action: string, taskName: string) => void;
  currentPage: number;
  setCurrentPage: Dispatch<SetStateAction<number>>;
  itemsPerPage: number;
  totalPages: number;
  handleSorting: (
    page: string,
    limit: string,
    sortField: string,
    sortOrder: string
  ) => void;
  pageSize: number;
  setPageSize: (limit: number) => void;
  sortDirection: string;
  setSortDirection: (sorting: string) => void;
}

const PaginatedSortableTable: React.FC<PaginatedSortableTableProps> = ({
  data,
  handleAction,
  handleSorting,
  totalPages,
  currentPage,
  setCurrentPage,
  pageSize,
  setPageSize,
  sortDirection,
  setSortDirection

}) => {
  useEffect(() => {
    handleSorting(
      currentPage.toString(),
      pageSize.toString(),
      "taskName",
      sortDirection
    );
  }, [currentPage, pageSize, sortDirection]);

  // Handle sorting
  const handleSort = (key: keyof DataItem) => {
    console.log(sortDirection);
    setSortDirection(
      sortDirection === "reset" ? "asc" : sortDirection === "asc" ? "desc" : "reset"
    );
  };

  // Handle page size change
  const handlePageSizeChange = (value: number) => {
    setPageSize(value);
    setCurrentPage(1);
  };

  return (
    <div className="p-4 bg-white shadow-md rounded-lg">
      <Table>
        <Table.Thead className="bg-gray-300">
          <Table.Tr>
            <Table.Th>
              <Button
                variant="subtle"
                size="xs"
                onClick={() => handleSort("id")}
                className="hover:underline text-gray-800"
              >
                ID{" "}
              </Button>
            </Table.Th>
            <Table.Th>
              <Button
                variant="subtle"
                size="xs"
                onClick={() => handleSort("taskName")}
                className="hover:underline text-gray-800"
              >
                Task{" "}
                {sortDirection === "asc"
                  ? "↑"
                  : sortDirection === "desc"
                  ? "↓"
                  : "↑↓"}
              </Button>
            </Table.Th>
            <Table.Th className="text-sm font-semibold text-gray-800 px-4 py-2">
              Action
            </Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Thead className="bg-gray-300">
        {data.map((item) => (
          <Table.Tr key={item.id}>
            <Table.Td className="font-bold text-gray-800 px-4 py-2 w-[100px]">
              {item.id}
            </Table.Td>
            <Table.Td className="font-medium text-gray-700 px-4 py-2 w-[300px]">
              {item.taskName}
            </Table.Td>
            <Table.Td className="px-4 py-2 w-[200px] flex space-x-2">
              <Button
                variant="filled"
                color="green"
                size="xs"
                onClick={() => handleAction(item.id, "Yes", item.taskName)}
                className="w-[70px]"
              >
                Edit
              </Button>
              <Button
                variant="filled"
                color="red"
                size="xs"
                onClick={() => handleAction(item.id, "Delete", item.taskName)}
                className="w-[70px]"
              >
                Delete
              </Button>
            </Table.Td>
          </Table.Tr>
          
        ))}
        </Table.Thead>
      </Table>

      <div className="flex justify-between items-center mt-4 ">
        <Select
          value={pageSize.toString()}
          onChange={(value) => handlePageSizeChange(Number(value))}
          data={[5, 10, 15, 20].map((size) => ({
            value: size.toString(),
            label: size.toString(),
          }))}
          size="xs"
          className="text-xs border border-gray-500 rounded px-2 py-1 w-[80px] ml-0 "
        />
        <div className="text-xs flex justify-center mt-4">
          <Pagination
            value={currentPage}
            onChange={setCurrentPage}
            total={totalPages}
            size="sm"
          />
        </div>
      </div>
    </div>
  );
};

export default PaginatedSortableTable;
