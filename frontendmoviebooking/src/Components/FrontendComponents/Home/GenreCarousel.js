import React, { useState, useEffect } from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import ContentWrapper from '../../contentWrapper/ContentWrapper';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const GenreCarousel = ({ genre }) => {
  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 4,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  const navigate = useNavigate();
  const [movieList, setMovieList] = useState([]);

  useEffect(() => {
    const getAllMovies = async () => {
      try {
        const token = localStorage.getItem('token');
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        const movielistresponse = await axios.get("http://localhost:9090/admin/movielist", config);
        setMovieList(movielistresponse.data);
      } catch (error) {
        console.log(error);
      }
    };

    getAllMovies();
  }, []);

  const moveToDetail = (movieId) => {
    navigate(`/details/${movieId}`);
  };

  const filteredMovies = genre
    ? movieList.filter((movie) => movie.genre.toLowerCase() === genre.toLowerCase())
    : movieList;

  return (
    <div>
      <ContentWrapper>
        <Carousel centerMode={true} responsive={responsive}>
          {filteredMovies.map((movie, index) => (
            <div key={index} onClick={() => moveToDetail(movie.movieDetailId)}>
              {movie.posterImage && (
                <img src={`data:image/jpeg;base64,${movie.posterImage}`} alt={movie.title} style={{ width: '90%' }} />
              )}
              <p>{movie.title}</p>
              <p>Genre: {movie.genre}</p>
            </div>
          ))}
        </Carousel>
      </ContentWrapper>
    </div>
  );
};

export default GenreCarousel;
