import React from 'react';
import PropTypes from 'prop-types';
import {Counter, CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './BurgerIngredient.module.css';

function BurgerIngredient(props) {
  return (
    <div className={`${styles.ingredient} ${props.extraClass}`}>
        {!!props.counter &&
          <Counter count={props.counter} size="default" />
        }
        <img src={props.image} alt={props.name} className="ml-4 mr-4 mb-1" style={{width: 'calc(100% - 32px)'}} />
        <p className={`text text_type_digits-default ${styles.price}`}>{props.price}</p>
        <div className={styles.currency}>
          <CurrencyIcon type="primary" />
        </div>
        <p className={`text text_type_main-default ${styles.name} mt-1`}>{props.name}</p>
    </div>
  );
};

BurgerIngredient.propTypes = {
  counter: PropTypes.number,
  image: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  extraClass: PropTypes.string
};

export default BurgerIngredient;