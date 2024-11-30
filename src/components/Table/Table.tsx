import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import TextField from "@mui/material/TextField";
import apiWrapper from "../../api/apiWrapper.js";

const Table = ({ columns }) => {
  const [rows, setRows] = useState([]);
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 10,
  });
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("Pokemon");
  const [totalCount, setTotalCount] = useState(0);

  const loadMoreData = async () => {
    setLoading(true);
    try {
      const { page, pageSize } = paginationModel;

      
      const response = await apiWrapper.getData({
        page: page + 1, 
        s:search
      });
      if(response.Response === "True" ) {
        setRows(response.Search); 
        setTotalCount(response.totalResults); 
      }
      else {
        setRows([]);
        setTotalCount(0);
      }

    } catch (error) {
      console.error("Error loading data:", error);
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    setPaginationModel((prev) => ({ ...prev, page: 0 }));
    loadMoreData();
  }, [search]);

  useEffect(() => {
    loadMoreData();
  }, [paginationModel]);

  return (
    <div>
      <TextField
        id="outlined-basic"
        label="Search"
        variant="outlined"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{ marginBottom: "16px" }}
      />

      <DataGrid
        rows={rows}
        columns={columns}
        getRowId={(row) => row.imdbID || row.id} // Her satır için benzersiz bir ID
        paginationMode="server" 
        rowCount={totalCount} 
        loading={loading}
        paginationModel={paginationModel}
        onPaginationModelChange={(model) => setPaginationModel(model)} 
        disableRowSelectionOnClick
      />
    </div>
  );
};

export default Table;
