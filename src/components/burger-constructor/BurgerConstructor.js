import React, { useContext, useMemo } from 'react';
import {DragIcon, CurrencyIcon, ConstructorElement, Button} from '@ya.praktikum/react-developer-burger-ui-components';
import OrderDetails from '../order-details/OrderDetails';
import Modal from '../modal/Modal';
import styles from './BurgerConstructor.module.css';
import { ErrorContext } from '../../services/ErrorContext';
import { ConstructorIngredientsContext } from '../../services/ConstructorIngredientsContext';
import { burgerFetch } from '../../utils/burgerFetch';

function BurgerConstructor() {
  const { setError } = useContext(ErrorContext);
  const ingredients = useContext(ConstructorIngredientsContext);
  const [orderNumber, setOrderNumber] = React.useState(null);
  const [orderLoading, setOrderLoading] = React.useState(false);
  const [isOpenDetails, setIsOpenDetails] = React.useState(false);

  const bun = useMemo(
    () => ingredients.find(item => item.type === "bun"),
    [ingredients]
  );
  const other = useMemo(
    () => ingredients.filter(item => item.type !== "bun"),
    [ingredients]
  );

  const totalPrice = useMemo(
    ()=> (ingredients.find((item) => item.type === "bun")?.price ?? 0) * 2 + ingredients.filter((item) => item.type !== "bun").reduce((acc, item) => acc + item.price, 0),
    [ingredients]
  );

  const showOrderDetails = (e) => {
    if (!orderNumber) {
      setOrderLoading(true);
      burgerFetch("orders", { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ingredients: [bun._id, ...other.map((item) => item._id), bun._id] }) })
        .then(result => {
          setOrderNumber(result.order.number);
          setIsOpenDetails(true);
        })
        .catch(e => setError(e.message))
        .finally(() => setOrderLoading(false));
    } else {
      setIsOpenDetails(true);
    }
  }

  const hideOrderDetails = (e) => {
    setIsOpenDetails(false);
  };

  return (
    <section className={styles.burgerConstructor}>
      {!!bun ? (
        <ConstructorElement type="top" isLocked={true} text={`${bun.name} (верх)`} price={bun.price} thumbnail={bun.image_mobile} extraClass="mr-4 mt-25" />
      ) : (
        <div className={`constructor-element constructor-element_pos_top ${styles.emptyIngredient} mr-4 mt-25`}>Выберите булки</div>
      )}
      <ul className={`${styles.ingredients} pl-4`}>
        {(!!other && other.length > 0) ? other.map((item) => (
            <li key={item._id} className={styles.ingredient}>
              <DragIcon type="primary" />
              <ConstructorElement text={item.name} price={item.price} thumbnail={item.image_mobile} extraClass="ml-2" />
            </li>
          )) : (
            <li>
              <div className={`constructor-element ${styles.emptyIngredient} ml-8`}>Выберите начинку</div>
            </li>
          )}
      </ul>
      {!!bun ? (
        <ConstructorElement type="bottom" isLocked={true} text={`${bun.name} (низ)`} price={bun.price} thumbnail={bun.image_mobile} extraClass="mr-4" />
      ) : (
        <div className={`constructor-element constructor-element_pos_bottom ${styles.emptyIngredient} mr-4`}>Выберите булки</div>
      )}
      <div className={`${styles.order} pt-6 pb-10`}>
        <p className="text text_type_digits-medium">{totalPrice}</p>
        <div className={styles.currency}>
          <CurrencyIcon type="primary" />
        </div>
        <Button htmlType="button" type="primary" size="large" disabled={orderLoading || !ingredients || ingredients.length === 0} onClick={showOrderDetails} extraClass="ml-10 mr-4">Оформить заказ</Button>
      </div>
      {!!isOpenDetails &&
        <Modal title="" onClose={hideOrderDetails}>
          <OrderDetails number={orderNumber} />
        </Modal>
      }
    </section>
  );
}

export default BurgerConstructor;