import React, { useState, SetStateAction, Dispatch, useEffect } from 'react';
import { Table, Pagination, Button, Select } from '@mantine/core';

interface DataItem {
  id: number;
  taskName: string;
  data: unknown[];
}

interface PaginatedSortableTableProps {
  data: DataItem[];
  handleAction: (id: number, action: string) => void;
  currentPage: number;
  setCurrentPage: Dispatch<SetStateAction<number>>;
  itemsPerPage: number;
  totalPages: number;
  handleSorting:(page:string, limit:string, sortField:string, sortOrder:string) => void;
}

const PaginatedSortableTable: React.FC<PaginatedSortableTableProps> = ({ data, handleAction, handleSorting, totalPages}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [sortBy, setSortBy] = useState<keyof DataItem>('taskName');

  // useEffect(() => {
  //   handleSorting(currentPage.toString(), pageSize.toString(), sortBy, sortDirection);
  // }, [currentPage, pageSize, sortBy, sortDirection, handleSorting]);
  

  useEffect(() =>{
    handleSorting(currentPage.toString(), pageSize.toString(), sortBy, sortDirection);
  },[currentPage, pageSize, sortDirection, sortBy, handleSorting]);

  // Handle sorting
  const handleSort = (key: keyof DataItem) => {
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
            <th className="text-lg font-bold text-gray-800 px-4 py-2">
              <Button
                variant="subtle"
                size="xs"
                onClick={() => handleSort('id')}
                className="hover:underline text-gray-800"
              >
                ID {sortBy === 'id' ? (sortDirection === 'asc' ? '↑' : '↓') : ''}
              </Button>
            </th>
            <th className="text-lg font-bold text-gray-800 px-4 py-2">
              <Button
                variant="subtle"
                size="xs"
                onClick={() => handleSort('taskName')}
                className="hover:underline text-gray-800"
              >
                Task {sortBy ? (sortDirection === 'asc' ? '↑' : '↓') : ''}
              </Button>
            </th>
            <th className="text-sm font-semibold text-gray-800 px-4 py-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id} className="border-b border-gray-700">
              <td className="font-bold text-gray-800 px-4 py-2 w-[100px]">{item.id}</td>
              <td className="font-medium text-gray-700 px-4 py-2 w-[300px]">{item.taskName}</td>
              <td className="px-4 py-2 w-[200px] flex space-x-2">
                <Button
                  variant="filled"
                  color="green"
                  size="xs"
                  onClick={() => handleAction(item.id, 'Yes')}
                  className="w-[70px]"
                >
                  Edit
                </Button>
                <Button
                  variant="filled"
                  color="red"
                  size="xs"
                  onClick={() => handleAction(item.id, 'Delete')}
                  className="w-[70px]"
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
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
