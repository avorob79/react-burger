import React from 'react';
import { useSelector } from 'react-redux';
import styles from './IngredientDetails.module.css';

function IngredientDetails() {
  const details = useSelector(state => state.ingredientDetails.details);

  return (
    <div className={styles.ingredientDetails}>
      <img src={details.image_large} alt={details.name} className={`${styles.image} ml-5 mr-5`} />
      <p className={`text text_type_main-medium ${styles.name} mt-4`}>{details.name}</p>
      <div className={`${styles.details} mt-8`}>
        <div className={styles.detail}>
          <p className="text text_type_main-default text_color_inactive mt-1">Калории,ккал</p>
          <p className="text text_type_digits-default text_color_inactive mt-1">{details.calories}</p>
        </div>
        <div className={styles.detail}>
          <p className="text text_type_main-default text_color_inactive mt-1">Белки, г</p>
          <p className="text text_type_digits-default text_color_inactive mt-1">{details.proteins}</p>
        </div>
        <div className={styles.detail}>
          <p className="text text_type_main-default text_color_inactive mt-1">Жиры, г</p>
          <p className="text text_type_digits-default text_color_inactive mt-1">{details.fat}</p>
        </div>
        <div className={styles.detail}>
          <p className="text text_type_main-default text_color_inactive mt-1">Углеводы, г</p>
          <p className="text text_type_digits-default text_color_inactive mt-1">{details.carbohydrates}</p>
        </div>
      </div>
    </div>
  );
};

export default React.memo(IngredientDetails);