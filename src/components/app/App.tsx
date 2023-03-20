import React, { FC, useState, useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { AppHeader, BurgerIngredients, BurgerConstructor, IngredientDetails, Loader, Modal, ModalOrderDetails, ProfileForm, ProfileOrders, ProtectedRouteElement } from '../';
import { FeedPage, ForgotPasswordPage, IngredientDetailsPage, LoginPage, LogoutPage, NotFoundPage, OrderDetailsPage, ProfilePage, RegisterPage, ResetPasswordPage } from '../../pages';
import { useDispatch, useSelector } from '../../hooks';
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
      dispatch(getIngredients());
      if (!!getCookie("token")) {
        dispatch(getUser())
          .finally(() => setUserRequest(false));
      } else {
        setUserRequest(false);
      }
    },
    [dispatch]
  );

  const background = location.state && location.state.background;

  const errors = useSelector(selectors.errors);

  const hideModal = () => navigate(background, { replace: true });

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
        <Route path="/feed" element={<FeedPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />
        <Route path="/profile" element={<ProtectedRouteElement><ProfilePage /></ProtectedRouteElement>}>
          <Route index element={<ProfileForm />} />
          <Route path="orders" element={<ProfileOrders />} />
        </Route>
        <Route path="/logout" element={<LogoutPage />} />
        <Route path="/ingredients/:id" element={<IngredientDetailsPage />} />
        <Route path="/feed/:id" element={<OrderDetailsPage />} />
        <Route path="/profile/orders/:id" element={<ProtectedRouteElement><OrderDetailsPage /></ProtectedRouteElement>} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      {!!background &&
        <Routes>
          <Route path="/ingredients/:id" element={<Modal title="Детали ингредиента" onClose={hideModal}><IngredientDetails /></Modal>} />
          <Route path="/feed/:id" element={<ModalOrderDetails onClose={hideModal} />} />
          <Route path="/profile/orders/:id" element={<ModalOrderDetails onClose={hideModal} />} />
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