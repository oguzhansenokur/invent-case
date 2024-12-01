import React from "react";
import { DataGrid, GridColDef, GridRowParams } from "@mui/x-data-grid";
import "./style.scss";
import { SearchResponse } from "../../api/apiWrapper";

const columns = [
  {
    field: "Poster",
    headerName: "Poster",
    width: 100,
    renderCell: (params: GridColDef) => (
      <div
        className="poster"
        style={{ backgroundImage: `url(${params.row.Poster})` }}
      />
    ),
  },
  { field: "imdbID", headerName: "ID", width: 150 },
  { field: "Title", headerName: "Name", width: 300 },
  { field: "Year", headerName: "Year", width: 100 },
];

interface TableProps {
  rows: SearchResponse["Search"];
  totalCount: number ;
  loading: boolean;
  page: number;
  onPageChange: (page: number) => void;
  onRowClick: (params: GridRowParams<SearchResponse["Search"]>) => void;
}

const Table: React.FC<TableProps> = ({
  rows,
  totalCount,
  loading,
  page,
  onPageChange,
  onRowClick,
}) => {
  return (
    <DataGrid
      rows={rows}
      columns={columns}
      getRowId={(row) => row.imdbID }
      paginationMode="server"
      rowCount={totalCount}
      loading={loading}
      rowHeight={80}
      paginationModel={{ page: page - 1 , pageSize: 10 }}
      onPaginationModelChange={(newModel) => {
        const newPage = newModel.page + 1;
        if (newPage !== page) {
          onPageChange(newPage);
        }
      }}
      disableRowSelectionOnClick
      onRowClick={onRowClick}
      sx={{
        minHeight: "913px",
        "& .MuiDataGrid-root": {
          border: "1px solid #28282d",
          borderRight : "1px solid #28282d",
          borderLeft : "1px solid #28282d",
          borderTop : "1px solid #28282d", 
          minHeight: "600px",
        },
        "& .MuiDataGrid-cell": {
          borderBottom: "1px solid #28282d", 
          borderTop: "1px solid #28282d",
          borderRight: "1px solid #28282d",
          color: "white",
          borderLeft: "1px solid #28282d",
        },
        "& .MuiDataGrid-columnHeaders": {
          borderBottom: "2px solid #28282d",
          borderTop: "2px solid #28282d",
          backgroundColor: "#28282d",
          background: "#28282d",
        },
        "& .MuiDataGrid-columnHeader": {
          borderRight: "1px solid #28282d",
          borderLeft: "1px solid #28282d",
          backgroundColor: "#28282d",
          color: "white",
          fontSize: "16px",
          fontWeight: "bold",
        },
        "& .MuiDataGrid-filler" : {
          backgroundColor: "#28282d",
        },
        "& .MuiTablePagination-displayedRows" :{
          color: "white",
        },
        "& .MuiTablePagination-actions": {
          color: "white",
        },  
        maxWidth: "100%",
      }}
    />
  );
};

export default Table;
