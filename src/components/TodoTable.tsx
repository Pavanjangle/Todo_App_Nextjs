"use client";
import React, { useEffect, useState } from "react";
import { Column, flexRender, Table as TanStackTable } from "@tanstack/react-table";
import { Table as MantineTable, Pagination, Select, ScrollArea } from "@mantine/core";

interface TableProps {
  table: TanStackTable<never>;
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  onSortChange: () => void; // For server-side sorting
  pageSize: number; // Page size limit for dropdown
  onPageSizeChange: (size: number) => void; // To handle page size change
}

const Table: React.FC<TableProps> = ({
  table,
  currentPage,
  totalPages,
  onPageChange,
  onSortChange,
  pageSize,
  onPageSizeChange,
}) => {
  const [sortIcon, setSortIcon] = useState<string>("");

  // Handle sorting across pages
  useEffect(() => {
    table.setPageIndex(0); // Reset to first page after sorting
    onSortChange(); // Fetch sorted data across all pages
  }, [table.getState().sorting, onSortChange]);

  // Handle sort icon rendering based on column state
  const renderSortIcon = (column: Column<never, unknown>) => {
    if (column.getIsSorted() === "asc") {
      return "🔼";
    } else if (column.getIsSorted() === "desc") {
      return "🔽";
    }
    return "↕️"; 
  };

  return (
    <div className="w-full max-w-7xl mx-auto mt-10">
      <ScrollArea>
        <MantineTable
          striped
          highlightOnHover
          
          withColumnBorders
          className="min-w-full table-auto"
        >
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id} className="bg-gray-100 text-center font-bold text-lg">
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className="p-4 text-gray-800 border-b border-gray-300"
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(header.column.columnDef.header, header.getContext())}
                    {header.column.getCanSort() && (
                      <button
                        onClick={header.column.getToggleSortingHandler()}
                        className="ml-4 text-gray-500 hover:text-gray-700"
                      >
                        {renderSortIcon(header.column)}
                      </button>
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id} className="text-center font-bold">
                {row.getVisibleCells().map((cell) => (
                  <td
                    key={cell.id}
                    className="p-4 border-b border-gray-200 text-gray-700"
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </MantineTable>
      </ScrollArea>

      {/* Dropdown to select number of rows per page */}
      <div className="flex justify-between mt-5">
        <Select
          label="Rows per page"
          value={pageSize.toString()}
          onChange={(value) => onPageSizeChange(Number(value))}
          data={["5", "10", "20", "50"]}
          className="w-32"
        />

        {/* Pagination */}
        <Pagination
          total={totalPages}
          onChange={onPageChange}
          className="flex justify-center"
          page={currentPage}
        />
      </div>
    </div>
  );
};

export default Table;
