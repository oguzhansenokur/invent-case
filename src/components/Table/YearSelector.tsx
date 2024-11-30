import React from "react";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

interface YearOption {
  label: string;
  value: string | null; 
}

interface YearSelectorProps {
  year: string | null; 
  years: YearOption[]; 
  onYearChange: (year: string | null) => void;
}

const YearSelector: React.FC<YearSelectorProps> = ({ year, years, onYearChange }) => (
  <Select
    value={year}
    onChange={(e) => onYearChange(e.target.value || null)} 
    style={{ marginBottom: "16px" }}
    displayEmpty
    sx={{
      color: "#e91e63", // Metin rengi
      border:"none",
      "& .MuiSvgIcon-root": {
        color: "red", // Açılır ok ikonu rengi
      },
    }}
  >
    {years?.map((yearOption, index) => (
      <MenuItem key={index} value={yearOption.value}>
        {yearOption.label}
      </MenuItem>
    ))}
  </Select>
);

export default YearSelector;
