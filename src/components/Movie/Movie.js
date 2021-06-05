import React from 'react';
import PropTypes from 'prop-types';

import getMovieDuration from '../../helpers/getMovieDuration';

import './Movie.css';

const MovieLikeButton = ({ isLiked, onClick }) => (
  <button
    className={isLiked ? 'movie__like movie__like_active' : 'movie__like'}
    onClick={onClick}
    type='button' />
);

const MovieDeleteButton = ({ onMovieDislike }) => (
  <button className='movie__delete' onClick={onMovieDislike} type='button'>+</button>
);

export function Movie({
  movie, isFavourite, onMovieLike, onMovieDislike,
}) {
  const {
    id, duration, image, nameRU, trailerLink,
  } = movie;

  const thumbnail = `https://api.nomoreparties.co${image.url}`;
  const thumbnailAlt = (image.alternativeText.length > 0)
    ? image.alternativeText
    : image.name;

  function onLikeClick() {
    if (isFavourite) {
      onMovieDislike(id);
    } else {
      onMovieLike(id);
    }
  }

  return (
    <li className='movie'>
      <a target='_blank' href={trailerLink} rel='noreferrer'>
        <img className='movie__thumbnail' src={thumbnail} alt={thumbnailAlt} />
      </a>
      <div className='movie__container'>
        <div className='movie__info'>
          <p className='movie__name'>{nameRU}</p>
          <MovieLikeButton
            isLiked={isFavourite}
            onClick={onLikeClick} />
        </div>
        <p className='movie__duration'>{getMovieDuration(duration)}</p>
      </div>
    </li>
  );
}

export function FavMovie({ movie, onMovieDislike }) {
  const {
    movieId, duration, image, nameRU, trailerLink,
  } = movie;

  const thumbnail = `https://api.nomoreparties.co${image.url}`;
  function handleDislikeClick() {
    onMovieDislike(movieId);
  }
  return (
    <li className='movie'>
      <a target='_blank' href={trailerLink} rel='noreferrer'>
        <img className='movie__thumbnail' src={thumbnail} alt={nameRU} />
      </a>
      <div className='movie__container'>
        <div className='movie__info'>
          <p className='movie__name'>{nameRU}</p>
          <MovieDeleteButton onMovieDislike={handleDislikeClick} />
        </div>
        <p className='movie__duration'>{getMovieDuration(duration)}</p>
      </div>
    </li>
  );
}

MovieLikeButton.propTypes = {
  isLiked: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
};

MovieDeleteButton.propTypes = {
  onMovieDislike: PropTypes.func.isRequired,
};

Movie.propTypes = {
  movie: PropTypes.shape({
    country: PropTypes.string,
    year: PropTypes.string,
    duration: PropTypes.number.isRequired,
    director: PropTypes.string,
    description: PropTypes.string.isRequired,
    image: PropTypes.object,
    trailerLink: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
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
    id: PropTypes.number.isRequired,
    country: PropTypes.string,
    year: PropTypes.string,
    duration: PropTypes.number.isRequired,
    director: PropTypes.string,
    description: PropTypes.string.isRequired,
    image: PropTypes.object.isRequired,
    trailerLink: PropTypes.string.isRequired,
    movieId: PropTypes.string.isRequired,
    owner: PropTypes.string.isRequired,
    nameRU: PropTypes.string.isRequired,
    nameEM: PropTypes.string,
  }).isRequired,
  onMovieDislike: PropTypes.func.isRequired,
};
