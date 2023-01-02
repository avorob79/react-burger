import React from 'react';
import {BurgerIcon, ListIcon, ProfileIcon, Logo, Button} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './AppHeader.module.css';

function AppHeader(props) {
  return (
    <header>
      <div className={styles.header}>
        <Button htmlType="button" type="secondary" size="medium" extraClass={styles.leftButton}>
          <BurgerIcon type="primary" />
          <p className={`text text_type_main-default pl-2 ${styles.buttonText}`}>Конструктор</p>
        </Button>
        <Button htmlType="button" type="secondary" size="medium" disabled={true} extraClass={`${styles.leftButton} ml-2`}>
          <ListIcon type="primary" />
          <p className={`text text_type_main-default pl-2 ${styles.buttonText}`}>Лента заказов</p>
        </Button>
        <div className={styles.logo}>
          <Logo />
        </div>
        <Button htmlType="button" type="secondary" size="medium" disabled={true} extraClass={styles.rightButton}>
          <ProfileIcon type="primary" />
          <p className={`text text_type_main-default pl-2 ${styles.buttonText}`}>Личный кабинет</p>
        </Button>
      </div>
    </header>
  );
}

export default AppHeader;