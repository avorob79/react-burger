import React, { FC, useEffect } from 'react';
import { Order } from '../';
import { useDispatch, useSelector } from '../../hooks';
import { wsProtectedConnectionStart, wsConnectionDisconnect } from '../../services/actions/webSocket';
import { getCookie } from '../../utils/cookie';
import { selectors } from '../../services';
import styles from './ProfileOrders.module.css';

const ProfileOrders: FC = () => {
  const dispatch = useDispatch();

  const orders = useSelector(selectors.orders);

  useEffect(() => {
    const accessToken = getCookie("token");
    if (!!accessToken) {
      dispatch(wsProtectedConnectionStart(accessToken));
    }

    return (() => {
      dispatch(wsConnectionDisconnect());
    });
  }, [dispatch]);

  return (
    <div className={styles.orders}>
      {orders.map((item) => (
        <Order key={item.number} data={item} url="profile/orders" expanded={true} />
      ))}
    </div>
  );
};

export default React.memo(ProfileOrders);