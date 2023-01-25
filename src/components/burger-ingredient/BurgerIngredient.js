import React from 'react';
import { useDispatch } from 'react-redux';
import { useDrag } from 'react-dnd';
import PropTypes from 'prop-types';
import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { setIngredientDetails } from '../../services/actions/ingredientDetails';
import { ingredientType } from '../../utils/types';
import styles from './BurgerIngredient.module.css';

function BurgerIngredient({counter, item, extraClass}) {
  const dispatch = useDispatch();

  const [, ref] = useDrag({
    type: item.type === "bun" ? "bun" : "ingredient",
    item: { ...item }
  });

  const showDetails = (e) => {
    dispatch(setIngredientDetails(item));
    e.stopPropagation();
  };

  return (
    <div ref={ref} onClick={showDetails} className={`${styles.ingredient} ${extraClass}`}>
      {!!counter &&
        <Counter count={counter} size="default" />
      }
      <img src={item.image} alt={item.name} className={`${styles.image} ml-4 mr-4 mb-1`} />
      <p className={`text text_type_digits-default ${styles.price}`}>{item.price}</p>
      <div className={styles.currency}>
        <CurrencyIcon type="primary" />
      </div>
      <p className={`text text_type_main-default ${styles.name} mt-1`}>{item.name}</p>
    </div>
  );
};

BurgerIngredient.propTypes = {
  counter: PropTypes.number,
  item: ingredientType.isRequired,
  extraClass: PropTypes.string
};

export default React.memo(BurgerIngredient);