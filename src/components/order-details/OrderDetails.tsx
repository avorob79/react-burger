import React, { FC, useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import Loader from '../loader/Loader';
import { useSelector, useDispatch } from '../../hooks';
import { getOrderDetails, resetOrderDetails } from '../../services/actions/orderDetails';
import { dateToString } from '../../utils/date';
import { selectors } from '../../services';
import styles from './OrderDetails.module.css';


const OrderDetails: FC = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  const order = useSelector(selectors.orderDetails);
  const ingredientsDictionary = useSelector(selectors.ingredientsDictionary);
  const price = useMemo(() =>
    order?.ingredients.reduce((price, item) => price + ingredientsDictionary[item].price, 0)
    , [order, ingredientsDictionary]);
  const orderDate = useMemo(() => !!order ? dateToString(new Date(order.createdAt)) : ""
    , [order]);

  useEffect(() => {
    if (!!id) {
      dispatch(getOrderDetails(id));
    }
    return () => {
      dispatch(resetOrderDetails());
    }
  }, [dispatch, id]);

  return (
    <div className={styles.orderDetails}>
      {!!order ?
        (<React.Fragment>
          <p className="text text_type_main-medium mb-3">{order.name}</p>
          <p className={`text text_type_main-default mb-15 ${order.status === "done" ? styles.doneColor : ""}`}>{order.status === "done" ? "Выполнен" : (order.status === "pending" ? "Готовится" : "Создан")}</p>
          <p className="text text_type_main-medium mb-6">Состав:</p>
          <div className={`${styles.ingredients}`}>
            {order.ingredients.filter((item, index, self) => self.indexOf(item) === index).map((item) => (
              <div key={item} className={`${styles.ingredient}`}>
                <div className={styles.ingredientImage}>
                  <img src={ingredientsDictionary[item].image_mobile} alt={ingredientsDictionary[item].name} />
                </div>
                <div className={`${styles.ingredientName} text text_type_main-default ml-4`}>{ingredientsDictionary[item].name}</div>
                <div className="mr-6">
                  <p className={`${styles.price} text text_type_digits-default ml-4`}>{order.ingredients.filter((item2) => item2 === item).length} x {ingredientsDictionary[item].price}</p>
                  <div className={styles.currency}>
                    <CurrencyIcon type="primary" />
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className={`${styles.total} mt-10`}>
            <span className={`text text_type_main-default text_color_inactive`}>{orderDate}</span>
            <div>
              <p className={`${styles.price} text text_type_digits-default ml-4`}>{price}</p>
              <div className={styles.currency}>
                <CurrencyIcon type="primary" />
              </div>
            </div>
          </div>
        </React.Fragment>
        ) : (
          <Loader extraClass="mt-10" />
        )
      }
    </div>
  );
};

export default React.memo(OrderDetails);