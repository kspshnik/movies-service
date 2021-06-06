import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom';

import SearchBar from '../SearchBar/SearchBar';
import MoviesList from '../MoviesList/MoviesList';
import { FavMovie } from '../Movie/Movie';

import './MoviesPages.css';
import { reduceSearch } from '../../helpers/movieReducers';
import { EXPIRY_TRESHOLD } from '../../movies-service.config';

const FavouriteMoviesPage = ({
  favouriteMovies,
  onMovieLike,
  onMovieDislike,
  columns,
  term,
  isShort,
  onSearchSubmit,
  isError,
  errorMessage,
}) => {
  const [foundMovies, setFoundMovies] = useState(favouriteMovies);
  const [isNotFound, setNotFound] = useState(false);
  const [noRequest, setSearchState] = useState(true);
  const [isFirstRun, setFirstRun] = useState(true);
  const [isAllFavsShown, setAllFavsState] = useState(false);

  const location = useLocation();
  useEffect(() => {
    localStorage.setItem('movies-path', location.pathname);
  });

  function triggerShortFilms() {
    setSearchState(false);
    onSearchSubmit(term, !isShort);
  }

  function handleSearchSubmit(keyword) {
    setSearchState(keyword.length === 0);
    onSearchSubmit(keyword, isShort);
  }

  useEffect(() => {
    if ((foundMovies.length > 0 || !isFirstRun) && !isAllFavsShown) {
      localStorage.setItem('fav-found', JSON.stringify({ age: Date.now(), data: foundMovies }));
    }
    if (isAllFavsShown) {
      localStorage.setItem('fav-found', JSON.stringify({ age: Date.now(), data: [] }));
    }
  }, [foundMovies, isFirstRun, isAllFavsShown]);

  useEffect(() => {
    if ('fav-found' in localStorage) {
      const moviesData = JSON.parse(localStorage.getItem('fav-found'));
      if ((Date.now() - moviesData.age) < EXPIRY_TRESHOLD) {
        setFoundMovies(moviesData.data);
      } else {
        localStorage.removeItem('fav-found');
        setFoundMovies([]);
      }
    } else {
      setFoundMovies([]);
    }
  }, []);

  useEffect(() => {
    if (((term.length > 0 || isShort) && favouriteMovies && favouriteMovies.length > 0) && (!isFirstRun || !('fav-found' in localStorage))) {
      setFoundMovies(favouriteMovies.filter((film) => reduceSearch(film, term, isShort)));
      setAllFavsState(false);
    } else {
      setSearchState(true);
      setAllFavsState(true);
      setFoundMovies(favouriteMovies);
    }
    setFirstRun(false);
  }, [term, isShort, favouriteMovies, isFirstRun]);

  useEffect(() => {
    setNotFound(foundMovies.length === 0);
  }, [foundMovies.length]);

  const notFoundMessage = (isNotFound && !noRequest)
    ? `К сожалению, по Вашему запросу "${term}" ${isShort ? 'среди короткометражных фильмов' : ''} ничего не найдено.`
    : '';

  return (
    <main className='movies-list movies-list_favourites'>
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
            component={FavMovie}
            movies={foundMovies}
            favourities={[]}
            columns={columns}
            onMovieLike={onMovieLike}
            onMovieDislike={onMovieDislike}
            isFavouritesList />
        )}
    </main>
  );
};

FavouriteMoviesPage.propTypes = {
  favouriteMovies: PropTypes.arrayOf(PropTypes.object).isRequired,
  columns: PropTypes.number.isRequired,
  onMovieLike: PropTypes.func.isRequired,
  onMovieDislike: PropTypes.func.isRequired,
  term: PropTypes.string.isRequired,
  isShort: PropTypes.bool.isRequired,
  onSearchSubmit: PropTypes.func.isRequired,
  isError: PropTypes.bool,
  errorMessage: PropTypes.string,
};
FavouriteMoviesPage.defaultProps = {
  isError: false,
  errorMessage: '',
};
export default FavouriteMoviesPage;
