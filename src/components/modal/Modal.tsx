import React, { FC } from 'react';
import ReactDOM from 'react-dom';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { ModalOverlay } from '../';
import styles from './Modal.module.css';

interface IProps {
  title: string;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: FC<IProps> = ({ title, onClose, children }) => {
  const modalRoot = document.getElementById("react-modals") as HTMLElement;

  React.useEffect(() => {
    const close = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener('keydown', close);
    return () => window.removeEventListener('keydown', close);
  }, [onClose]);

  return ReactDOM.createPortal(
    <div className={styles.modal}>
      <ModalOverlay onClose={onClose} />
      <div className={`${styles.content} pl-10 pr-10 pt-10 pb-15`}>
        <div className={`${styles.header} pt-3 pb-3`}>
          <h1 className="text text_type_main-large">{title}</h1>
          <div onClick={onClose} className={styles.closeButton}>
            <CloseIcon type="primary" />
          </div>
        </div>
        <div>
          {children}
        </div>
      </div>
    </div>,
    modalRoot
  );
};

export default Modal;