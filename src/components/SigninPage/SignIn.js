import React, {
  useState, useEffect,
} from 'react';
import { Link } from 'react-router-dom';

import PropTypes from 'prop-types';

import { ReactComponent as Logo } from '../../images/Logo.svg';

function SignInPage({ onSignInSubmit }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isEmailValid, setEmailValidity] = useState(true);
  const [isPasswordValid, setPasswordValidity] = useState(true);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [isFormValid, setFormValidityState] = useState(false);

  const [isSigninInProgress, setSigninState] = useState(false);

  useEffect(() => {
    setEmail('');
    setPassword('');
  }, []);

  useEffect(() => {
    setFormValidityState(isEmailValid
    && isPasswordValid
    && email.length > 0
    && password.length > 0);
  }, [isEmailValid, isPasswordValid, email, password]);

  function handleEmailChange(event) {
    const input = event.target;
    setEmail(input.value);
    setEmailValidity(input.validity.valid);
    if (!input.validity.valid) {
      setEmailError(input.validationMessage);
    } else {
      setEmailError(input.validationMessage);
    }
  }

  function handlePasswordChange(event) {
    const input = event.target;
    setPassword(input.value);
    setPasswordValidity(input.validity.valid);
    if (!input.validity.valid) {
      setPasswordError(input.validationMessage);
    } else {
      setPasswordError(input.validationMessage);
    }
  }

  /**
   * @param event
   */
  function handleSubmit(event) {
    event.preventDefault();
    setSigninState(true);
    onSignInSubmit(email, password, setSigninState);
  }

  return (
    <>
      <header className='credentials__lead'>
        <Link to='/'>
          <Logo className='credentials__logo' />
        </Link>
        <h2 className='credentials__heading'>Рады видеть!</h2>
      </header>
      <main className='credentials' aria-hidden='true'>
        <form
          name='SignInForm'
          className='credentials__form'
          aria-label='Форма входа в систему'>
          <fieldset className='credentials__inputs'>
            <p className='credentials__label'>E-mail</p>
            <input
              id='signin-email-input'
              name='email'
              type='email'
              className={`credentials__input ${(!isEmailValid) ? 'credentials__input_invalid' : ''}`}
              required
              minLength='2'
              maxLength='200'
              value={email}
              onChange={handleEmailChange}
              placeholder='E-mail'
              aria-label='Поле ввода адреса электронной почты'
              autoComplete='email'
              disabled={isSigninInProgress} />
            <span
              id='signin-email-input-error'
              className='credentials__error-message'>
              {emailError}
            </span>
            <p className='credentials__label'>Пароль</p>
            <input
              id='signin-password-input'
              name='password'
              type='password'
              className={`credentials__input ${(!isPasswordValid) ? 'credentials__input_invalid' : ''}`}
              required
              minLength='2'
              maxLength='200'
              value={password}
              onChange={handlePasswordChange}
              placeholder='Пароль'
              aria-label='Поле ввода пароля'
              autoComplete='current-password'
              disabled={isSigninInProgress} />
            <span
              id='signin-password-input-error'
              className='credentials__error-message'>
              {passwordError}
            </span>
          </fieldset>
          <div className='credentials__buttons'>
            <button
              type='submit'
              className='credentials__submit'
              onClick={handleSubmit}
              disabled={!isFormValid || isSigninInProgress}
              aria-label='Кнопка входа'>
              Войти
            </button>
            <div className='credentials__linkarea'>
              <span className='credentials__question'>Ещё не зарегистрированы? &nbsp;</span>
              <Link to='/signup' className='credentials__link'>Регистрация</Link>
            </div>
          </div>
        </form>
      </main>
    </>
  );
}
SignInPage.propTypes = {
  onSignInSubmit: PropTypes.func.isRequired,

};
export default SignInPage;
