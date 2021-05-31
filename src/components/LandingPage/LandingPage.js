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
      <div className='landing__about'>
        <div className='landing__item'>
          <h3 className='landing__subtitle'>Дипломный проект включал 5 этапов</h3>
          <p className='landing__text'>Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
        </div>
        <div className='landing__item'>
          <h3 className='landing__subtitle'>На выполнение диплома ушло 5 недель</h3>
          <p className='landing__text'>У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
        </div>
      </div>
      <div className='landing__timing'>
        <div className='landing__backend-timeline'>1 неделя</div>
        <div className='landing__frontend-timeline'>4 недели</div>
        <div className='landing__cutline'>Back-end</div>
        <div className='landing__cutline'>Front-end</div>
      </div>
    </section>
    <section id='tech' className='landing__section'>
      <h2 className='landing__title'>Технологии</h2>
      <div className='landing__separator_tech' />
      <h3 className='landing__subtitle_xl'>7 технологий</h3>
      <p className='landing__text landing__text_centered'>На курсе веб-разработки мы освоили технологии, которые применили в дипломном проекте.</p>
      <div className='landing__tiles'>
        <div className='landing__tile'>HTML</div>
        <div className='landing__tile'>CSS</div>
        <div className='landing__tile'>JS</div>
        <div className='landing__tile'>React</div>
        <div className='landing__tile'>Git</div>
        <div className='landing__tile'>Express.js</div>
        <div className='landing__tile'>mongoDB</div>
      </div>
    </section>
    <section id='student' className='landing__section'>
      <h2 className='landing__title'>Студент</h2>
      <div className='landing__separator' />
      <div className='landing__student'>
        <img className='landing__photo' src='https://kspshnik.com/pub/img/ek-avatar.jpg' alt='Евгений Карпель, немного мультяшный :)' />
        <div className='landing__description'>
          <div className='landing__cv'>
            <h3 className='landing__name'>Евгений</h3>
            <p className='landing__text landing__text_padded'>Фронтенд-разработчик, 45 лет</p>
            <p className='landing__text landing__text_padded'>
              Я родился и вырос в Москве, но пять лет назад переехал в Санкт-Петербург.
              Сначала я закончил ВУЗ по специальности &lt;инженер-системотехник&gt;,
              потом получил второе высшее образование в области экономики и с момента
              окончания учёбы работаю по нему. Сейчас планирую вернуть себе квалификацию
              в области информационных технологий. Женат, воспитываю двух сыновей.
              Увлекаюсь музыкой и горными лыжами.
            </p>
          </div>
          <ul className='landing__social'>
            <li className='landing__social-item'>
              <a className='landing__social-link' target='_blank' href='https://www.facebook.com/kspshnik' rel='noreferrer'>Facebook</a>
            </li>
            <li className='landing__social-item'>
              <a className='landing__social-link' target='_blank' href='https://www.github.com/kspshnik' rel='noreferrer'>GitHub</a>
            </li>
          </ul>
        </div>
      </div>
      <div className='landing__portfolio'>
        <h4 className='landing__subtitle_portfolio'>Портфолио</h4>
        <ul className='landing__portfolio-sites'>
          <li className='landing__portfolio-item'>
            <p className='landing__portfolio-sitename'>Статичный сайт</p>
            <a className='landing__portfolio-sitename landing__portfolio-link' target='_blank' href='https://kspshnik.com/how-to-learn' rel='noreferrer'>↗</a>
          </li>
          <li className='landing__portfolio-item'>
            <p className='landing__portfolio-sitename'>Адаптивный сайт</p>
            <a className='landing__portfolio-sitename landing__portfolio-link' target='_blank' href='https://kspshnik.com/russian-travel' rel='noreferrer'>↗</a>
          </li>
          <li className='landing__portfolio-item'>
            <p className='landing__portfolio-sitename'>Одностраничное приложение</p>
            <a className='landing__portfolio-sitename landing__portfolio-link' target='_blank' href='https://mesto.kspshnik.com' rel='noreferrer'>↗</a>
          </li>
        </ul>
      </div>
    </section>
  </main>
);
export default LandingPage;
