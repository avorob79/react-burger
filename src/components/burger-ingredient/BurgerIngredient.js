import React from 'react';
import PropTypes from 'prop-types';
import {Counter, CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './BurgerIngredient.module.css';
import {ingredientType} from '../../utils/types';

function BurgerIngredient(props) {
  const {counter, item, extraClass} = props;
  const showDetails = (e) => {
    props.showDetails(item);
    e.stopPropagation();
  };
  return (
    <div onClick={showDetails} className={`${styles.ingredient} ${extraClass}`}>
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

export default BurgerIngredient;