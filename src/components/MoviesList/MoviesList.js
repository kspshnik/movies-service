import * as React from 'react';
import PropTypes from 'prop-types';

import './MoviesList.css';

const MoviesList = ({
  component: Component, allMovies, columns, onMovieLike, onMovieDislike, isFavouritesList,
}) => {
  const rows = (columns > 1) ? 4 : 5;

  const movies = isFavouritesList ? allMovies : allMovies.slice(0, (rows * columns) - 1);
  return (
    <ul className='movies'>
      {movies.map((movie) => (
        <Component
          key={movie.movieId}
          movie={movie}
          onMovieLike={onMovieLike}
          onMovieDislike={isFavouritesList && onMovieDislike} />
      ))}

    </ul>
  );
};
MoviesList.propTypes = {
  component: PropTypes.element.isRequired,
  allMovies: PropTypes.arrayOf(PropTypes.shape({
    country: PropTypes.string,
    year: PropTypes.string,
    duration: PropTypes.string.isRequired,
    director: PropTypes.string,
    description: PropTypes.string.isRequired,
    image: PropTypes.string,
    trailer: PropTypes.string.isRequired,
    thumbnail: PropTypes.string.isRequired,
    movieId: PropTypes.string.isRequired,
    owner: PropTypes.string,
    nameRU: PropTypes.string.isRequired,
    nameEM: PropTypes.string,
  })).isRequired,
  columns: PropTypes.number.isRequired,
  onMovieLike: PropTypes.func.isRequired,
  onMovieDislike: PropTypes.func.isRequired,
  isFavouritesList: PropTypes.bool,
};
MoviesList.defaultProps = {
  isFavouritesList: false,
};

export default MoviesList;
