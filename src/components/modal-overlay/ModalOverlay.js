import PropTypes from 'prop-types';
import styles from './ModalOverlay.module.css';

function ModalOverlay(props) {
  return (
    <div className={styles.modalOverlay} onClick={props.onClose} />
  );
}

ModalOverlay.propTypes = {
  onClose: PropTypes.func.isRequired
};

export default ModalOverlay;