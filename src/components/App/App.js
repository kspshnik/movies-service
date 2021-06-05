import React, { useState, useEffect } from 'react';
import {
  Switch, Route, useHistory,
} from 'react-router-dom';
import './App.css';

import Header from '../Header/Header';
import HamburgerMenu from '../HamburgerMenu/HamburgerMenu';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import MoviesPage from '../MoviesPage/MoviesPage';
import FavouriteMoviesPage from '../MoviesPage/FavouriteMoviesPage';
import ProfilePage from '../ProfilePage/ProfilePage';
import SignUpPage from '../SignupPage/SignUpPage';
import SignInPage from '../SigninPage/SignIn';
import Footer from '../Footer/Footer';
// import ErrorBoundary from '../ErrorBoundary/ErrorBoundary';
import LandingPage from '../LandingPage/LandingPage';
import NotFoundPage from '../NotFoundPage/NotFoundPage';

import {
  reduceMovieToFavs, reduceMoviesToFront, reduceFavsToMap, reduceFavsToFront,
} from '../../helpers/movieReducers';
import moviesAPI from '../../helpers/api';
import prepareError from '../../helpers/prepareError';
import ErrorPopup from '../ErrorPopup/ErrorPopup';

import currentUserContext from '../../contexts/currentUserContext';

