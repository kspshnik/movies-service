import * as React from 'react';
import PropTypes from 'prop-types';

import Preloader from '../Preloader/Preloader';

import './MoviesList.css';

const MoviesList = ({
  component: Component,
  movies,
  favourities,
  onMovieLike,
  onMovieDislike,
  isLoading,
}) => (
  <>
    {
      isLoading ? <Preloader />
        : (
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
        )
}
  </>
);
MoviesList.propTypes = {
  component: PropTypes.func.isRequired,
  movies: PropTypes.arrayOf(PropTypes.shape({
    country: PropTypes.string,
    year: PropTypes.string,
    duration: PropTypes.number.isRequired,
    director: PropTypes.string,
    description: PropTypes.string.isRequired,
    image: PropTypes.object.isRequired,
    trailerLink: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    owner: PropTypes.string,
    nameRU: PropTypes.string.isRequired,
    nameEM: PropTypes.string,
  })).isRequired,
  favourities: PropTypes.array.isRequired,
  onMovieLike: PropTypes.func.isRequired,
  onMovieDislike: PropTypes.func.isRequired,
  isLoading: PropTypes.bool,
};

MoviesList.defaultProps = {
  isLoading: false,
};
export default MoviesList;
