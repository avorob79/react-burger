import React, { FC } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { BurgerIcon, ListIcon, ProfileIcon, Logo } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './AppHeader.module.css';

const AppHeader: FC = () => {
  const linkClass = (isActive: boolean, other?: string): string => `button button_type_secondary button_size_medium ${styles.link}${isActive ? " " + styles.activeLink : ""}${!!other ? " " + other : ""}`;

  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <NavLink to="/" className={({ isActive }) => linkClass(isActive, styles.leftButton)}>
          <BurgerIcon type="primary" />
          <p className={`text text_type_main-default pl-2 ${styles.buttonText}`}>Конструктор</p>
        </NavLink>
        <NavLink to="/feed" className={({ isActive }) => linkClass(isActive, styles.leftButton + " ml-2")}>
          <ListIcon type="primary" />
          <p className={`text text_type_main-default pl-2 ${styles.buttonText}`}>Лента заказов</p>
        </NavLink>
        <div className={styles.logo}>
          <Link to="/">
            <Logo />
          </Link>
        </div>
        <NavLink to="/profile" className={({ isActive }) => linkClass(isActive, styles.rightButton)}>
          <ProfileIcon type="primary" />
          <p className={`text text_type_main-default pl-2 ${styles.buttonText}`}>Личный кабинет</p>
        </NavLink>
      </nav>
    </header>
  );
};

export default React.memo(AppHeader);