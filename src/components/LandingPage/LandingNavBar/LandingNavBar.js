import * as React from 'react';

import './LandingNavBar.css';

const LandingNavBar = () => (
  <ul className='landing__navmenu'>
    <li className='landing__navitem'>
      <a className='landing__navlink' target='_blank' href='/#about'>О проекте</a>
    </li>
    <li className='landing__navitem'>
      <a className='landing__navlink' target='_blank' href='/#tech'>Технологии</a>
    </li>
    <li className='landing__navitem'>
      <a className='landing__navlink' target='_blank' href='/#student'>Студент</a>
    </li>
  </ul>
);

export default LandingNavBar;
