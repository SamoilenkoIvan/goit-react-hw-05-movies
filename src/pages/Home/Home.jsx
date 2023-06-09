import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { fetchTrending } from '../../api';
import PropTypes from 'prop-types';
import {
  HomeContainer,
  HomeTitle,
  MovieList,
  MovieItem,
  MovieLink,
  Img,
  MovieTitle,
} from './Home.styled';

const Home = () => {
  const [movies, setMovies] = useState([]);
  const location = useLocation();
  useEffect(() => {
    fetchTrending().then(setMovies);
  }, []);

  return (
    <HomeContainer>
      <HomeTitle>Tranding today</HomeTitle>
      {movies.length > 0 && (
        <MovieList>
          {movies.map(({ id, title, poster }) => (
            <MovieItem key={id}>
              <MovieLink to={`/movies/${id}`} state={{ from: location }}>
                <Img src={poster} alt={title} />
                <MovieTitle>
                  <h3>{title}</h3>
                </MovieTitle>
              </MovieLink>
            </MovieItem>
          ))}
        </MovieList>
      )}
    </HomeContainer>
  );
};


Home.propTypes = {
  movies: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      poster: PropTypes.string.isRequired,
    })
  ),
};

export default Home;