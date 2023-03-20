import React, { FC, useEffect } from 'react';
import { Order } from '../../components';
import { useDispatch, useSelector } from '../../hooks';
import { wsConnectionStart, wsConnectionDisconnect } from '../../services/actions/webSocket';
import { selectors } from '../../services';
import styles from './FeedPage.module.css';

const FeedPage: FC = () => {
  const dispatch = useDispatch();

  const orders = useSelector(selectors.orders);
  const total = useSelector(selectors.ordersTotal);
  const totalToday = useSelector(selectors.ordersTotalToday);

  useEffect(() => {
    dispatch(wsConnectionStart());

    return (() => {
      dispatch(wsConnectionDisconnect());
    });
  }, [dispatch]);

  return (
    <div className={`${styles.page} mt-10`}>
      <h1 className={`text text_type_main-large pb-5`}>Лента заказов</h1>
      <div className={styles.orders}>
        {orders.map((item) => (
          <Order key={item.number} data={item} url="feed" expanded={false} />
        ))}
      </div>
      <div className={styles.info}>
        <div className={styles.numbers}>
          <h2 className="text text_type_main-medium">Готовы:</h2>
          <div className={`${styles.doneColor} mt-6`}>
            {orders.filter((item) => item.status === "done").slice(0, 5).map((item, index) => (
              <p key={item.number} className={`text text_type_digits-default`}>{item.number}</p>
            ))}
          </div>
        </div>
        <div className={styles.numbers}>
          <h2 className="text text_type_main-medium">В работе:</h2>
          <div className={`mt-6`}>
            {orders.filter((item) => item.status !== "done").slice(0, 5).map((item, index) => (
              <p key={item.number} className={`text text_type_digits-default`}>{item.number}</p>
            ))}
          </div>
        </div>
        <h2 className={`text text_type_main-medium mt-15 ${styles.width100}`}>Выполнено за все время:</h2>
        <p className={`text text_type_digits-large ${styles.width100}`}>{total}</p>
        <h2 className={`text text_type_main-medium mt-15 ${styles.width100}`}>Выполнено за сегодня:</h2>
        <p className={`text text_type_digits-large ${styles.width100}`}>{totalToday}</p>
      </div>
    </div>
  );
}

export default React.memo(FeedPage);