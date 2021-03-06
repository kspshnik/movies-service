import { BACKEND_ROUTES } from '../movies-service.config';

class API {
  constructor(server) {
    this._base = server.base;
    this._routes = server.routes;
    this._beatFilms = server.beatFilms;
    this._jwt = '';
  }

  async signUp(name, email, password) {
    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password }),
    };
    const endpoint = `${this._base}${this._routes.signup}`;
    const responsePromise = await fetch(endpoint, options);
    const response = await responsePromise;
    return response.json();
  }

  async signIn(email, password) {
    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    };
    const endpoint = `${this._base}${this._routes.signin}`;
    const responsePromise = await fetch(endpoint, options);
    const response = await responsePromise;
    return response.json();
  }

  async getProfile() {
    const options = {
      method: 'GET',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${this._jwt}` },
    };
    const endpoint = `${this._base}${this._routes.profile}`;
    const responsePromise = await fetch(endpoint, options);
    const response = await responsePromise;
    return response.json();
  }

  async setProfile(name, email) {
    const options = {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${this._jwt}` },
      body: JSON.stringify({ name, email }),
    };
    const endpoint = `${this._base}${this._routes.profile}`;
    const responsePromise = await fetch(endpoint, options);
    const response = await responsePromise;
    return response.json();
  }

  async getFavouriteMovies() {
    const options = {
      method: 'GET',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${this._jwt}` },
    };
    const endpoint = `${this._base}${this._routes.movies}`;
    const responsePromise = await fetch(endpoint, options);
    const response = await responsePromise;
    return response.json();
  }

  async setFavouriteMovie(movie) {
    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${this._jwt}` },
      body: JSON.stringify(movie),
    };
    const endpoint = `${this._base}${this._routes.movies}`;

    const responsePromise = await fetch(endpoint, options);
    const response = await responsePromise;
    return response.json();
  }

  async deleteFavouriteMovie(id) {
    const options = {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${this.jwt}` },
    };
    const endpoint = `${this._base}${this._routes.movies}/${id}`;
    const responsePromise = await fetch(endpoint, options);
    const response = await responsePromise;
    return response.json();
  }

  async getBeatFilms() {
    const options = {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    };
    const filmsPromise = fetch(this._beatFilms, options);
    const beatFilms = await filmsPromise;
    return beatFilms.json();
  }

  get jwt() {
    return this._jwt;
  }

  set jwt(token) {
    this._jwt = token;
  }
}

const moviesAPI = new API(BACKEND_ROUTES);

export default moviesAPI;
