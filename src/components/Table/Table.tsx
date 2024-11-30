import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import TextField from "@mui/material/TextField";
import apiWrapper from "../../api/apiWrapper.js";
import { Button, } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { GridColDef } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";



const years = [
  {label: "All", value: null},
  {label: "2022", value: "2022"},
  {label: "2021", value: "2021"},
  {label: "2020", value: "2020"},
  {label: "2019", value: "2019"},
  {label: "2018", value: "2018"},
  {label: "2017", value:"2017"},
  
];

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

const Table = () => {
  const [rows, setRows] = useState([]);
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 10,
  });
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("Pokemon");
  const [totalCount, setTotalCount] = useState(0);
  const [type,setType] = useState(null);
  const [year, setYear ] = useState(null);
  const [initialLoad, setInitialLoad] = useState(true); // İlk yükleme kontrolü
  const navigate = useNavigate();


  const loadMoreData = async () => {
    setLoading(true);
    try {
      const { page, pageSize } = paginationModel;

      
      const response = await apiWrapper.getData({
        page: page + 1, 
        s:search,
        type,
        y:year
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
    if (initialLoad) {
      setInitialLoad(false);
      loadMoreData(); 
      return;
    }
    setPaginationModel((prev) => ({ ...prev, page: 0 }));

  }, [search, type,year]);

  useEffect(() => {
    if(!initialLoad) {
      loadMoreData();
    }
    
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
      <Button
        variant="contained"
        color="primary"
        onClick={()=> {
          setType("movie");
        }}
        
      >
        Movies
      </Button>
      <Button
        variant="contained"
        color="primary"
        onClick={()=> {
          setType("series");
        }}
        
      >
        Series
      </Button>
      <Button
        variant="contained"
        color="primary"
        onClick={()=> {
          setType("episode");
        }}
        
      >
        Episode
      </Button>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={year}
        label="Year"
        onChange={(e) => setYear(e.target.value)}

      >
        {years.map((year, index) => (
          <MenuItem key={index} value={year.value}>{year.label}</MenuItem>
        ))}
      </Select>

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
        onRowClick={(row) => {
          navigate(`/details/${row.imdbID || row.id}`);
        }}
      />
    </div>
  );
};

export default Table;
