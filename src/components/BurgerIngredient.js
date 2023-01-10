import React from 'react';
import PropTypes from 'prop-types';
import {Counter, CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import IngredientDetails from './IngredientDetails';
import Modal from './Modal';
import styles from './BurgerIngredient.module.css';
import {ingredientType} from '../utils/types';

function BurgerIngredient(props) {
  const [isOpen, setIsOpen] = React.useState(false);
  const toggleIsOpen = (e) => {
    setIsOpen(prevState => {
      return !prevState;
    });
    if (!!e) {
      e.stopPropagation();
    }
  };
  return (
    <React.Fragment>
      <div onClick={toggleIsOpen} className={`${styles.ingredient} ${props.extraClass}`}>
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
      {!!isOpen &&
        <Modal title="Детали ингредиента" onClose={toggleIsOpen}>
          <IngredientDetails item={props.item} />
        </Modal>
      }
    </React.Fragment>
  );
};

BurgerIngredient.propTypes = {
  counter: PropTypes.number,
  item: ingredientType.isRequired,
  extraClass: PropTypes.string
};

export default BurgerIngredient;