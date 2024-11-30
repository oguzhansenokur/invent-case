import React from "react";
import "./main.scss";
import Table from "./components/Table/Table";
import { GridColDef } from "@mui/x-data-grid";


function App() {
  const columns: GridColDef<(typeof rows)[number]>[] = [
    { field: "imdbID", headerName: "ID", width: 90 },
    {
      field: "Title",
      headerName: "Name",
      width: 150,
      editable: true,
    },
    {
      field: "Year",
      headerName: "Year",
      width: 150,
      editable: true,
    },
  ];

  return (
    <div className="App">
      <Table  columns={columns} />
    </div>
  );
}

export default App;
