import React, { FC } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useDrag } from 'react-dnd';
import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { IIngredient } from '../../utils/types';
import styles from './BurgerIngredient.module.css';

interface IProps {
  counter: number;
  item: IIngredient;
}

const BurgerIngredient: FC<IProps> = ({ counter, item }) => {
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

export default React.memo(BurgerIngredient);