import React, { useState } from 'react';
import PropTypes from 'prop-types';

import SearchBar from '../SearchBar/SearchBar';
import MoviesList from "../MoviesList/MoviesList";
import { Movie } from "../Movie/Movie";

import './MoviesPages.css';

function MoviesPage({
                      moviesFound,
                      moviesShown = [],
                      columns,
                      onMovieLike,
                      onMovieDislike,
                      term = '',
                      isFiltering = false,
                      onSearchSubmit,
                      onStartFiltering,
                      onStopFiltering}) {
  const [movies, setMovies] = useState(moviesShown);

  return (
    <main className='movies-list'>
    <SearchBar term={term}
               isFiltering={isFiltering}
               onSearchSubmit={onSearchSubmit}
               onStartFiltering={onStartFiltering}
               onStopFiltering={onStopFiltering} />
    <MoviesList component={Movie}
                movies={moviesFound}
                onMovieLike={onMovieLike}
                onMovieDislike={onMovieDislike} />
    </main>
  )
}

MoviesPage.propTypes = {
  moviesFound: PropTypes.arrayOf(PropTypes.shape({
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
  moviesShown: PropTypes.arrayOf(PropTypes.shape({
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
                                                 })),
  columns: PropTypes.number.isRequired,
  onMovieLike: PropTypes.func.isRequired,
  onMovieDislike: PropTypes.func.isRequired,
  term: PropTypes.string,
  isFiltering: PropTypes.bool,
  onSearchSubmit: PropTypes.func.isRequired,
  onStartFiltering: PropTypes.func.isRequired,
  onStopFiltering: PropTypes.func.isRequired,
}

export default MoviesPage;
