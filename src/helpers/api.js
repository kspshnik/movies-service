// const reqHeaders = { 'Content-Type': 'application/json' };
export const beatFilmsEndpoint = 'https://api.nomoreparties.co/beatfilm-movies';

export async function getBeatFilms() {
  const filmsPromise = fetch(beatFilmsEndpoint);
  const beatFilms = await filmsPromise;
  return beatFilms.json();
}
