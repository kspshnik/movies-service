import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import SearchBar from '../SearchBar/SearchBar';
import MoviesList from '../MoviesList/MoviesList';
import { Movie } from '../Movie/Movie';
import MoreButton from './MoreButton';

import searchMovies from '../../helpers/searchMovies';

import './MoviesPages.css';

function MoviesPage({
  allMovies,
  favourities,
  columns,
  onMovieLike,
  onMovieDislike,
  isLoading,
  isError,
  errorMessage,
}) {
  const [search, setSearch] = useState('');
  const [isShort, setShort] = useState(false);
  const [foundMovies, setFoundMovies] = useState([]);
  const [rows, setRows] = useState((columns > 3) ? 3 : (6 - columns));

  // const [isPreparingMovies, setPreparingMoviesState] = useState(false);
  const increaseRows = () => {
    setRows(() => rows + 1);
  };
  useEffect(() => {
    if ('all-search' in localStorage) {
      setSearch(localStorage.getItem('all-search'));
    }
    if ('all-short' in localStorage) {
      setShort(localStorage.getItem('all-short') === 'true');
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('all-search', search);
  }, [search]);

  useEffect(() => {
    localStorage.setItem('all-short', String(isShort));
  }, [isShort]);

  function triggerShortFilms() {
    setShort(() => !isShort);
  }

  function handleSearchSubmit(term) {
    setSearch(term);
  }

  useEffect(() => {
    if (search.length > 0 || isShort) {
      setFoundMovies(searchMovies(allMovies, search, isShort));
    }
  }, [search, isShort, allMovies]);

  return (
    <main className='movies-list'>
      <SearchBar
        term={search}
        isFiltering={isShort}
        onSearchSubmit={handleSearchSubmit}
        onClickRadio={triggerShortFilms} />

      {isError ? <p className='movies-list__error'>{errorMessage}</p>
        : (
          <MoviesList
            component={Movie}
            movies={foundMovies.slice(0, (columns * rows - 1))}
            favourities={favourities}
            columns={columns}
            onMovieLike={onMovieLike}
            onMovieDislike={onMovieDislike}
            isLoading={isLoading} />
        ) }
      {<MoreButton onClick={increaseRows} />
       && ((foundMovies.length >= columns * rows) && !isLoading && !isError)}

    </main>
  );
}

MoviesPage.propTypes = {
  allMovies: PropTypes.arrayOf(PropTypes.object).isRequired,
  favourities: PropTypes.arrayOf(PropTypes.number).isRequired,
  columns: PropTypes.number.isRequired,
  onMovieLike: PropTypes.func.isRequired,
  onMovieDislike: PropTypes.func.isRequired,
  isLoading: PropTypes.bool,
  isError: PropTypes.bool,
  errorMessage: PropTypes.string,
};

MoviesPage.defaultProps = {
  isLoading: false,
  isError: false,
  errorMessage: '',
};

export default MoviesPage;
