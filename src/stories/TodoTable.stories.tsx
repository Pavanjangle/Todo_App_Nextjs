import React, { useState } from "react";
import { Meta, StoryFn } from "@storybook/react";
import PaginatedSortableTable from "../components/TodoTable";

const sampleData = Array.from({ length: 20 }, (_, index) => ({
  id: index + 1,
  taskName: `Task ${index + 1}`,
  data: [],
}));

export default {
  title: "Components/PaginatedSortableTable",
  component: PaginatedSortableTable,
} as Meta;

const Template: StoryFn = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [sortDirection, setSortDirection] = useState("reset");
  
  const totalPages = Math.ceil(sampleData.length / pageSize);

  const handleAction = (id: number, action: string, taskName: string) => {
    alert(`Action: ${action} on ${taskName} (ID: ${id})`);
  };

  const handleSorting = (page: string, limit: string, sortField: string, sortOrder: string) => {
    console.log(`Sorting: ${sortField}, Order: ${sortOrder}, Page: ${page}, Limit: ${limit}`);
  };

  return (
    <PaginatedSortableTable
      data={sampleData.slice((currentPage - 1) * pageSize, currentPage * pageSize)}
      handleAction={handleAction}
      currentPage={currentPage}
      setCurrentPage={setCurrentPage}
      itemsPerPage={pageSize}
      totalPages={totalPages}
      handleSorting={handleSorting}
      pageSize={pageSize}
      setPageSize={setPageSize}
      sortDirection={sortDirection}
      setSortDirection={setSortDirection}
    />
  );
};

export const Default = Template.bind({});
