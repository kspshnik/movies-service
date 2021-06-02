import React from 'react';
import PropTypes from 'prop-types';
import { useLocation, Link } from 'react-router-dom';

import './Header.css';

import { ReactComponent as Logo } from '../../images/Logo.svg';
import { ReactComponent as HamburgerIcon } from '../../images/HamburgerIcon.svg';

function HeaderMenu({ isHamburger, onHamburgerOpen }) {
  if (isHamburger) {
    return (
      <HamburgerIcon className='header__icon' onClick={onHamburgerOpen} />
    );
  }

  return (
    <ul className='header__menu'>
      <li className='header__item'>
        <Link className='header__link_films' to='/films'>
          Фильмы
        </Link>
      </li>
      <li className='header__item'>
        <Link className='header__link_favorites' to='/saved-films'>
          Сохраненные фильмы
        </Link>
      </li>
      <li className='header__item'>
        <Link to='/profile'>
          <div className='header__account'>
            <p className='header__link_account'>Аккаунт</p>
            <div className='header__link_account-icon' />
          </div>
        </Link>

      </li>
    </ul>
  );
}

const HeaderLoginMenu = () => (
  <ul className='header__menu'>
    <li className='header__login-item'>
      <Link className='header__signup-link' to='/signup'>
        Регистрация
      </Link>
    </li>
    <li className='header__login-item'>
      <Link className='header__signin-link' to='/signin'>
        Войти
      </Link>
    </li>
  </ul>
);

function Header({ isLoggedIn, isHamburger, onHamburgerOpen }) {
  const location = useLocation();
  if (location.pathname === '/'
      || location.pathname === '/films'
      || location.pathname === '/saved-films'
      || location.pathname === '/profile') {
    return (
      <header className='header'>
        <Link to='/'>
          <Logo />
        </Link>
        { isLoggedIn
          ? <HeaderMenu isHamburger={isHamburger} onHamburgerOpen={onHamburgerOpen} />
          : <HeaderLoginMenu />}
      </header>

    );
  } return '';
}

HeaderMenu.propTypes = {
  isHamburger: PropTypes.bool.isRequired,
  onHamburgerOpen: PropTypes.func.isRequired,
};

Header.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  isHamburger: PropTypes.bool.isRequired,
  onHamburgerOpen: PropTypes.func.isRequired,
};
export default Header;
