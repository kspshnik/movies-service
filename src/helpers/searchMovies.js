const searchMovies = (movies, term, isShort) => movies.filter(({
  nameRU, nameEN, director, description, duration,
}) => (isShort
  ? (`${nameRU} ${nameEN} ${director} ${description}`.includes(term)) && (duration < 41)
  : `${nameRU} ${nameEN} ${director} ${description}`.includes(term)));

export default searchMovies;
