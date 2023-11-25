// Details.js

import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ContentWrapper from '../../../contentWrapper/ContentWrapper';
import './Details.css';

const Details = () => {
  const { movieDetailId } = useParams();
  const [movie, setMovie] = useState();
  const [loading, setLoading] = useState(true);

  const navigate=useNavigate();
  useEffect(() => {

    document.body.classList.add('detail-page');
    const getDetail = async () => {
      try {
        const response = await axios.get(`http://localhost:9090/admin/movie/${movieDetailId}`);
        setMovie(response.data);
        console.log(response.data);
        setLoading(false);
        window.scrollTo(0, 0);
      } catch (error) {
        console.error("Error fetching movie details:", error);
        setLoading(false);
      }
    };
    getDetail();
    return () => {
      document.body.classList.remove('detail-page');
    };



   
  }, [movieDetailId]);

  const convertToHoursAndMinutes=(totalMinutes)=>{
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    return `${hours}h ${minutes}min`;
  }

  const navigatetoshow=()=>{
      navigate(`/theatre/${movieDetailId}`)
  }
  
  return (
    <>
      {loading ? (
        <p>Loading...</p>
      ) : (
        movie && (
          <div className="detailcontainer">
            <div className="poster">
              {movie.posterImage && (
                <img src={`data:image/jpeg;base64,${movie.posterImage}`} alt={movie.title} style={{ width: '90%' }} />
              )}
            </div>
            <div className="info">
              <div className="movie-title">{movie.title}</div>
              <div className="movie-detail">
                <div className="set">
                  <label>Release Date:</label>
                  <span>{movie.year}</span>
                </div>
                <div className="set">
                  <label>Running Time:</label>
                  {/* <span>{movie.runtime}</span> */}
                  <span>{convertToHoursAndMinutes(movie.runtime)}</span>
                </div>
                <div className="set">
                  <label>Genre :</label>
                  <span>{movie.genre}</span>
                </div>
              </div>
              <div className="movie-description">{movie.description}</div>
              <div className="movie-cast">
          <div className="header">
            Voice Cast
          </div>
          <div className="list">
                {movie.movie_cast.map((castMember) => (
                  <div className="cast" key={castMember.castId}>
                    <img src={`data:image/jpeg;base64,${castMember.castImage}`} alt={castMember.castName} />
                    <label>{castMember.castCharacterName}</label>
                  </div>
                ))}
              </div>
              <div className="book-movie-button">
              <button onClick={navigatetoshow}>Book Movie</button>
            </div>
            </div>
          </div>
         
          </div>
        )
      )}
    </>
  );
};

export default Details;
