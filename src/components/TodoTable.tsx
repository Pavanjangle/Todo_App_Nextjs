import React, { useState, useMemo } from 'react';
import { Table, Pagination, Button, Select, Group } from '@mantine/core';

interface DataItem {
  id: number;
  taskName: string;
  data: any[];
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
    setCurrentPage(1); // Reset to first page when changing page size
  };

  return (
    <div>
      <Table>
        <thead>
          <tr>
            <th>
              <Button variant="subtle" onClick={() => handleSort('id')}>
                ID {sortBy === 'id' ? (sortDirection === 'asc' ? '↑' : '↓') : ''}
              </Button>
            </th>
            <th>
              <Button variant="subtle" onClick={() => handleSort('TaskName')}>
                Task {sortBy === 'TaskName' ? (sortDirection === 'asc' ? '↑' : '↓') : ''}
              </Button>
            </th>
            <th>
              <Button variant="subtle">
                Action 
              </Button>
            </th>
          </tr>
        </thead>
        <tbody>
          {currentData.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.taskName}</td>
              <td>
                <Button
                  onClick={() => handleAction(item.id, "Yes")} // Edit action
                  variant="dark"
                >
                  Edit
                </Button>
                <Button
                  onClick={() => handleAction(item.id, "Delete")} // Delete action
                  color="red"
                  variant="light"
                  className="ml-2"
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
          style={{ width: '120px' }}
        />
        <Pagination
          page={currentPage}
          onChange={setCurrentPage}
          total={totalPages}
          position="center"
        />
      </Group>
    </div>
  );
};

export default PaginatedSortableTable;
