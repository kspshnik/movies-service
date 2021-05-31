import * as React from 'react';
import { useHistory } from 'react-router-dom';

import './NotFoundPage.css';

function NotFoundPage() {
  const history = useHistory();
  function handleGoBack() {
    history.goBack();
  }
  return (
    <main className='not-found-page'>
      <h1 className='not-found-page__title'>404</h1>
      <p className='not-found-page__text'>Страница не найдена</p>
      <button className='not-found-page__rewind' type='button' onClick={handleGoBack}>Назад</button>
    </main>
  );
}

export default NotFoundPage;
