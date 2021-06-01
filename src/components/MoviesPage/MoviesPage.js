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
      <MoviesList
        component={Movie}
        movies={foundMovies.slice(0, (columns * rows - 1))}
        favourities={favourities}
        columns={columns}
        onMovieLike={onMovieLike}
        onMovieDislike={onMovieDislike} />
      {<MoreButton onClick={increaseRows} /> && (foundMovies.length >= columns * rows) }

    </main>
  );
}

MoviesPage.propTypes = {
  allMovies: PropTypes.arrayOf(PropTypes.shape({
    country: PropTypes.string,
    year: PropTypes.string,
    duration: PropTypes.number.isRequired,
    director: PropTypes.string,
    description: PropTypes.string.isRequired,
    image: PropTypes.object,
    trailer: PropTypes.string.isRequired,
    thumbnail: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    owner: PropTypes.string,
    nameRU: PropTypes.string.isRequired,
    nameEM: PropTypes.string,
  })).isRequired,
  favourities: PropTypes.array.isRequired,
  columns: PropTypes.number.isRequired,
  onMovieLike: PropTypes.func.isRequired,
  onMovieDislike: PropTypes.func.isRequired,

};

export default MoviesPage;
