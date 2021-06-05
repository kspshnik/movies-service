import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom';

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
  term,
  isShort,
  onSearchSubmit,
  isLoading,
  isError,
  errorMessage,
}) {
  const [foundMovies, setFoundMovies] = useState([]);
  const [rows, setRows] = useState((columns > 3) ? 3 : (6 - columns));
  const [isMoreShown, setMoreStatus] = useState(rows * columns <= foundMovies.length);
  const [isNotFound, setNotFound] = useState(false);
  const [noRequest, setSearchState] = useState(true);

  const [isPreloaderShown, setPreloaderState] = useState(false);
  const increaseRows = () => {
    setRows(() => rows + 1);
  };

  const location = useLocation();
  useEffect(() => {
    localStorage.setItem('movies-path', location.pathname);
  });

  useEffect(() => setMoreStatus(rows * columns <= foundMovies.length),
    [rows, columns, foundMovies.length]);

  function triggerShortFilms() {
    setSearchState(false);
    onSearchSubmit(term, !isShort, setPreloaderState);
  }

  function handleSearchSubmit(keyword) {
    setSearchState(keyword.length === 0);
    onSearchSubmit(keyword, isShort, setPreloaderState);
  }

  useEffect(() => {
    if ((term.length > 0 || isShort) && allMovies && allMovies.length > 0) {
      setFoundMovies(allMovies.filter((film) => reduceSearch(film, term, isShort)));
    } else {
      setSearchState(true);
      setFoundMovies([]);
    }
  }, [term, isShort, allMovies]);

  useEffect(() => {
    setNotFound(foundMovies.length === 0);
  }, [foundMovies.length]);

  const notFoundMessage = (isNotFound && !noRequest)
    ? `К сожалению, по Вашему запросу "${term}" ${isShort ? 'среди короткометражных фильмов' : ''} ничего не найдено.`
    : '';

  return (
    <main className='movies-list'>
      <SearchBar
        term={term}
        isFiltering={isShort}
        onSearchSubmit={handleSearchSubmit}
        onClickRadio={triggerShortFilms} />

      {(isError || isNotFound)
        ? (
          <p className='movies-list__error'>
            {isError
              ? errorMessage
              : notFoundMessage}
          </p>
        )
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
  term: PropTypes.string.isRequired,
  isShort: PropTypes.bool.isRequired,
  onSearchSubmit: PropTypes.func.isRequired,
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
