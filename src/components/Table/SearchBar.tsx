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
    color="secondary"
    value={search}
    onChange={(e) => onSearchChange(e.target.value)}
    style={{ marginBottom: "16px" }}
    inputProps={{ style: { color: "white" } }}
    sx={{
      "& .MuiOutlinedInput-root": {
        "& fieldset": {
          borderColor: "#ff5860", 
        },
        "&:hover fieldset": {
          borderColor: "#e91e63", // Hover durumunda kenarlık rengi
        },
        "&.Mui-focused fieldset": {
          borderColor: "#e91e63", // Focus durumunda kenarlık rengi
        },
      },
      "& .MuiInputLabel-root": {
        color: "#ff5860", // Label rengi
      },
      "& .MuiInputLabel-root.Mui-focused": {
        color: "#e91e63", // Focus durumunda Label rengi
      },
    }}
  />
);

export default SearchBar;