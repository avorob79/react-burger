import React, { FC } from 'react';
import { useParams } from 'react-router-dom';
import { OrderDetails } from '../../components';
import styles from './OrderDetailsPage.module.css';

const OrderDetailsPage: FC = () => {
  const { id } = useParams();

  return (
    <div className={styles.page}>
      <h1 className={`text text_type_digits-default mb-10`}>#{id}</h1>
      <OrderDetails />
    </div>
  );
};

export default React.memo(OrderDetailsPage);