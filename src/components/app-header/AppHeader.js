import React from 'react';
import {BurgerIcon, ListIcon, ProfileIcon, Logo} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './AppHeader.module.css';

function AppHeader(props) {
  return (
    <header>
      <nav className={styles.header}>
        <a href="url1" className={`button button_type_secondary button_size_medium ${styles.leftButton}`}>
          <BurgerIcon type="primary" />
          <p className={`text text_type_main-default pl-2 ${styles.buttonText}`}>Конструктор</p>
        </a>
        <a href="url2" disabled={true} className={`button button_type_secondary button_size_medium ${styles.leftButton} ml-2`}>
          <ListIcon type="primary" />
          <p className={`text text_type_main-default pl-2 ${styles.buttonText}`}>Лента заказов</p>
        </a>
        <div className={styles.logo}>
          <Logo />
        </div>
        <a href="url3" disabled={true} className={`button button_type_secondary button_size_medium ${styles.rightButton}`}>
          <ProfileIcon type="primary" />
          <p className={`text text_type_main-default pl-2 ${styles.buttonText}`}>Личный кабинет</p>
        </a>
      </nav>
    </header>
  );
}

export default React.memo(AppHeader);