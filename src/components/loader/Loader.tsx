import React, { FC } from 'react';
import loading from '../../images/loading.gif';
import styles from './Loader.module.css';

interface IProps {
  extraClass?: string;
}

const Loader: FC<IProps> = ({ extraClass = "" }) => {
  return (
    <div className={`${styles.loader} ${extraClass}`}>
      <img src={loading} alt="Загрузка..." />
    </div>
  );
};

export default React.memo(Loader);