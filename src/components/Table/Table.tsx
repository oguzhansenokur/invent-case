import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useNavigate, useSearchParams } from "react-router-dom";
import SearchBar from "./SearchBar";
import FilterButtons from "./FilterButtons";
import YearSelector from "./YearSelector";
import apiWrapper from "../../api/apiWrapper";
import "./style.scss";

const years = [
  { label: "All", value: null },
  { label: "2022", value: "2022" },
  { label: "2021", value: "2021" },
  { label: "2020", value: "2020" },
  { label: "2019", value: "2019" },
];

const columns = [
  {field:"Poster", headerName:"Poster", width: 100, renderCell: (params) => <div className="poster" style={{ backgroundImage: `url(${params.row.Poster})` }}  />},
  { field: "imdbID", headerName: "ID", width: 150 },
  { field: "Title", headerName: "Name", width: 300 },
  { field: "Year", headerName: "Year", width: 100 },
];

const Table = () => {
  const [rows, setRows] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(false);

  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const search = searchParams.get("search");
  const type = searchParams.get("type") || null;
  const year = searchParams.get("year") || null;
  const page = parseInt(searchParams.get("page") || "1", 10);

  const loadMoreData = async () => {
    setLoading(true);
    try {
      const response = await apiWrapper.getData({
        page: page + 1,
        s: search || "",
        type,
        y: year,
      });
      if (response.Response === "True") {
        setRows(response.Search);
        setTotalCount(response.totalResults);
      } else {
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
    loadMoreData();
  }, [search, type, year, page]);

  const updateParams = (newParams: { [key: string]: string | null | number }) => {

    setSearchParams((prevParams) => {
      const updatedParams = new URLSearchParams(prevParams);
      Object.keys(newParams).forEach((key) => {
        if (newParams[key] !== null && newParams[key] !== undefined) {
          updatedParams.set(key, newParams[key]);
        } else {
          updatedParams.delete(key);
        }
      });
      return updatedParams;
    });
  };

  return (
    <div className="table">
      <div className="table__filter">
        <SearchBar
          search={search}
          onSearchChange={(newSearch : string) => updateParams({ search: newSearch, page: 0 })}
        />
        <FilterButtons
          types={["movie", "series", "episode"]}
          setType={(newType : string) => updateParams({ type: newType, page: 0 })}
        />
        <YearSelector
          year={year}
          years={years}
          onYearChange={(newYear : string) => updateParams({ year: newYear, page: 0 })}
        />
      </div>
      <DataGrid
        rows={rows}
        columns={columns}
        getRowId={(row) => row.imdbID || row.id}
        paginationMode="server"
        rowCount={totalCount}
        loading={loading}
        rowHeight={80}
        paginationModel={{ page: page-1, pageSize: 10 }}
        onPaginationModelChange={(newModel) =>
        {
          const newPage = newModel.page + 1; 
          if (newPage !== page) {
            updateParams({ page: newPage });
          }
        }        }
        disableRowSelectionOnClick
        onRowClick={(row) => {
          navigate(`/details/${row.imdbID || row.id}`);
        }}
        sx={{
          "& .MuiDataGrid-root": {
            border: "1px solid #28282d",
            borderRight : "1px solid #28282d",
            borderLeft : "1px solid #28282d",
            borderTop : "1px solid #28282d", 
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
    </div>
  );
};

export default Table;
