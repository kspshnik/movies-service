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
    )}
  else {
    return (
       <ul className='header__menu'>
          <li className='header__item'>
            <Link className = 'header__link_films' to='/films'>
              Фильмы
            </Link>
          </li>
          <li className='header__item'>
           <Link className = 'header__link_favorites' to='/saved-films'>
            Сохраненные фильмы
           </Link>
          </li>
          <li className='header__item'>
            <Link to='/profile'>
              <div className='header__account'>
              <p className='header__link_account'>Аккаунт</p>
              <div className="header__link_account-icon"></div>
            </div>
            </Link>

          </li>
        </ul>)
}

}

function HeaderLoginMenu() {
  return (
    <ul className='header__menu'>
      <li className='header__login-item'>
        <Link className='header__signup-link'  to='/signup'>
          Регистрация
        </Link>
      </li>
      <li className='header__login-item'>
        <Link className='header__signin-link'  to='/signin'>
          Войти
        </Link>
      </li>
    </ul>
  )
}

function Header({isLoggedIn, isHamburger, onHamburgerOpen}){
  const location = useLocation();

  return (
    <header className={(location.pathname === '/signup' || location.pathname === '/signin') ? 'header header_latent' : 'header'}>
      <Logo />
      {isLoggedIn ? <HeaderMenu isHamburger={isHamburger} onHamburgerOpen={onHamburgerOpen} /> : <HeaderLoginMenu /> }
    </header>

  )
}

HeaderMenu.propTypes = {
  isHamburger: PropTypes.bool.isRequired,
  onHamburgerOpen: PropTypes.func.isRequired,
}

Header.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  isHamburger: PropTypes.bool.isRequired,
  onHamburgerOpen: PropTypes.func.isRequired,
}
export default Header;
