import React from 'react';
import { useSelector } from 'react-redux';
import { BurgerIngredient } from '../';
import { IIngredient } from '../../utils/types';
import { selectors } from '../../services';
import styles from './IngredientsCategory.module.css';

interface IProps {
  id: string;
  title: string;
  items: IIngredient[];
}

const IngredientsCategory = React.forwardRef<HTMLHeadingElement, IProps>(({ id, title, items }, ref) => {
  const counters = useSelector(selectors.counters);

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

export default React.memo(IngredientsCategory);