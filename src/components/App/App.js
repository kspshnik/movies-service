import React, { useState, useEffect } from "react";
import { Switch, Route, useHistory } from 'react-router-dom';
import './App.css';

function App() {
  const getMoviesCount = () => {
    const rootElement = document.documentElement;
    return parseInt(getComputedStyle(rootElement).getPropertyValue('--movies_count'));
  }
  const [columnsCount, setColumnsCount] = useState(getMoviesCount());

  useEffect(() => {
    const setColumns = () => {
      setColumnsCount(getMoviesCount());
    };
    window.addEventListener('resize', setColumns);
    return () => window.removeEventListener('resize', setColumns);
  },[])
  return (
    <div className="page typo">
     <Header isLoggedIn = {isLoggedIn} />
      <Switch>
        <Route path='/signin'>
         <SignInPage />
        </Route>
        <Route path='/signup'>
      <SignUpPage />
      </Route>
      <Route path='/profile'>
        <ProfilePage />
      </Route>
      <Route path='/movies'>
       <MoviesPage />
      </Route>
      <Route path='saved-movies'>
        <FavoritesPage />
      </Route>
      <Route exact path='/'>
      <LandingPage />
      </Route>
    </Switch>
  //    <Footer />
    </div>
  );
}

export default App;
