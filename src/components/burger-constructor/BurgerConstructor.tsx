import React, { FC, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useDrop } from 'react-dnd';
import { CurrencyIcon, ConstructorElement, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { ConstructorIngredient, OrderDetails, Modal } from '../';
import { setBunCounter, resetBunCounter, increaseIngredientCounter } from '../../services/actions/burgerIngredients';
import { setBun, addIngredient, getOrder, resetOrderDetails } from '../../services/actions/burgerConstructor';
import { IUser, IIngredient, IIngredientExt } from '../../utils/types';
import { selectors } from '../../services';
import styles from './BurgerConstructor.module.css';

const BurgerConstructor: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const bun = useSelector(selectors.bun) as IIngredient;
  const ingredients = useSelector(selectors.selectedIngredients) as IIngredientExt[];
  const orderRequest = useSelector(selectors.orderRequest) as boolean;
  const orderDetails = useSelector(selectors.orderDetails) as boolean;

  const user = useSelector(selectors.user) as IUser;

  const totalPrice = useMemo(
    () => (bun?.price ?? 0) * 2 + ingredients.reduce((acc, item) => acc + item.price, 0),
    [bun, ingredients]
  );

  const [, bunTarget1] = useDrop({
    accept: "bun",
    drop(item: IIngredient) {
      if (!!bun) {
        dispatch(resetBunCounter(bun._id));
      }
      dispatch(setBun(item));
      dispatch(setBunCounter(item._id));
    }
  });

  const [, bunTarget2] = useDrop({
    accept: "bun",
    drop(item: IIngredient) {
      if (!!bun) {
        dispatch(resetBunCounter(bun._id));
      }
      dispatch(setBun(item));
      dispatch(setBunCounter(item._id));
    }
  });

  const [, ingredientsTarget] = useDrop({
    accept: "ingredient",
    drop(item: IIngredient) {
      dispatch(addIngredient(item));
      dispatch(increaseIngredientCounter(item._id));
    }
  });

  const showOrderDetails = () => {
    if (!!user) {
      dispatch(getOrder([bun._id, ...ingredients.map(item => item._id), bun._id] as string[]) as any);
    } else {
      navigate("/login");
    }
  }

  const hideOrderDetails = () => {
    dispatch(resetOrderDetails());
  };

  return (
    <section className={styles.burgerConstructor}>
      {!!bun ? (
        <div ref={bunTarget1} className="mr-4 mt-25">
          <ConstructorElement type="top" isLocked={true} text={`${bun.name} (верх)`} price={bun.price} thumbnail={bun.image_mobile} />
        </div>
      ) : (
        <div ref={bunTarget1} className={`constructor-element constructor-element_pos_top ${styles.emptyIngredient} mr-4 mt-25`}>Выберите булки</div>
      )}
      <ul ref={ingredientsTarget} className={`${styles.ingredients} pl-4`}>
        {(!!ingredients && ingredients.length > 0) ? ingredients.map((item, index) => (
          <ConstructorIngredient key={item.key} item={item} index={index} />
        )) : (
          <li>
            <div className={`constructor-element ${styles.emptyIngredient} ml-8`}>Выберите начинку</div>
          </li>
        )}
      </ul>
      {!!bun ? (
        <div ref={bunTarget2} className="mr-4">
          <ConstructorElement type="bottom" isLocked={true} text={`${bun.name} (низ)`} price={bun.price} thumbnail={bun.image_mobile} />
        </div>
      ) : (
        <div ref={bunTarget2} className={`constructor-element constructor-element_pos_bottom ${styles.emptyIngredient} mr-4`}>Выберите булки</div>
      )}
      <div className={`${styles.order} pt-6 pb-10`}>
        <p className="text text_type_digits-medium">{totalPrice}</p>
        <div className={styles.currency}>
          <CurrencyIcon type="primary" />
        </div>
        <Button htmlType="button" type="primary" size="large" disabled={orderRequest || !bun} onClick={showOrderDetails} extraClass="ml-10 mr-4">Оформить заказ</Button>
      </div>
      {!!orderDetails &&
        <Modal title="" onClose={hideOrderDetails}>
          <OrderDetails />
        </Modal>
      }
    </section>
  );
};

export default React.memo(BurgerConstructor);