import * as React from 'react';
import PropTypes from 'prop-types';

import './MoviesList.css';

const MoviesList = ({
  component: Component,
  movies,
  favourities,
  onMovieLike,
  onMovieDislike,
}) => (
  <ul className='movies'>
    {movies.map((movie) => (
      <Component
        key={movie.id}
        movie={movie}
        isFavourite={favourities.includes(movie.id)}
        onMovieLike={onMovieLike}
        onMovieDislike={onMovieDislike} />
    ))}

  </ul>
);
MoviesList.propTypes = {
  component: PropTypes.element.isRequired,
  movies: PropTypes.arrayOf(PropTypes.shape({
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
  favourities: PropTypes.array.isRequired,
  onMovieLike: PropTypes.func.isRequired,
  onMovieDislike: PropTypes.func.isRequired,
};

export default MoviesList;
