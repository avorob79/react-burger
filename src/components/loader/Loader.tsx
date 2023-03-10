import React, { FC } from 'react';
import loading from '../../images/loading.gif';
import styles from './Loader.module.css';

const Loader: FC = () => {
  return (
    <div className={styles.loader}>
      <img src={loading} alt="Загрузка..." />
    </div>
  );
};

export default React.memo(Loader);