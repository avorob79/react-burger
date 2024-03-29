import React, { FC } from 'react';
import { CheckMarkIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useSelector } from '../../hooks';
import { selectors } from '../../services';
import styles from './OrderInfo.module.css';

const OrderInfo: FC = () => {
  const order = useSelector(selectors.order);

  return (
    <div className={styles.orderInfo}>
      <p className="text text_type_digits-large mt-4">{order}</p>
      <p className="text text_type_main-medium mt-8">идентификатор заказа</p>
      <div className={`${styles.done} mt-15`}>
        <div className={styles.graphics}>
          <CheckMarkIcon type="primary" />
          <div className={styles.vector1}></div>
          <div className={styles.vector2}></div>
          <div className={styles.vector3}></div>
        </div>
      </div>
      <p className="text text_type_main-default mt-15">Ваш заказ начали готовить</p>
      <p className="text text_type_main-default text_color_inactive mt-2 mb-15">Дождитесь готовности на орбитальной станции</p>
    </div>
  );
};

export default React.memo(OrderInfo);