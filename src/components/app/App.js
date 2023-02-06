import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { AppHeader, BurgerIngredients, BurgerConstructor, Modal, ProfileForm } from '../';
import { LoginPage, RegisterPage, ForgotPasswordPage, ResetPasswordPage, ProfilePage } from '../../pages';
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
    <BrowserRouter>
      <AppHeader />
      <Routes>
        <Route path="/" element={Main} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />
        <Route path="/profile" element={<ProfilePage />}>
          <Route index element={<ProfileForm />} />
          <Route path="orders" element={<div></div>} />
        </Route>
      </Routes>
      {!!errors && errors.length > 0 &&
        <Modal title="Ошибка" onClose={hideError}>
          <div className={styles.error}>
            {errors[0]}
          </div>
        </Modal>
      }
    </BrowserRouter>
  );
}

export default React.memo(App);