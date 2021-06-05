import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom';

import SearchBar from '../SearchBar/SearchBar';
import MoviesList from '../MoviesList/MoviesList';
import { FavMovie } from '../Movie/Movie';

import './MoviesPages.css';
import { reduceSearch } from '../../helpers/movieReducers';

const FavouriteMoviesPage = ({
  favouriteMovies,
  onMovieLike,
  onMovieDislike,
  columns,
  isError,
  errorMessage,
}) => {
  const [foundMovies, setFoundMovies] = useState(favouriteMovies);
  const [search, setSearch] = useState('');
  const [isShort, setShort] = useState(false);

  const location = useLocation();
  useEffect(() => {
    localStorage.setItem('movies-path', location.pathname);
  });

  useEffect(() => {
    if ('fav-search' in localStorage) {
      setSearch(localStorage.getItem('fav-search'));
    }
    if ('fav-short' in localStorage) {
      setShort(localStorage.getItem('fav-short') === 'true');
    }
  }, []);

  function triggerShortFilms() {
    const newShort = !isShort;
    setShort(() => newShort);
    localStorage.setItem('fav-short', String(newShort));
  }

  function handleSearchSubmit(term) {
    setSearch(term);
    localStorage.setItem('fav-search', term);
  }

  useEffect(() => {
    if (foundMovies.length > 0) {
      localStorage.setItem('fav-found', JSON.stringify(foundMovies));
    }
  }, [foundMovies]);
  useEffect(() => {
    if ('fav-found' in localStorage) {
      setFoundMovies(JSON.parse(localStorage.getItem('fav-found')));
    }
  }, []);

  useEffect(() => {
    const newfound = favouriteMovies.filter((film) => reduceSearch(film, search, isShort));
    setFoundMovies(newfound);
  }, [isShort, search, favouriteMovies]);

  return (
    <main className='movies-list movies-list_favourites'>
      <SearchBar
        term={search}
        isFiltering={isShort}
        onSearchSubmit={handleSearchSubmit}
        onClickRadio={triggerShortFilms} />
      {isError ? <p className='movies-list__error'>{errorMessage}</p>
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
  isError: PropTypes.bool,
  errorMessage: PropTypes.string,
};
FavouriteMoviesPage.defaultProps = {
  isError: false,
  errorMessage: '',
};
export default FavouriteMoviesPage;
