import React, { useEffect, useState } from "react";
import {  useNavigate, useSearchParams } from "react-router-dom";
import Table from "../../components/Main/Table";
import SearchBar from "../../components/Main/SearchBar";
import FilterButtons from "../../components/Main/FilterButtons";
import YearSelector from "../../components/Main/YearSelector";
import apiWrapper , { SearchResponse } from "../../api/apiWrapper";
import "./style.scss";

const years = [
  { label: "All", value: null },
  { label: "2022", value: "2022" },
  { label: "2021", value: "2021" },
  { label: "2020", value: "2020" },
  { label: "2019", value: "2019" },
];

const Main = () => {
  const [rows, setRows] = useState<SearchResponse["Search"]>([]);
  const [totalCount, setTotalCount] = useState< number>(0);
  const [loading, setLoading] = useState(false);
  const [hasRedirected, setHasRedirected] = useState(false); // Yönlendirme kontrolü

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
        page: page ,
        s: search || "",
        type,
        y: year,
      });
      if (response.Response === "True") {
        setRows(response.Search);
        setTotalCount(Number(response.totalResults));
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

  const updateParams = (newParams : Record<string, string | null | number>) => {
    setSearchParams((prevParams) => {
      const updatedParams = new URLSearchParams(prevParams);

      Object.keys(newParams).forEach((key) => {
        const value = newParams[key];
        if (value !== null && value !== undefined && value !== "") {
          updatedParams.set(key, value.toString());
        } else {
          updatedParams.delete(key);
        }
      });

      return updatedParams;
    });
  };

  useEffect(() => {
    loadMoreData();
  }, [search, type, year, page]);

  useEffect(() => {
    if (!search && !hasRedirected) {
      setHasRedirected(true);
      setSearchParams({ search: "Pokemon" }); 
    }
  }, [search, hasRedirected, setSearchParams]);

  if (!search && !hasRedirected) {
    return null; 
  }

  return (
    <div className="main">
      <div className="main__filter">
        <SearchBar
          search={search}
          onSearchChange={(newSearch) =>
            updateParams({ search: newSearch.trim() === "" ? "" : newSearch, page: 1 })
          }
        />
        <FilterButtons
          types={["movie", "series", "episode"]}
          setType={(newType) => updateParams({ type: newType, page: 1 })}
        />
        <YearSelector
          year={year}
          years={years}
          onYearChange={(newYear) => updateParams({ year: newYear, page: 1 })}
        />
      </div>
      <Table
        rows={rows}
        totalCount={totalCount}
        loading={loading}
        page={page}
        onPageChange={(newPage) => updateParams({ page: newPage })}
        onRowClick={(params) => navigate(`/details/${params.row.imdbID }`)}
      />
    </div>
  );
};

export default Main;
