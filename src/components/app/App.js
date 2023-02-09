import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { AppHeader, BurgerIngredients, BurgerConstructor, Modal, ProfileForm, ProtectedRouteElement } from '../';
import { ForgotPasswordPage, LoginPage, LogoutPage, ProfilePage, RegisterPage, ResetPasswordPage } from '../../pages';
import { resetError } from '../../services/actions/app';
import styles from './App.module.css';

function App() {
  const dispatch = useDispatch();

  const errors = useSelector(state => state.app.errors);

  const hideError = () => dispatch(resetError());

  const Main = (
    <main className={styles.main}>
      <DndProvider backend={HTML5Backend}>
        <BurgerIngredients />
        <BurgerConstructor />
      </DndProvider>
    </main>
  );

  return (
    <React.Fragment>
      <AppHeader />
      <Routes>
        <Route path="/" element={Main} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />
        <Route path="/profile" element={<ProtectedRouteElement><ProfilePage /></ProtectedRouteElement>}>
          <Route index element={<ProfileForm />} />
          <Route path="orders" element={<div></div>} />
        </Route>
        <Route path="/logout" element={<LogoutPage />} />
      </Routes>
      {!!errors && errors.length > 0 &&
        <Modal title="Ошибка" onClose={hideError}>
          <div className={styles.error}>
            {errors[0]}
          </div>
        </Modal>
      }
    </React.Fragment>
  );
}

export default React.memo(App);