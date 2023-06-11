import React, { useEffect } from "react";
import './Popup.css';

function Popup({
  message, isOpen, onClose
}) {

  useEffect(() => {
    if (!isOpen) return;

    const closeByEscape = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    }

    document.addEventListener('keydown', closeByEscape);

    return () => document.removeEventListener('keydown', closeByEscape);
  }, [isOpen, onClose]);

  const handleOverlay = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  }

  return (
    <section
      className={`popup ${isOpen && 'popup_opened'}`}
      onClick={handleOverlay}
    >
      <div className="popup__container">
        <button type="button" className="popup__close-icon" onClick={onClose}></button>
        <div className="popup__form">
        <h2 className="popup__title">
          Системное сообщение
        </h2>
        <p className="popup__text">{message}</p>
        </div>
      </div>
    </section>
  );
}

export default Popup;
