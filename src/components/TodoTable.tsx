import React, { useState, useMemo } from 'react';
import { Table, Pagination, Button, Select, Group } from '@mantine/core';

interface DataItem {
  id: number;
  taskName: string;
  data: unknown[];
}

interface PaginatedSortableTableProps {
  data: DataItem[];
  handleAction: (id: number, action: string) => void;
}

const PaginatedSortableTable: React.FC<PaginatedSortableTableProps> = ({ data, handleAction }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [sortBy, setSortBy] = useState<null | string>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  // Sorting function
  const sortedData = useMemo(() => {
    if (!sortBy) return data;

    return [...data].sort((a, b) => {
      if (sortDirection === 'asc') {
        return a[sortBy] > b[sortBy] ? 1 : -1;
      }
      return a[sortBy] < b[sortBy] ? 1 : -1;
    });
  }, [data, sortBy, sortDirection]);

  // Calculate total pages
  const totalPages = Math.ceil(sortedData.length / pageSize);

  // Get current page data
  const startIndex = (currentPage - 1) * pageSize;
  const currentData = sortedData.slice(startIndex, startIndex + pageSize);

  // Handle sorting
  const handleSort = (key: string) => {
    if (sortBy === key) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(key);
      setSortDirection('asc');
    }
  };
  // Handle page size change
  const handlePageSizeChange = (value: number) => {
    setPageSize(value);
    setCurrentPage(1); 
  };

  return (
    <div className="p-4 bg-white shadow-md rounded-lg">
    <Table>
      <thead className="bg-gray-300">
        <tr>
          <th className="text-xl font-bold text-gray-800">
            <Button variant="subtle" onClick={() => handleSort('id')} className="hover:underline text-gray-800">
              ID {sortBy === 'id' ? (sortDirection === 'asc' ? '↑' : '↓') : ''}
            </Button>
          </th>
          <th className="text-xl font-bold text-gray-800">
            <Button variant="subtle" onClick={() => handleSort('TaskName')} className="hover:underline text-gray-800">
              Task {sortBy === 'TaskName' ? (sortDirection === 'asc' ? '↑' : '↓') : ''}
            </Button>
          </th>
          <th className="text-sm font-semibold text-gray-800">Action</th>
        </tr>
      </thead>
      <tbody>
        {currentData.map((item) => (
          <tr key={item.id} className="border-b border-gray-700">
            <td className="font-bold text-gray-800">{item.id}</td>
            <td className="font-medium text-gray-700">{item.taskName}</td>
            <td>
              <Button
                onClick={() => handleAction(item.id, "Yes")} // Edit action
                variant="light"
                color="green"
                className="mr-2"
              >
                Edit
              </Button>
              <Button
                onClick={() => handleAction(item.id, "Delete")} // Delete action
                variant="light"
                color="red"
              >
                Delete
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  
    <Group position="apart" mt="md">
      <Select
        value={pageSize}
        onChange={(value) => handlePageSizeChange(Number(value))}
        data={[5, 10, 15, 20].map((size) => ({
          value: size.toString(),
          label: size.toString(),
        }))}
        label="Rows per page"
        className="text-xs"
        styles={{ dropdown: { fontSize: '12px' } }}
      />
      <Pagination
        page={currentPage}
        onChange={setCurrentPage}
        total={totalPages}
        position="center"
        className="text-xs"
      />
    </Group>
  </div>
  
  );
};

export default PaginatedSortableTable;
