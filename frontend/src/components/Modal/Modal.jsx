import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import Icon from '../Icon/Icon';
import css from './Modal.module.css';

const modalRoot = document.getElementById('modal-root');

const Modal = ({ children, onClose }) => {
  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === 'Escape') onClose();
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [onClose]);

  return createPortal(
    <div className={css.backdrop} onClick={onClose} role="presentation">
      <div
        className={css.dialog}
        role="dialog"
        aria-modal="true"
        onClick={(event) => event.stopPropagation()}
      >
        <button className={css.close} type="button" aria-label="Close modal" onClick={onClose}>
          <Icon name="icon-close" size={24} />
        </button>
        {children}
      </div>
    </div>,
    modalRoot,
  );
};

export default Modal;
