// const reqHeaders = { 'Content-Type': 'application/json' };
const beatFilmsEndpoint = 'https://api.nomoreparties.co/beatfilm-movies';
const server = {
  base: 'https://api.kspshnik.xyz/movies',
  routes: {
    signup: '/signup',
    signin: '/signin',
  },
};
export async function signUp(name, email, password) {
  const options = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email, password }),
  };
  const endpoint = `${server.base}${server.routes.signup}`;
  const responsePromise = await fetch(endpoint, options);
  const response = await responsePromise;
  return response.json();
}
export async function signIn(email, password) {
  const options = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  };
  const endpoint = `${server.base}${server.routes.signin}`;
  const responsePromise = await fetch(endpoint, options);
  const response = await responsePromise;
  return response.json();
}

export async function getBeatFilms() {
  const filmsPromise = fetch(beatFilmsEndpoint);
  const beatFilms = await filmsPromise;
  return beatFilms.json();
}
