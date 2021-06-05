import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

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
  const [foundMovies, setFoundMovies] = useState([]);
  const [search, setSearch] = useState('');
  const [isShort, setShort] = useState(false);
  const [isJustMounted, setJustMounted] = useState(false);

  useEffect(() => {
    setJustMounted(true);
  }, []);

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
    const processSearch = () => {
      if (search.length > 0) {
        const newfound = favouriteMovies.filter((film) => reduceSearch(film, search, isShort));
        setFoundMovies(newfound);
      } else if (isShort) {
        const allShort = favouriteMovies.filter((movie) => movie.duration < 41);
        setFoundMovies(allShort);
      } else {
        setFoundMovies(favouriteMovies);
      }
    };
    if (search.length > 0 || isShort) {
      processSearch();
    } else if (isJustMounted) {
      processSearch();
      setJustMounted(false);
    }
  }, [isShort, search, favouriteMovies, isJustMounted]);

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
