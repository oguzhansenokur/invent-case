import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import apiWrapper from "../../api/apiWrapper";
import "./style.scss";


const Detail =  () => {
  const {id } = useParams();
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await apiWrapper.getData({i:id, plot:"full"});
        setData(response);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };
    fetchData();
  },[]);

   
  const {Title,Actors, Poster,Director, Genre, Language, Plot, Released, Runtime, Type,Year, imdbRating } = data || {};
  const leftData = [
    { label: "Title", value: Title },
    { label: "Year", value: Year },
    { label: "Released", value: Released },
    { label: "Runtime", value: Runtime },
    { label: "Genre", value: Genre },
    { label: "Director", value: Director },
    { label: "Actors", value: Actors },
    { label: "Language", value: Language },
    { label: "IMDB Rating", value: imdbRating },
    { label: "Type", value: Type },
  ];

  if(loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="detail">
      <div className="detail__top">
        
        <h1>{Title}</h1>
        
        <div className="detail__left">
       
          <div className="detail__left__poster">
            <img src={Poster} alt={Title} />
          </div>
          <div className="detail__left__info">
            
            {leftData.map((item) => (
              <div className="detail__left__info__item" key={item.label}>
                <span className="detail__left__info__item__label">{item.label}:</span>
                <span className="detail__left__info__item__value">{item?.value || "-"}</span>
              </div>
            ))}
          </div>
       
        </div>     
        <div className="detail__right">
          <div className="detail__right__bottom__item">
            <p>{Plot}</p>
          </div>
        </div>
      </div>
    </div>);
};

export default Detail;