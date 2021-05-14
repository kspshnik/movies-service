import React, { useContext } from "react";
import PropTypes from 'prop-types';

import currentUserContext from '../../contexts/currentUserContext';

import './Movie.css';

function MovieLikeButton({isLiked, onLike, onDislike}){
  return (
    <button className={isLiked ? 'movie__like movie__like_active' : 'movie__like'} onClick={isLiked ? onDislike : onLike} type='button'></button>
  )
}

function MovieDeleteButton({onMovieDislike}){
  return (
    <button className='movie__delete' onClick={onMovieDislike} type='button'>+</button>
  )
}

export function Movie({movie, onMovieLike, onMovieDislike}) {
  const {  duration, trailer, thumbnail, nameRU, nameEN, owner, movieId, description } = movie;
 // const { currentUserId } = useContext(currentUserContext);
  const getDuration = (duration) => {
    let mins = parseInt(duration);
    return `${Math.floor(mins / 60)}:${(mins % 60)}`;
  }
  const currentUserId = '84848';
  console.log('Called with following object:');
  console.dir(movie);
  return (
    <li className='movie'>
      <img className='movie__thumbnail' src={thumbnail} alt={description}/>
      <div className='movie__container'>
        <div className='movie__info'>
         <p className='movie__name'>{nameRU}</p>
          <MovieLikeButton isLiked={owner === currentUserId} onLike={onMovieLike} onDislike={onMovieDislike} />
        </div>
        <p className='movie__duration'>{getDuration(duration)}</p>
      </div>
    </li>
  )
}

export function FavMovie({movie, onMovieLike, onMovieDislike}) {
  const {  duration, trailer, thumbnail, nameRU, nameEN, owner, movieId, description } = movie;
  // const { currentUserId } = useContext(currentUserContext);
  const getDuration = (duration) => {
    let mins = parseInt(duration);
    return `${Math.floor(mins / 60)}:${(mins % 60)}`;
  }
  const currentUserId = '84848';
  return (
    <li className='movie'>
      <img className='movie__thumbnail' src={thumbnail} alt={description}/>
      <div className='movie__container'>
        <div className='movie__info'>
          <p className='movie__name'>{nameRU}</p>
          <MovieDeleteButton isLiked={owner === currentUserId} onDislike={onMovieDislike} />
        </div>
        <p className='movie__duration'>{getDuration(duration)}</p>
      </div>
    </li>
  )
}

MovieLikeButton.propTypes = {
  isLiked: PropTypes.bool.isRequired,
  onLike: PropTypes.func.isRequired,
  ondislike: PropTypes.func.isRequired,
}

MovieDeleteButton.propTypes = {
  onMovieDislike: PropTypes.func.isRequired,
}

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
                         }),
  onMovieLike: PropTypes.func.isRequired,
  onMovieDislike: PropTypes.func.isRequired,};

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
                         }),
  onMovieLike: PropTypes.func.isRequired,
  onMovieDislike: PropTypes.func.isRequired,};
