import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import styles from './ProfilePage.module.css';

function ProfilePage() {
  const linkClass = (isActive) => "button button_type_secondary text text_type_main-medium" + (isActive ? " " + styles.activeLink : "");

  return (
    <div className={`${styles.page}`}>
      <div className={styles.menu}>
        <nav>
          <ul className={styles.link_list}>
            <li className={styles.link}>
              <NavLink to="/profile" className={({ isActive }) => linkClass(isActive)}>Профиль</NavLink>
            </li>
            <li className={styles.link}>
              <NavLink to="/profile/orders" className={({ isActive }) => linkClass(isActive)}>История заказов</NavLink>
            </li>
            <li className={styles.link}>
              <NavLink to="/login" className={({ isActive }) => linkClass(isActive)}>Выход</NavLink>
            </li>
          </ul>
        </nav>
        <p className="text text_type_main-default text_color_inactive mt-20">В этом разделе вы можете изменить свои персональные данные</p>
      </div>
      <Outlet />
    </div>
  );
}

export default React.memo(ProfilePage);