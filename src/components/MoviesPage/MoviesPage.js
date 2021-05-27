import React from 'react';
import PropTypes from 'prop-types';

import SearchBar from '../SearchBar/SearchBar';
import MoviesList from '../MoviesList/MoviesList';
import { Movie } from '../Movie/Movie';

import './MoviesPages.css';

const MoviesPage = ({
  moviesFound,
  columns,
  onMovieLike,
  onMovieDislike,
  term = '',
  isFiltering = false,
  onSearchSubmit,
  onStartFiltering,
  onStopFiltering,
}) => (
  <main className='movies-list'>
    <SearchBar
      term={term}
      isFiltering={isFiltering}
      onSearchSubmit={onSearchSubmit}
      onStartFiltering={onStartFiltering}
      onStopFiltering={onStopFiltering} />
    <MoviesList
      component={Movie}
      allMovies={moviesFound}
      columns={columns}
      onMovieLike={onMovieLike}
      onMovieDislike={onMovieDislike} />
  </main>
);

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
  columns: PropTypes.number.isRequired,
  onMovieLike: PropTypes.func.isRequired,
  onMovieDislike: PropTypes.func.isRequired,
  term: PropTypes.string,
  isFiltering: PropTypes.bool,
  onSearchSubmit: PropTypes.func.isRequired,
  onStartFiltering: PropTypes.func.isRequired,
  onStopFiltering: PropTypes.func.isRequired,
};

MoviesPage.defaultProps = {
  term: '',
  isFiltering: false,
};

export default MoviesPage;
