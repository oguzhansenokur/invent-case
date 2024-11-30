import { Button } from "@mui/material";
import React from "react";
interface FilterButtonsProps {
    types: string[];
    setType: (type: string) => void;
}

const FilterButtons: React.FC<FilterButtonsProps> = ({types, setType }) => (
  <div style={{ marginBottom: "16px" }}>
    {types.map((filterType) => (
      <Button
        key={filterType}
        variant="contained"
        color="primary"
        onClick={() => setType(filterType)}
        style={{ marginRight: "8px" }}
        className="filter-button"
      >
        {filterType.charAt(0).toUpperCase() + filterType.slice(1)}
      </Button>
    ))}
  </div>
);

export default FilterButtons;