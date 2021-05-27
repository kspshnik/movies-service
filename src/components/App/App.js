import React, { useState, useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import './App.css';

import Header from '../Header/Header';
import HamburgerMenu from '../HamburgerMenu/HamburgerMenu';
import MoviesPage from '../MoviesPage/MoviesPage';
import FavouriteMoviesPage from '../MoviesPage/FavouriteMoviesPage';
import ProfilePage from '../ProfilePage/ProfilePage';
import Footer from '../Footer/Footer';
import ErrorBoundary from '../ErrorBoundary/ErrorBoundary';

function App() {
  const getMoviesCount = () => {
    const rootElement = document.documentElement;
    return parseInt(getComputedStyle(rootElement).getPropertyValue('--movies_count'), 10);
  };
  const [columnsCount, setColumnsCount] = useState(getMoviesCount());
  // const [isLoggedIn, setLoggedIn] = useState(false);
  const [isHamburgerOpen, setHamburgerVisibility] = useState(false);
  const isLoggedIn = false;
  console.log(getMoviesCount());
  const falseMovies = [
    {
      nameRU: 'Ложнофильм 1',
      duration: '210',
      description: 'Чего-то описание хорька за хвост кусание',
      trailer: 'https://www.youtube.com/watch?v=Q2TcAbE4Vic',
      thumbnail: 'http://kspshnik.com/pub/img/jurmala_pre.jpg',
      movieId: '244',
      owner: '84848',
    },
    {
      nameRU: 'Ложнофильм 2',
      duration: '210',
      description: 'Чего-то описание хорька за хвост кусание',
      trailer: 'https://www.youtube.com/watch?v=Q2TcAbE4Vic',
      thumbnail: 'http://kspshnik.com/pub/img/jurmala_pre.jpg',
      movieId: '254',
    }];

  useEffect(() => {
    const setColumns = () => {
      setColumnsCount(getMoviesCount());
    };
    window.addEventListener('resize', setColumns);
    return () => window.removeEventListener('resize', setColumns);
  }, []);

  function handleOpenHamburger() {
    setHamburgerVisibility(true);
  }
  function handleCloseHamburger() {
    setHamburgerVisibility(false);
  }
  const stubLogic = () => null;
  return (
    <div className='page typo'>
      <ErrorBoundary>
        <Header
          isLoggedIn={isLoggedIn}
          isHamburger={columnsCount < 4}
          onHamburgerOpen={handleOpenHamburger} />
      </ErrorBoundary>
      <Switch>
        <Route path='/films'>
          <ErrorBoundary>
            <MoviesPage
              moviesFound={falseMovies}
              moviesShown={[]}
              columns={columnsCount}
              isFiltering={false}
              term=''
              onMovieDislike={stubLogic}
              onMovieLike={stubLogic}
              onStopFiltering={stubLogic}
              onStartFiltering={stubLogic}
              onSearchSubmit={stubLogic} />
          </ErrorBoundary>
        </Route>

        <Route path='/saved-films'>
          <ErrorBoundary>
            <FavouriteMoviesPage
              favouriteMovies={falseMovies}
              columns={columnsCount}
              isFiltering={false}
              term=''
              onMovieDislike={stubLogic}
              onMovieLike={stubLogic}
              onStopFiltering={stubLogic}
              onStartFiltering={stubLogic}
              onSearchSubmit={stubLogic} />
          </ErrorBoundary>
        </Route>
        <Route path='/profile'>
          <ErrorBoundary>
            <ProfilePage
              onSubmitProfile={stubLogic}
              onSignOut={stubLogic} />
          </ErrorBoundary>
        </Route>
      </Switch>
      <ErrorBoundary>
        <Footer />
      </ErrorBoundary>
      <HamburgerMenu
        isHamburgerOpen={isHamburgerOpen}
        onHamburgerOpen={handleOpenHamburger}
        onHamburgerClose={handleCloseHamburger} />
    </div>
  );
}

export default App;
