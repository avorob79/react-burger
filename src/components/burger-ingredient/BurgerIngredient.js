import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useDrag } from 'react-dnd';
import PropTypes from 'prop-types';
import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { ingredientType } from '../../utils/types';
import styles from './BurgerIngredient.module.css';

function BurgerIngredient({ counter, item, extraClass }) {
  const location = useLocation();

  const [, ref] = useDrag({
    type: item.type === "bun" ? "bun" : "ingredient",
    item: { ...item }
  });

  return (
    <Link ref={ref} to={"/ingredients/" + item._id} state={{ background: location }} className={styles.ingredient}>
      {!!counter &&
        <Counter count={counter} size="default" />
      }
      <img src={item.image} alt={item.name} className={`${styles.image} ml-4 mr-4 mb-1`} />
      <p className={`text text_type_digits-default ${styles.price}`}>{item.price}</p>
      <div className={styles.currency}>
        <CurrencyIcon type="primary" />
      </div>
      <p className={`text text_type_main-default ${styles.name} mt-1`}>{item.name}</p>
    </Link>
  );
};

BurgerIngredient.propTypes = {
  counter: PropTypes.number,
  item: ingredientType.isRequired,
  extraClass: PropTypes.string
};

export default React.memo(BurgerIngredient);