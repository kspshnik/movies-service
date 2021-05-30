import * as React from 'react';

import './LandingPage.css';

const LandingPage = () => (
  <main>
    <div className='landing__lead'>
      <h1 className='landing__caption'>Учебный проект студента факультета Веб-разработки.</h1>
    </div>
    <ul className='landing__navmenu'>
      <li className='landing__navitem'>
        <a className='landing__navlink' href='/#about'>О проекте</a>
      </li>
      <li className='landing__navitem'>
        <a className='landing__navlink' href='/#tech'>Технологии</a>
      </li>
      <li className='landing__navitem'>
        <a className='landing__navlink' href='/#student'>Студент</a>
      </li>
    </ul>
    <section id='about' className='landing__section'>
      <h2 className='landing__title'>О проекте</h2>
      <div className='landing__separator' />
      <h3 className='landing__subtitle'>Дипломный проект включал 5 этапов</h3>
      <p className='landing__text'>Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
      <h3 className='landing__subtitle'>На выполнение диплома ушло 5 недель</h3>
      <p className='landing__text'>У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
      <div className='landing__timing'>
        <div className='landing__timeline'>
          <div className='landing__backend landing__backend_timeline'>1 неделя</div>
          <div className='landing__frontend landing__frontend_timeline'>4 недели</div>
        </div>
        <div className='landing__timeline'>
          <div className='landing__backend_cutline'>Back-end</div>
          <div className='landing__frontend_cutline'>Front-end</div>
        </div>
      </div>
    </section>
    <section id='tech' className='landing__section'>
      sd
    </section>
    <section id='studend' className='landing__section'>yjt</section>
  </main>
);
export default LandingPage;
