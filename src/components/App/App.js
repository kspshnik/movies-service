import React, { useState, useEffect } from "react";
import { Switch, Route, useHistory } from 'react-router-dom';
import './App.css';

import Header from "../Header/Header";
import HamburgerMenu from "../HamburgerMenu/HamburgerMenu";
import MoviesPage from "../MoviesPage/MoviesPage";
import FavouriteMoviesPage from "../MoviesPage/FavouriteMoviesPage";
import Footer from "../Footer/Footer";

function App() {
  const getMoviesCount = () => {
    const rootElement = document.documentElement;
    return parseInt(getComputedStyle(rootElement).getPropertyValue('--movies_count'));
  }
  const [columnsCount, setColumnsCount] = useState(getMoviesCount());
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [isHamburgerOpen, setHamburgerVisibility] = useState(false);

  const falseMovies = [
    {nameRU: 'Ложнофильм 1',
      duration: '210',
      description: 'Чего-то описание хорька за хвост кусание',
      trailer: 'https://www.youtube.com/watch?v=Q2TcAbE4Vic',
      thumbnail: 'http://kspshnik.com/pub/img/jurmala_pre.jpg',
      movieId: '244',
      owner: '84848',
    },
  {nameRU: 'Ложнофильм 2',
    duration: '210',
    description: 'Чего-то описание хорька за хвост кусание',
    trailer: 'https://www.youtube.com/watch?v=Q2TcAbE4Vic',
    thumbnail: 'http://kspshnik.com/pub/img/jurmala_pre.jpg',
    movieId: '254',
  }]

  useEffect(() => {
    const setColumns = () => {
      setColumnsCount(getMoviesCount());
    };
    window.addEventListener('resize', setColumns);
    return () => window.removeEventListener('resize', setColumns);
  },[])

  function handleOpenHamburger() {
    setHamburgerVisibility(true);
  }
  function handleCloseHamburger() {
    setHamburgerVisibility(false);
  }
  function stubLogic() {
    return null;
  }
  return (
    <div className="page typo">
     <Header isLoggedIn = {isLoggedIn} isHamburger = {columnsCount < 4} onHamburgerOpen={handleOpenHamburger}/>
      <Switch>
        <Route path='/films'>
          <MoviesPage  moviesFound={falseMovies}
                       moviesShown={[]}
                       columns={columnsCount}
                       isFiltering={false}
                       term = ''
                       onMovieDislike={stubLogic()}
                       onMovieLike={stubLogic()}
                       onStopFiltering={stubLogic()}
                       onStartFiltering={stubLogic()}
                       onSearchSubmit={stubLogic()}/>
        </Route>
        <Route path='/saved-films'>
          <FavouriteMoviesPage favouriteMovies={falseMovies}
                               isFiltering={false}
                               term = ''
                               onMovieDislike={stubLogic()}
                               onMovieLike={stubLogic()}
                               onStopFiltering={stubLogic()}
                               onStartFiltering={stubLogic()}
                               onSearchSubmit={stubLogic()} />
        </Route>
      </Switch>
     <Footer />
     <HamburgerMenu isHamburgerOpen={isHamburgerOpen} onHamburgerOpen={handleOpenHamburger} onHamburgerClose={handleCloseHamburger}/>
    </div>
  );
}

export default App;
