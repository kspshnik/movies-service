import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import SearchBar from '../SearchBar/SearchBar';
import MoviesList from '../MoviesList/MoviesList';
import { FavMovie } from '../Movie/Movie';

import './MoviesPages.css';
import searchMovies from '../../helpers/searchMovies';

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
    if (search.length > 0 || isShort) {
      setFoundMovies(searchMovies(favouriteMovies, search, isShort));
    }
  }, [search, isShort, favouriteMovies]);

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
