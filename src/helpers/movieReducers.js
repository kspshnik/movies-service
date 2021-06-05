export const reduceMovieToFavs = (movie) => {
  const {
    country,
    description,
    director,
    duration,
    year,
    nameRU,
    nameEN,
  } = movie;
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
  } = movie;
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
    nameRU, nameEN, director, description, duration,
  } = movie;
  return (isShort
    ? (`${nameRU} ${nameEN} ${director} ${description}`.includes(term)) && (duration < 41)
    : `${nameRU} ${nameEN} ${director} ${description}`.includes(term));
};
