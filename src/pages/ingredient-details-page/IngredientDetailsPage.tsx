import React, { FC } from 'react';
import { IngredientDetails } from '../../components';
import styles from './IngredientDetailsPage.module.css';

const IngredientDetailsPage: FC = () => {
  return (
    <div className={styles.page}>
      <h1 className="text text_type_main-large">Детали ингредиента</h1>
      <IngredientDetails />
    </div>
  );
};

export default React.memo(IngredientDetailsPage);