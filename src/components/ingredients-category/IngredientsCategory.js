import React from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import BurgerIngredient from '../burger-ingredient/BurgerIngredient';
import { ingredientType } from '../../utils/types';
import styles from './IngredientsCategory.module.css';

const IngredientsCategory = React.forwardRef(function IngredientsCategory({ id, title, items }, ref) {
  const counters = useSelector(state => state.burgerIngredients.counters);

  return (
    <React.Fragment>
      <h3 id={id} ref={ref} className={`text text_type_main-medium mt-10 mb-6`}>{title}</h3>
      <div className={`${styles.ingredients} pl-4`}>
        {items.map((item) => (
          <BurgerIngredient key={item._id} counter={counters[item._id]} item={item} />
        ))}
      </div>
    </React.Fragment>
  );
});

IngredientsCategory.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  items: PropTypes.arrayOf(ingredientType.isRequired).isRequired
};

export default React.memo(IngredientsCategory);