import React, {
  useState, useEffect,
} from 'react';
import { Link, useLocation } from 'react-router-dom';

import './SignUpPage.css';

import PropTypes from 'prop-types';

import { ReactComponent as Logo } from '../../images/Logo.svg';

// import currentUserContext from '../contexts/currentUserContext';

function SignUpPage({ onSignUpSubmit }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [isNameValid, setNameValidity] = useState(true);
  const [isEmailValid, setEmailValidity] = useState(true);
  const [isPasswordValid, setPasswordValidity] = useState(true);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [nameError, setNameError] = useState('');
  const [isFormValid, setFormValidityState] = useState(false);

  const [isSignupInProgress, setSignupState] = useState(false);

  const isLoggedIn = false;

  const location = useLocation();
  useEffect(() => {
    localStorage.setItem('movies-path', location.pathname);
  });

  useEffect(() => {
    if (isLoggedIn) {
      setEmail('');
      setPassword('');
      setName('');
    }
  }, [isLoggedIn]);

  useEffect(() => {
    setFormValidityState(isEmailValid
    && isPasswordValid
    && isNameValid
    && email.length > 0
    && password.length > 0
    && name.length > 0);
  }, [isEmailValid, isPasswordValid, isNameValid, email, password, name]);

  function handleEmailChange(event) {
    const input = event.target;
    setEmail(input.value);
    setEmailValidity(input.validity.valid);
    if (isEmailValid) {
      setEmailError('');
    } else {
      setEmailError(input.validationMessage);
    }
  }

  function handlePasswordChange(event) {
    const input = event.target;
    setPassword(input.value);
    setPasswordValidity(input.validity.valid);
    if (isPasswordValid) {
      setPasswordError('');
    } else {
      setPasswordError(input.validationMessage);
    }
  }

  function handleNameChange(event) {
    const input = event.target;
    setName(input.value);
    setNameValidity(input.validity.valid);
    if (isNameValid) {
      setEmailError('');
    } else {
      setNameError(input.validationMessage);
    }
  }

  /**
   * @param event
   */
  function handleSubmit(event) {
    event.preventDefault();
    setSignupState(true);
    onSignUpSubmit(name, email, password, setSignupState);
  }

  return (
    <>
      <header className='credentials__lead'>
        <Link to='/'>
          <Logo className='credentials__logo' />
        </Link>
        <h2 className='credentials__heading'>Добро пожаловать!</h2>
      </header>
      <main className='credentials' aria-hidden='true'>
        <form
          name='SignInForm'
          className='credentials__form'
          aria-label='Форма регистрации в системе'>
          <fieldset className='credentials__inputs'>
            <p className='credentials__label'>
              Имя
            </p>
            <input
              id='signup-name-input'
              name='name'
              type='text'
              className={`credentials__input ${!isNameValid ? 'credentials__input_invalid' : ''}`}
              required
              minLength='2'
              maxLength='200'
              value={name}
              onChange={handleNameChange}
              placeholder='Имя'
              aria-label='Поле ввода имени'
              autoComplete='name'
              disabled={isSignupInProgress} />
            <span
              id='signup-name-input-error'
              className='credentials__error-message'>
              {nameError}
            </span>
            <p className='credentials__label'>E-mail</p>
            <input
              id='signup-email-input'
              name='email'
              type='email'
              className={`credentials__input ${!isEmailValid ? 'credentials__input_invalid' : ''}`}
              required
              minLength='2'
              maxLength='200'
              value={email}
              onChange={handleEmailChange}
              placeholder='E-Mail'
              aria-label='Поле ввода адреса электронной почты'
              autoComplete='email'
              disabled={isSignupInProgress} />
            <span
              id='signup-email-input-error'
              className='credentials__error-message'>
              {emailError}
            </span>
            <p className='credentials__label'>Пароль</p>
            <input
              id='signup-confirm-input'
              name='password'
              type='password'
              className={`credentials__input ${!isPasswordValid ? 'credentials__input_invalid' : ''}`}
              required
              minLength='2'
              maxLength='200'
              value={password}
              onChange={handlePasswordChange}
              placeholder='Пароль'
              aria-label='Поле  ввода пароля'
              autoComplete='new-password'
              disabled={isSignupInProgress} />
            <span
              id='signin-confirm-input-error'
              className='credentials__error-message'>
              {passwordError}
            </span>
          </fieldset>
          <div className='credentials__buttons'>
            <button
              type='submit'
              className='credentials__submit'
              onClick={handleSubmit}
              disabled={!isFormValid || isSignupInProgress}
              aria-label='Кнопка регистрации'>
              Зарегистрироваться
            </button>
            <div className='credentials__linkarea'>
              <span className='credentials__question'>Уже зарегистрированы? &nbsp;</span>
              <Link to='/signin' className='credentials__link'>Войти</Link>
            </div>
          </div>
        </form>
      </main>
    </>
  );
}
SignUpPage.propTypes = {
  onSignUpSubmit: PropTypes.func.isRequired,

};
export default SignUpPage;
