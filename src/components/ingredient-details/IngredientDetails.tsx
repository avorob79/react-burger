import React, { FC } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { IIngredient } from '../../utils/types';
import { selectors } from '../../services';
import styles from './IngredientDetails.module.css';

const IngredientDetails: FC = () => {
  const { id } = useParams();

  const ingredients = useSelector(selectors.ingredients) as Array<IIngredient>;

  const details = ingredients.find(item => item._id === id);

  if (!details) {
    return null;
  }

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