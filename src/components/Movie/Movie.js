import React from 'react';
import PropTypes from 'prop-types';

import './Movie.css';

const MovieLikeButton = ({ isLiked, onLike, onDislike }) => (
  <button className={isLiked ? 'movie__like movie__like_active' : 'movie__like'} onClick={isLiked ? onDislike : onLike} type='button' />
);

const MovieDeleteButton = ({ onMovieDislike }) => (
  <button className='movie__delete' onClick={onMovieDislike} type='button'>+</button>
);

export function Movie({ movie, onMovieLike, onMovieDislike }) {
  const {
    duration, thumbnail, nameRU, owner, description,
  } = movie;

  const getDuration = (movieDuration) => {
    const mins = parseInt(movieDuration, 10);
    return `${Math.floor(mins / 60)}:${(mins % 60)}`;
  };
  const currentUserId = '84848';
  console.log('Called with following object:');
  console.dir(movie);
  return (
    <li className='movie'>
      <img className='movie__thumbnail' src={thumbnail} alt={description} />
      <div className='movie__container'>
        <div className='movie__info'>
          <p className='movie__name'>{nameRU}</p>
          <MovieLikeButton
            isLiked={owner === currentUserId}
            onLike={onMovieLike}
            onDislike={onMovieDislike} />
        </div>
        <p className='movie__duration'>{getDuration(duration)}</p>
      </div>
    </li>
  );
}

export function FavMovie({ movie, onMovieDislike }) {
  const {
    duration, thumbnail, nameRU, owner, description,
  } = movie;

  const getDuration = (movieDuration) => {
    const mins = parseInt(movieDuration, 10);
    return `${Math.floor(mins / 60)}:${(mins % 60)}`;
  };
  const currentUserId = '84848';
  return (
    <li className='movie'>
      <img className='movie__thumbnail' src={thumbnail} alt={description} />
      <div className='movie__container'>
        <div className='movie__info'>
          <p className='movie__name'>{nameRU}</p>
          <MovieDeleteButton isLiked={owner === currentUserId} onMovieDislike={onMovieDislike} />
        </div>
        <p className='movie__duration'>{getDuration(duration)}</p>
      </div>
    </li>
  );
}

MovieLikeButton.propTypes = {
  isLiked: PropTypes.bool.isRequired,
  onLike: PropTypes.func.isRequired,
  onDislike: PropTypes.func.isRequired,
};

MovieDeleteButton.propTypes = {
  onMovieDislike: PropTypes.func.isRequired,
};

Movie.propTypes = {
  movie: PropTypes.shape({
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
  }).isRequired,
  onMovieLike: PropTypes.func.isRequired,
  onMovieDislike: PropTypes.func.isRequired,
};

FavMovie.propTypes = {
  movie: PropTypes.shape({
    country: PropTypes.string,
    year: PropTypes.string,
    duration: PropTypes.string.isRequired,
    director: PropTypes.string,
    description: PropTypes.string.isRequired,
    image: PropTypes.string,
    trailer: PropTypes.string.isRequired,
    thumbnail: PropTypes.string.isRequired,
    movieId: PropTypes.string.isRequired,
    owner: PropTypes.string.isRequired,
    nameRU: PropTypes.string.isRequired,
    nameEM: PropTypes.string,
  }).isRequired,
  onMovieDislike: PropTypes.func.isRequired,
};
