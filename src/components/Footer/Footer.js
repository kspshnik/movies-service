import React from "react";
import { useLocation } from 'react-router-dom';

import './Footer.css';

function Footer() {

  const location = useLocation();

  return (
    <footer className={(location.pathname === '/signup' || location.pathname === '/signin' || location.pathname === '/profile' ) ? 'footer footer_latent' : 'footer'}>
      <h2 className='footer__heading'>
        Учебный проект Яндекс.Практикум х BeatFilm.
      </h2>
      <div className='footer__container'>
      <ul className='footer__links'>
        <li className='footer__item'>
          <a className='footer__link' target='_blank' rel='noreferrer' href='https://praktikum.yandex.ru'>Яндекс.Практикум</a>
        </li>
        <li className='footer__item'>
          <a className='footer__link' target='_blank' rel='noreferrer' href='https://www.github.com'>GitHub</a>
        </li>
        <li className='footer__item'>
          <a className='footer__link' target='_blank' rel='noreferrer' href='https://www.facebook.com'>Facebook</a>
        </li>
      </ul>
      <p className='footer__copyright'>&copy; 2021</p>
      </div>
    </footer>
  )
}

export default Footer;
