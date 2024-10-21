import React from 'react';

interface SearchInputProps {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const SearchInput: React.FC<SearchInputProps> = ({ value, onChange }) => {
  return (
    <input
      type="text"
      placeholder="Search TODOs..."
      value={value}
      onChange={onChange}
      className="border p-2 mb-6 w-full rounded border-black border"
    />
  );
};

export default SearchInput;
