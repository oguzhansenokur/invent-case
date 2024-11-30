import { TextField } from "@mui/material";
import React from "react";
interface SearchBarProps {
    search: string;
    onSearchChange: (search: string) => void;
}

const SearchBar :React.FC<SearchBarProps> = ({ search, onSearchChange }) => (
  <TextField
    id="outlined-basic"
    label="Search"
    variant="outlined"
    value={search}
    onChange={(e) => onSearchChange(e.target.value)}
    style={{ marginBottom: "16px" }}
  />
);

export default SearchBar;