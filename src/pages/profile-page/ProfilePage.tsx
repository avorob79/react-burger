import React, { FC } from 'react';
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom';
import styles from './ProfilePage.module.css';

const ProfilePage: FC = () => {
  const { pathname } = useLocation();

  const linkClass = (isActive: boolean) => `button button_type_secondary text text_type_main-medium ${styles.link}${isActive ? " " + styles.activeLink : ""}`;

  return (
    <div className={`${styles.page}`}>
      <div className={styles.menu}>
        <nav>
          <ul className={styles.linkList}>
            <li className={styles.link}>
              <NavLink to="/profile" end className={({ isActive }) => linkClass(isActive)}>Профиль</NavLink>
            </li>
            <li className={styles.link}>
              <NavLink to="/profile/orders" className={({ isActive }) => linkClass(isActive)}>История заказов</NavLink>
            </li>
            <li className={styles.link}>
              <Link to="/logout" className={linkClass(false)}>Выход</Link>
            </li>
          </ul>
        </nav>
        {pathname === "/profile" && (
          <p className="text text_type_main-default text_color_inactive mt-20">В этом разделе вы можете изменить свои персональные данные</p>
        )}
      </div>
      <Outlet />
    </div>
  );
};

export default React.memo(ProfilePage);