import React, { useState, useEffect } from "react";
import { Switch, Route, useHistory } from 'react-router-dom';
import './App.css';

import Header from "../Header/Header";
import HamburgerMenu from "../HamburgerMenu/HamburgerMenu";

function App() {
  const getMoviesCount = () => {
    const rootElement = document.documentElement;
    return parseInt(getComputedStyle(rootElement).getPropertyValue('--movies_count'));
  }
  const [columnsCount, setColumnsCount] = useState(getMoviesCount());
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [isHamburgerOpen, setHamburgerVisibility] = useState(false);

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

  return (
    <div className="page typo">
     <Header isLoggedIn = {isLoggedIn} isHamburger = {columnsCount < 4} onHamburgerOpen={handleOpenHamburger}/>
     <HamburgerMenu isHamburgerOpen={isHamburgerOpen} onHamburgerOpen={handleOpenHamburger} onHamburgerClose={handleCloseHamburger}/>
    </div>
  );
}

export default App;