function App() {
  const history = useHistory();
  const getMoviesCount = () => {
    const rootElement = document.documentElement;
    return parseInt(getComputedStyle(rootElement).getPropertyValue('--movies_count'), 10);
  };
  const [columnsCount, setColumnsCount] = useState(getMoviesCount());
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [isHamburgerOpen, setHamburgerVisibility] = useState(false);
  const [isErrorTooltipOpen, setErrorTooltipVisibility] = useState(false);
  const [errorObject, setErrorState] = useState({ name: '', message: '' });
  const [beatErrorObject, setBeatErrorState] = useState({ error: '', errorMessage: '' });
  const [favsErrorObject, setFavsErrorState] = useState({ error: '', errorMessage: '' });
  const [currentUser, setCurrentUser] = useState({ name: '', email: '' });
  const [allMovies, setAllMovies] = useState([]);
  const [favMovies, setFavMovies] = useState([]);
  const [favMap, setFavMap] = useState({ });

  const [isReloadRequested, setReloadState] = useState(false);
  const [isBeatFilmsLoadingError, setBeatFilmsErrorState] = useState(false);
  const [isFavMoviesLoadingError, setFavMoviesErrorState] = useState(false);
  const [isBeatFilmsLoading, setBeatFilmsLoadingState] = useState(false);

  const makeErrorObject = (error) => {
    const { name, message } = error;
    return { name, message };
  };

  async function handleSignIn(email, password) {
    try {
      const signinPromise = await moviesAPI.signIn(email, password);
      const signedInUser = await signinPromise;
      if (!signedInUser.token) {
        if (signedInUser.message) {
          throw prepareError('Ошибка получения данных с сервера', signedInUser.message);
        } else {
          throw prepareError(
            'Ошибка получения данных с сервера',
            'Неизвестная ошибка',
          );
        }
      }
      moviesAPI.jwt = signedInUser.token;
      localStorage.setItem('movies-jwt', signedInUser.token);
      const profilePromise = await moviesAPI.getProfile();
      const profile = await profilePromise;
      if (!(profile.name && profile.email)) {
        if (profile.message) {
          throw prepareError('Ошибка получения данных с сервера', profile.message);
        } else {
          throw prepareError(
            'Ошибка получения данных с сервера',
            'Неизвестная ошибка',
          );
        }
      }
      setCurrentUser(profile);
      setLoggedIn(true);
      history.push('/films');
    } catch (error) {
      setErrorState(makeErrorObject(error));
      setErrorTooltipVisibility(true);
    }
  }

  async function handleSignUp(name, email, password) {
    try {
      const signupPromise = moviesAPI.signUp(name, email, password);
      const user = await signupPromise;
      if (!(user.name && user.email && user.id)) {
        if (user.message) {
          throw prepareError('Ошибка получения данных с сервера', user.message);
        } else {
          throw prepareError(
            'Ошибка получения данных с сервера',
            'Неизвестная ошибка',
          );
        }
      }
    } catch (error) {
      setErrorState(makeErrorObject(error));
      setErrorTooltipVisibility(true);
    }
    handleSignIn(email, password);
  }

  async function handleUpdateProfile(name, email) {
    try {
      const profilePromise = await moviesAPI.setProfile(name, email);
      const profile = await profilePromise;
      if (!(profile.name && profile.email)) {
        if (profile.message) {
          throw prepareError('Ошибка получения данных с сервера', profile.message);
        } else {
          throw prepareError(
            'Ошибка получения данных с сервера',
            'Неизвестная ошибка',
          );
        }
      }
      setCurrentUser({ name: profile.name, email: profile.email });
    } catch (error) {
      setErrorState(makeErrorObject(error));
      setErrorTooltipVisibility(true);
    }
  }

  async function handleSetFavourite(movie) {
    try {
      const favPromise = await moviesAPI.setFavouriteMovie(movie);
      const favMovie = await favPromise;
      if (!favMovie.nameRU) {
        if (favMovie.message) {
          throw prepareError('Ошибка получения данных с сервера', favMovie.message);
        } else {
          throw prepareError(
            'Ошибка получения данных с сервера',
            'Неизвестная ошибка',
          );
        }
      }
      const itemDict = {};
      itemDict[favMovie.movieId] = favMovie.id;
      favMovie._id = favMovie.id;
      favMovie.id = favMovie.movieId;
      delete favMovie.movieId;
      setFavMap(() => ({ ...favMap, ...itemDict }));
      setFavMovies(() => ([
        ...favMovies,
        favMovie,
      ]));
    } catch (error) {
      setErrorState(makeErrorObject(error));
      setErrorTooltipVisibility(true);
    }
  }

  async function handleDeleteFavourite(id) {
    try {
      const delPromise = await moviesAPI.deleteFavouriteMovie(id);
      const msg = await delPromise;
      if ((!msg.message) || (!msg.message.includes('успешно'))) {
        if (msg.message) {
          throw prepareError('Ошибка получения данных с сервера', msg.message);
        } else {
          throw prepareError(
            'Ошибка получения данных с сервера',
            'Неизвестная ошибка',
          );
        }
      }
      const tempFavs = favMovies.filter((item) => item._id !== id);
      setFavMovies(tempFavs);
      setFavMap(Object.fromEntries(Object.entries(favMap).filter((item) => item[1] !== id)));
    } catch (error) {
      setErrorState(makeErrorObject(error));
      setErrorTooltipVisibility(true);
    }
  }

  function handleSignOut() {
    localStorage.removeItem('jwt-movies');
    setLoggedIn(false);
    setCurrentUser({ name: '', email: '' });
    history.push('/');
  }
  function handleOpenHamburger() {
    setHamburgerVisibility(true);
  }
  function handleCloseHamburger() {
    setHamburgerVisibility(false);
  }
  function handleErrorTooltipClose() { setErrorTooltipVisibility(false); }

  function handleMovieLike(id) {
    const movie = reduceMovieToFavs(allMovies.filter((film) => film.id === id)[0]);
    handleSetFavourite(movie);
  }

  function handleMovieDislike(id) {
    handleDeleteFavourite(favMap[id]);
  }

  function handleBeatMoviesRefresh() {
    setReloadState(true);
  }

  useEffect(() => {
    const setColumns = () => {
      setColumnsCount(getMoviesCount());
    };
    window.addEventListener('resize', setColumns);
    return () => window.removeEventListener('resize', setColumns);
  }, []);

  useEffect(() => {
    async function checkCredentials() {
      try {
        const profilePromise = await moviesAPI.getProfile();
        const profile = await profilePromise;
        if (!(profile.name && profile.email)) {
          if (profile.message) {
            throw prepareError('Ошибка получения данных с сервера', profile.message);
          } else {
            throw prepareError(
              'Ошибка получения данных с сервера',
              'Неизвестная ошибка',
            );
          }
        }
        setCurrentUser(profile);
        setLoggedIn(true);
      } catch (error) {
        setErrorState(makeErrorObject(error));
        setErrorTooltipVisibility(true);
      }
    }
    if ('movies-jwt' in localStorage) {
      moviesAPI.jwt = localStorage.getItem('movies-jwt');
      checkCredentials();
    }
  },
  []);

  useEffect(() => {
    async function getAllMovies() {
      setBeatFilmsLoadingState(true);
      setBeatFilmsErrorState(false);
      try {
        const beatPromise = moviesAPI.getBeatFilms();
        const films = await beatPromise;
        setAllMovies(films);
      } catch (error) {
        setBeatErrorState(makeErrorObject(error));
        setBeatFilmsErrorState(true);
      } finally {
        setBeatFilmsLoadingState(false);
        setReloadState(false);
      }
    }
    if (isReloadRequested) {
      getAllMovies();
    }
  }, [isReloadRequested]);

  useEffect(() => {
    async function getFavMovies() {
      try {
        const favsPromise = moviesAPI.getFavouriteMovies();
        const films = await favsPromise;
        setFavMovies(reduceFavsToFront(films));
        setFavMap(reduceFavsToMap(films));
      } catch (error) {
        setFavsErrorState(makeErrorObject(error));
        setFavMoviesErrorState(true);
      }
    }
    if (isLoggedIn) {
      getFavMovies();
      history.push('/films');
    } else {
      setFavMap([]);
    }
  }, [isLoggedIn, history]);

  return (
    <div className='page typo'>
      <Header
        isLoggedIn={isLoggedIn}
        isHamburger={columnsCount < 4}
        onHamburgerOpen={handleOpenHamburger} />
      <currentUserContext.Provider value={currentUser}>
        <Switch>
          <ProtectedRoute
            component={MoviesPage}
            path='/films'
            isLoggedIn={isLoggedIn}
            allMovies={reduceMoviesToFront(allMovies)}
            favourities={Object.keys(favMap)}
            columns={columnsCount}
            onMovieDislike={handleMovieDislike}
            onMovieLike={handleMovieLike}
            isLoading={isBeatFilmsLoading}
            isError={isBeatFilmsLoadingError}
            errorMessaget={`${beatErrorObject.error} \n${beatErrorObject.errorMessage}`}
            onRefreshRequest={handleBeatMoviesRefresh} />
          <ProtectedRoute
            component={FavouriteMoviesPage}
            path='/saved-films'
            isLoggedIn={isLoggedIn}
            favouriteMovies={favMovies}
            columns={columnsCount}
            onMovieDislike={handleMovieDislike}
            onMovieLike={handleMovieLike}
            isLoadingError={isFavMoviesLoadingError}
            errorObject={favsErrorObject} />
          <ProtectedRoute
            component={ProfilePage}
            path='/profile'
            isLoggedIn={isLoggedIn}
            onSubmitProfile={handleUpdateProfile}
            onSignOut={handleSignOut} />
          <Route path='/signup'>
            <SignUpPage
              onSignUpSubmit={handleSignUp} />
          </Route>
          <Route path='/signin'>
            <SignInPage
              onSignInSubmit={handleSignIn} />
          </Route>
          <Route exact path='/'>
            <LandingPage />
          </Route>
          <Route path='*'>
            <NotFoundPage />
          </Route>
        </Switch>
      </currentUserContext.Provider>
      <Footer />
      <HamburgerMenu
        isHamburgerOpen={isHamburgerOpen}
        onHamburgerOpen={handleOpenHamburger}
        onHamburgerClose={handleCloseHamburger} />
      <ErrorPopup
        onErrorClose={handleErrorTooltipClose}
        isOpen={isErrorTooltipOpen}
        errorObject={errorObject} />
    </div>
  );
}

export default App;
