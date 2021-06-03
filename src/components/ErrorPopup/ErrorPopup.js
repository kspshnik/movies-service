import React from 'react';
import PropTypes from 'prop-types';
import { ReactComponent as ErrorIcon } from '../../images/error-sign.svg';

import './ErrorPopup.css';

/**
 * @param root0
 * @param root0.isOpen
 * @param root0.onErrorClose
 * @param root0.errorObject
 */
function ErrorPopup({
  isOpen,
  onErrorClose,
  errorObject,
}) {
  const { errorName, errorMessage } = errorObject;
  const openModifier = isOpen ? 'popup_opened' : '';
  React.useEffect(() => {
    /**
     * @param event
     */
    function handleEscapeClose(event) {
      if (event.key === 'Escape') {
        onErrorClose();
      }
    }
    if (isOpen) {
      document.addEventListener('keydown', handleEscapeClose);
    } else {
      document.removeEventListener('keydown', handleEscapeClose);
    }
  }, [isOpen, onErrorClose]);

  /**
   * @param event
   */
  function handleClose() {
    onErrorClose();
  }
  const handleOverlayClose = (event) => {
    if (event.target === event.currentTarget && isOpen) {
      onErrorClose();
    }
  };
  return (
    <div
      className={`popup popup_content_tooltip ${openModifier}`}
      onMouseDown={handleOverlayClose}
      aria-hidden='true'>
      <div
        className='popup__container popup__container_content_tooltip'
        aria-label={`Произошла ошибка: ${errorMessage}`}
        role='alert'>
        <ErrorIcon />
        <p className='popup__tooltip'>{`${errorName} : ${errorMessage}`}</p>
        <button
          type='button'
          className='popup__close popup__close_tooltip'
          onClick={handleClose}
          aria-label='Закрыть сообщение об ошибке' />
      </div>
    </div>
  );
}

ErrorPopup.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onErrorClose: PropTypes.func.isRequired,
  errorObject: PropTypes.shape({
    errorName: PropTypes.string.isRequired,
    errorMessage: PropTypes.string.isRequired,
  }).isRequired,
};

export default ErrorPopup;
