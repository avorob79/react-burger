import React, { FC, useState, useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { AppHeader, BurgerIngredients, BurgerConstructor, IngredientDetails, Loader, Modal, ProfileForm, ProtectedRouteElement } from '../';
import { ForgotPasswordPage, IngredientDetailsPage, LoginPage, LogoutPage, NotFoundPage, ProfilePage, RegisterPage, ResetPasswordPage } from '../../pages';
import { getIngredients } from '../../services/actions/burgerIngredients';
import { resetError } from '../../services/actions/app';
import { getUser } from '../../services/actions/auth';
import { getCookie } from '../../utils/cookie';
import { selectors } from '../../services';
import styles from './App.module.css';

const App: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const [isUserRequest, setUserRequest] = useState<boolean>(true);

  useEffect(
    () => {
      dispatch(getIngredients() as any);
      if (!!getCookie("token")) {
        dispatch(getUser() as any)
          .finally(() => setUserRequest(false));
      } else {
        setUserRequest(false);
      }
    },
    [dispatch]
  );

  const background = location.state && location.state.background;

  const errors = useSelector(selectors.errors) as Array<string>;

  const hideIngredientDetails = () => navigate("/", { replace: true });

  const hideError = () => dispatch(resetError());

  const main = (
    <main className={styles.main}>
      <DndProvider backend={HTML5Backend}>
        <BurgerIngredients />
        <BurgerConstructor />
      </DndProvider>
    </main>
  );

  if (isUserRequest) {
    return <Loader />;
  }

  return (
    <React.Fragment>
      <AppHeader />
      <Routes location={background || location}>
        <Route path="/" element={main} />
        <Route path="/orders" element={<div></div>} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />
        <Route path="/profile" element={<ProtectedRouteElement><ProfilePage /></ProtectedRouteElement>}>
          <Route index element={<ProfileForm />} />
          <Route path="orders" element={<div></div>} />
        </Route>
        <Route path="/logout" element={<LogoutPage />} />
        <Route path="/ingredients/:id" element={<IngredientDetailsPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      {!!background &&
        <Routes>
          <Route path="/ingredients/:id" element={<Modal title="Детали ингредиента" onClose={hideIngredientDetails}><IngredientDetails /></Modal>} />
        </Routes>
      }
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