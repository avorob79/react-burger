import React from 'react';
import loading from '../../images/loading.gif';
import styles from './Loader.module.css';

function Loader() {
  return (
    <div className={styles.loader}>
      <img src={loading} alt="Загрузка..." />
    </div>
  );
}

export default React.memo(Loader);