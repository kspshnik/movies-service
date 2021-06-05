import { SHORTMOVIE_LIMIT } from '../movies-service.config';

const reduceUndefined = (movie) => {
  const importantStringKeys = ['country', 'director', 'description', 'year', 'nameRU', 'nameEN', 'trailerLink'];
  const film = movie;

  importantStringKeys.forEach((key) => {
    if (!(key in film)) {
      film[key] = '';
    }
  });
  if (!film.duration) {
    film.duration = 0;
  }
  if (!film.id) {
    film.id = -1;
  }
  return film;
};
export const reduceMovieToFavs = (movie) => {
  const mov = reduceUndefined(movie);
  const {
    country,
    description,
    director,
    duration,
    year,
    nameRU,
    nameEN,
  } = mov;
  const film = {
    country,
    description,
    director,
    duration,
    year,
    nameRU,
    nameEN,
    trailer: movie.trailerLink,
    movieId: movie.id,
    thumbnail: `https://api.nomoreparties.co${movie.image.url}`,
    image: `https://api.nomoreparties.co${movie.image.url}`,
  };
  Object.keys(film).forEach((key) => {
    if (!film[key]) {
      film[key] = 'Не определено';
    }
  });
  return film;
};

export const reduceMoviesToFront = (movies) => movies.map((film) => {
  const movie = film;
  const {
    nameRU, description, director, duration, year, id, trailerLink,
  } = reduceUndefined(movie);
  if (!movie.image) {
    movie.image = {};
    movie.image.url = '';
    movie.image.name = nameRU;
    movie.image.alternativeText = '';
  }
  const { image } = movie;
  return {
    nameRU, description, director, duration, year, id, trailerLink, image,
  };
});
export const reduceFavsToFront = (favs) => favs.map((fav) => {
  const {
    country,
    description,
    director,
    duration,
    year,
    nameRU,
    nameEN,
    trailer,
    movieId,
    thumbnail,
    _id,
  } = fav;
  const film = {
    country,
    description,
    director,
    duration,
    year,
    nameRU,
    nameEN,
    _id,
    trailerLink: trailer,
    id: movieId,
    image: {},
  };
  film.image.url = thumbnail.replace('https://api.nomoreparties.co', '');
  film.image.name = nameRU;
  film.image.alternativeText = nameRU;
  return film;
});

export const reduceFavsToMap = (favs) => {
  const tempMap = {};
  favs.forEach((fav) => {
    tempMap[fav.movieId] = fav._id;
  });
  return tempMap;
};

export const reduceSearch = (movie, term, isShort) => {
  const {
    nameRU, description, duration,
  } = movie;

  return (`${nameRU}  ${description}`
    .replace(',', ' ')
    .replace('.', ' ')
    .replace(':', ' ')
    .replace(';', ' ')
    .replace('-', ' ')
    .split(' ')
    .filter((word) => word.includes(term))
    .length > 0) && (!isShort || (duration < SHORTMOVIE_LIMIT));
};
