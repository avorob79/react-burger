import React from 'react';
import PropTypes from 'prop-types';
import {DragIcon, CurrencyIcon, ConstructorElement, Button} from '@ya.praktikum/react-developer-burger-ui-components';
import OrderDetails from '../order-details/OrderDetails';
import Modal from '../modal/Modal';
import styles from './BurgerConstructor.module.css';
import {ingredientType} from '../../utils/types';

function BurgerConstructor(props) {
  const [isOpen, setIsOpen] = React.useState(false);
  const toggleIsOpen = (e) => {
    setIsOpen(prevState => {
      return !prevState;
    });
    if (!!e && !!e.stopPropagation) {
      e.stopPropagation();
    }
  };
  const bun = props.data.find(item => item.type === "bun");
  return (
    <section className={styles.burgerConstructor}>
      <ConstructorElement type="top" isLocked={true} text="Краторная булка N-200i (верх)" price={bun.price} thumbnail={bun.image_mobile} extraClass="mr-4 mt-25" />
      <div className={styles.ingredients}>
        {props.data.filter(item => item.type !== "bun").map((item, index) => (
            <React.Fragment key={item._id}>
              <DragIcon type="primary" />
              <ConstructorElement text={item.name} price={item.price} thumbnail={item.image_mobile} extraClass="ml-1 mr-4" />
            </React.Fragment>
          )
        )}
      </div>
      <ConstructorElement type="bottom" isLocked={true} text="Краторная булка N-200i (низ)" price={bun.price} thumbnail={bun.image_mobile} extraClass="mr-4" />
      <div className={`${styles.flexContainer} pt-6 pb-10`}>
        <p className="text text_type_digits-medium">610</p>
        <div className={styles.currency}>
          <CurrencyIcon type="primary" />
        </div>
        <Button htmlType="button" type="primary" size="large" onClick={toggleIsOpen} extraClass="ml-10 mr-4">Оформить заказ</Button>
      </div>
      {!!isOpen &&
        <Modal title="" onClose={toggleIsOpen}>
          <OrderDetails />
        </Modal>
      }
    </section>
  );
}

BurgerConstructor.propTypes = {
  data: PropTypes.arrayOf(ingredientType).isRequired
};

export default BurgerConstructor;