const getMovieDuration = (movieDuration) => {
  const mins = parseInt(movieDuration, 10);
  return `${Math.floor(mins / 60)}:${(mins % 60)}`;
};

export default getMovieDuration;
