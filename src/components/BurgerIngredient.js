import React from 'react';
import PropTypes from 'prop-types';
import {Counter, CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './BurgerIngredient.module.css';
import {ingredientType} from '../utils/types';

function BurgerIngredient(props) {
  return (
    <div className={`${styles.ingredient} ${props.extraClass}`}>
        {!!props.counter &&
          <Counter count={props.counter} size="default" />
        }
        <img src={props.item.image} alt={props.item.name} className={`${styles.image} ml-4 mr-4 mb-1`} />
        <p className={`text text_type_digits-default ${styles.price}`}>{props.item.price}</p>
        <div className={styles.currency}>
          <CurrencyIcon type="primary" />
        </div>
        <p className={`text text_type_main-default ${styles.name} mt-1`}>{props.item.name}</p>
    </div>
  );
};

BurgerIngredient.propTypes = {
  counter: PropTypes.number,
  item: ingredientType.isRequired,
  extraClass: PropTypes.string
};

export default BurgerIngredient;