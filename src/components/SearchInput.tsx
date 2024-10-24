import React from "react";
import { TextInput } from "@mantine/core";

interface SearchInputProps {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const SearchInput: React.FC<SearchInputProps> = ({ value, onChange }) => {
  return (
    <TextInput value={value} onChange={onChange} placeholder="Search TODO's" />
  );
};

export default SearchInput;
