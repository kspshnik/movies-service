import React from 'react';
import PropTypes from 'prop-types';
import { ReactComponent as SuccessIcon } from '../../images/Сonfirm-sign.svg';

import './Popup.css';

function SuccessPopup({
  isOpen,
  onSuccessClose,
  message,
}) {
  const openModifier = isOpen ? 'popup_opened' : '';
  React.useEffect(() => {
    function handleEscapeClose(event) {
      if (event.key === 'Escape') {
        onSuccessClose();
      }
    }
    if (isOpen) {
      document.addEventListener('keydown', handleEscapeClose);
    } else {
      document.removeEventListener('keydown', handleEscapeClose);
    }
  }, [isOpen, onSuccessClose]);

  function handleClose() {
    onSuccessClose();
  }
  const handleOverlayClose = (event) => {
    if (event.target === event.currentTarget && isOpen) {
      onSuccessClose();
    }
  };
  return (
    <div
      className={`popup popup_content_tooltip ${openModifier}`}
      onMouseDown={handleOverlayClose}
      aria-hidden='true'>
      <div
        className='popup__container popup__container_content_tooltip'
        aria-label={`Успешное действие: ${message}`}
        role='alert'>
        <SuccessIcon />
        <p className='popup__tooltip'>{`${message}`}</p>
        <button
          type='button'
          className='popup__close popup__close_tooltip'
          onClick={handleClose}
          aria-label='Закрыть сообщение об ошибке' />
      </div>
    </div>
  );
}
SuccessPopup.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onSuccessClose: PropTypes.func.isRequired,
  message: PropTypes.string.isRequired,
};

export default SuccessPopup;
