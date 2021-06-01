import React from 'react';
import PropTypes from 'prop-types';

import getMovieDuration from '../../helpers/getMovieDuration';

import './Movie.css';

const MovieLikeButton = ({ isLiked, onLike, onDislike }) => (
  <button className={isLiked ? 'movie__like movie__like_active' : 'movie__like'} onClick={isLiked ? onDislike : onLike} type='button' />
);

const MovieDeleteButton = ({ onMovieDislike }) => (
  <button className='movie__delete' onClick={onMovieDislike} type='button'>+</button>
);

export function Movie({
  movie, isFavourite, onMovieLike, onMovieDislike,
}) {
  const {
    duration, image, nameRU,
  } = movie;

  const thumbnail = `https://api.nomoreparties.co${image.url}`;
  const thumbnailAlt = (image.alternativeText.length > 0)
    ? image.alternativeText.length
    : image.name;
  return (
    <li className='movie'>
      <img className='movie__thumbnail' src={thumbnail} alt={thumbnailAlt} />
      <div className='movie__container'>
        <div className='movie__info'>
          <p className='movie__name'>{nameRU}</p>
          <MovieLikeButton
            isLiked={isFavourite}
            onLike={onMovieLike}
            onDislike={onMovieDislike} />
        </div>
        <p className='movie__duration'>{getMovieDuration(duration)}</p>
      </div>
    </li>
  );
}

export function FavMovie({ movie, onMovieDislike }) {
  const {
    duration, image, nameRU,
  } = movie;

  const thumbnail = `https://api.nomoreparties.co${image.url}`;

  return (
    <li className='movie'>
      <img className='movie__thumbnail' src={thumbnail} alt={nameRU} />
      <div className='movie__container'>
        <div className='movie__info'>
          <p className='movie__name'>{nameRU}</p>
          <MovieDeleteButton isLiked onMovieDislike={onMovieDislike} />
        </div>
        <p className='movie__duration'>{getMovieDuration(duration)}</p>
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
  isFavourite: PropTypes.bool.isRequired,
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
