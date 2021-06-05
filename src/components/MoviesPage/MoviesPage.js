import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import SearchBar from '../SearchBar/SearchBar';
import MoviesList from '../MoviesList/MoviesList';
import { Movie } from '../Movie/Movie';
import MoreButton from './MoreButton';

import { reduceSearch } from '../../helpers/movieReducers';

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
  onRefreshRequest,
}) {
  const [search, setSearch] = useState('');
  const [isShort, setShort] = useState(false);
  const [foundMovies, setFoundMovies] = useState([]);
  const [rows, setRows] = useState((columns > 3) ? 3 : (6 - columns));
  const [isMoreShown, setMoreStatus] = useState(rows * columns <= foundMovies.length);

  const [isPreloaderShown, setPreloaderState] = useState(false);
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

  useEffect(() => setMoreStatus(rows * columns <= foundMovies.length),
    [rows, columns, foundMovies.length]);

  function triggerShortFilms() {
    if (!isShort) {
      setPreloaderState(true);
      onRefreshRequest();
    }
    if (isShort && search.length < 3) {
      setFoundMovies([]);
    }

    setShort(() => !isShort);
  }

  function handleSearchSubmit(term) {
    if ((term.length > 2) || isShort) {
      setPreloaderState(true);
      onRefreshRequest();
      setSearch(term);
    }
  }

  useEffect(() => {
    const processSearch = () => {
      const newfound = allMovies.filter((film) => reduceSearch(film, search, isShort));
      setFoundMovies(newfound);
    };
    if ((search.length > 0 || isShort) && !isLoading && isPreloaderShown) {
      processSearch();
    }
    setPreloaderState(false);
  }, [isLoading, isShort, allMovies, search, isPreloaderShown]);

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
            movies={foundMovies.slice(0, (columns * rows))}
            favourities={favourities}
            columns={columns}
            onMovieLike={onMovieLike}
            onMovieDislike={onMovieDislike}
            isLoading={isPreloaderShown} />
        ) }
      { (isMoreShown && !isLoading && !isError) ? <MoreButton onClick={increaseRows} /> : '' }

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
  onRefreshRequest: PropTypes.func.isRequired,
};

MoviesPage.defaultProps = {
  isLoading: false,
  isError: false,
  errorMessage: '',
};

export default MoviesPage;
