import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import { CheckMarkIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './OrderDetails.module.css';

const OrderDetails: FC = () => {
  const order = useSelector((state: any) => state.burgerConstructor.order);

  return (
    <div className={styles.orderDetails}>
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

export default React.memo(OrderDetails);