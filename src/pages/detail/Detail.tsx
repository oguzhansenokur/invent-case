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

   
  const {Title,Actors, Poster,Director, Genre, Language, MetaScore, Plot, Released, Ratings, Runtime, Type,Year, imdbRating } = data || {};


  return (
    <div className="detail">
      <div className="detail__left">
        <div className="detail__left__title">
          <h1>{Title}</h1>
        </div>
        <div className="detail__left__poster">
          <img src={Poster} alt={Title} />
        </div>
        <div className="detail__left__info">
          <div className="detail__left__info__item">
            <span className="detail__left__info__item__label">Actors:</span>
            <span className="detail__left__info__item__value">{Actors}</span>
          </div>
          <div className="detail__left__info__item">
            <span className="detail__left__info__item__label">Director:</span>
            <span className="detail__left__info__item__value">{Director}</span>
          </div>
          <div className="detail__left__info__item">
            <span className="detail__left__info__item__label">Genre:</span>
            <span className="detail__left__info__item__value">{Genre}</span>
          </div>
          <div className="detail__left__info__item">
            <span className="detail__left__info__item__label">Language:</span>
            <span className="detail__left__info__item__value">{Language}</span>
          </div>
        </div>
       
      </div>     
      <div className="detail__right">
        <div className="detail__right__bottom__item">
          <p>{Plot}</p>
        </div>
      </div>
    </div>);
};

export default Detail;