"use client";
import React from "react";
import { flexRender, Table as TanStackTable, ColumnDef } from "@tanstack/react-table";
import { Pagination } from "@mantine/core";

interface TableProps {
  table: TanStackTable<any>;
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Table: React.FC<TableProps> = ({ table, currentPage, totalPages, onPageChange }) => {
  return (
    <div>
      <table className="table-auto w-full  border-spacing-2 font-bold ">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id} className="p-1 border">
                  {header.isPlaceholder
                    ? null
                    : flexRender(header.column.columnDef.header, header.getContext())}
                  {header.column.getCanSort() ? (
                    <button
                      onClick={header.column.getToggleSortingHandler()}
                      className="ml-8 "
                    >
                      {header.column.getIsSorted() === "asc" ? "🔼" : "🔽"}
                    </button>
                  ) : null}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className="p-2 border">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <Pagination
        total={totalPages}
        onChange={onPageChange}
        className="mt-5"
        // page={currentPage}
      />
    </div>
  );
};

export default Table;
