import React from "react";
import PropTypes from 'prop-types';

import './MoviesList.css'

function MoviesList({component: Component, movies, onMovieLike, onMovieDislike}) {
 return (
   <ul className='movies'>
    { movies.map((movie) =>

    <Component key={movie.movieId} movie={movie} onMovieLike={onMovieLike} onMovieDislike={onMovieDislike} />
    )}

  </ul>)
}
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
  onMovieLike: PropTypes.func.isRequired,
  onMovieDislike: PropTypes.func.isRequired,
};

export default MoviesList;
