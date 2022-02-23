import { PropTypes } from 'prop-types';
import React, { useEffect } from 'react';

const Modal = ({ image, onCloseModal }) => {
  useEffect(() => {
    document.addEventListener('keydown', onEscapeClick);
    return () => {
      document.removeEventListener('keydown', onEscapeClick);
    };
  }, []);

  const onEscapeClick = e => {
    if (!e.key === 'Escape') return;

    onCloseModal();
  };

  const onBackdropClick = e => {
    if (e.target !== e.currentTarget) return;

    onCloseModal();
  };

  return (
    <div className="Overlay" onClick={onBackdropClick}>
      <div className="Modal">
        <img src={image} />
      </div>
    </div>
  );
};

Modal.propTypes = {
  image: PropTypes.string.isRequired,
  onCloseModal: PropTypes.func.isRequired,
};
export default Modal;
