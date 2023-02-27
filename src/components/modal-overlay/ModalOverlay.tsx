import { FC } from 'react';
import styles from './ModalOverlay.module.css';

interface IProps {
  onClose: () => void;
}

const ModalOverlay: FC<IProps> = ({ onClose }) => {
  return (
    <div className={styles.modalOverlay} onClick={onClose} />
  );
};

export default ModalOverlay;