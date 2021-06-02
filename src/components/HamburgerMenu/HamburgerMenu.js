import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import './HamburgerMenu.css';

const HamburgerMenu = ({ isHamburgerOpen, onHamburgerClose }) => (
  <div className={isHamburgerOpen ? 'hamburger hamburger_visible' : 'hamburger'}>
    <ul className='hamburger__menu'>
      <li className='hamburger__item'>
        <Link className='hamburger__link' to='/'>
          Главная
        </Link>
      </li>
      <li className='hamburger__item'>
        <Link className='hamburger__link' to='/films'>
          Фильмы
        </Link>
      </li>
      <li className='hamburger__item'>
        <Link className='hamburger__link' to='/saved-films'>
          Сохраненные фильмы
        </Link>
      </li>
      <li className='hamburger__item'>
        <Link to='/profile'>
          <div className='hamburger__account'>
            <p className='hamburger__link-account'>Аккаунт</p>
            <div className='hamburger__link-account-icon' />
          </div>
        </Link>
      </li>
    </ul>
    <button type='button' className='hamburger__close' onClick={onHamburgerClose}>+</button>
  </div>
);

HamburgerMenu.propTypes = {
  isHamburgerOpen: PropTypes.bool.isRequired,
  onHamburgerClose: PropTypes.func.isRequired,
};

export default HamburgerMenu;
