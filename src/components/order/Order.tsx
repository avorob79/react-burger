import React, { FC, useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useSelector } from '../../hooks';
import { dateToString } from '../../utils/date';
import { IOrder } from '../../services/types';
import { selectors } from '../../services';
import styles from './Order.module.css';

interface IProps {
  data: IOrder;
  url: string;
  expanded: boolean;
}

const Order: FC<IProps> = ({ data, url, expanded }) => {
  const location = useLocation();
  const ingredientsDictionary = useSelector(selectors.ingredientsDictionary);
  const price = useMemo(() =>
    data.ingredients.reduce((price, item) => price + ingredientsDictionary[item].price, 0)
    , [data, ingredientsDictionary]);
  const orderDate = useMemo(() => dateToString(new Date(data.createdAt))
    , [data]);

  return (
    <Link to={`/${url}/${data.number}`} state={{ background: location }} className={`${styles.order} p-6`}>
      <div className={`text text_type_digits-default ${styles.number} mb-6`}>
        #{data.number}
        <span className={`text text_type_main-default text_color_inactive`}>{orderDate}</span>
      </div>
      <h2 className="text text_type_main-medium">
        {data.name}
      </h2>
      {expanded &&
        <p className={`text text_type_main-default mt-2 ${data.status === "done" ? styles.doneColor : ""}`}>{data.status === "done" ? "Выполнен" : (data.status === "pending" ? "Готовится" : "Создан")}</p>
      }
      <div className={`${styles.ingredients} mt-6`}>
        <ul className={styles.images}>
          {data.ingredients.filter((item, index, self) => self.indexOf(item) === index).slice(0, 6).map((item, index) => (
            <li key={item} className={styles.image} style={{ zIndex: 7 - index, left: index * 48 }}>
              <img src={ingredientsDictionary[item].image_mobile} alt={ingredientsDictionary[item].name} />
              {index === 5 && data.ingredients.length > 6 && (
                <div className={`${styles.hidden} text text_type_main-default`}>+{data.ingredients.length - 6}</div>
              )}
            </li>
          ))}
        </ul>
        <div>
          <p className={`text text_type_digits-default ${styles.price} ml-6`}>{price}</p>
          <div className={styles.currency}>
            <CurrencyIcon type="primary" />
          </div>
        </div>
      </div>
    </Link>
  );
};

export default React.memo(Order);