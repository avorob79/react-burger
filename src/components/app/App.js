import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import AppHeader from '../app-header/AppHeader';
import BurgerIngredients from '../burger-ingredients/BurgerIngredients';
import BurgerConstructor from '../burger-constructor/BurgerConstructor';
import Modal from '../modal/Modal';
import { resetError } from '../../services/actions/app';
import styles from './App.module.css';

function App() {
  const dispatch = useDispatch();

  const errors = useSelector(state => state.app.errors);

  const hideError = () => dispatch(resetError());

  return (
    <React.Fragment>
      <AppHeader />
      <main className={styles.main}>
        <DndProvider backend={HTML5Backend}>
          <BurgerIngredients />
          <BurgerConstructor />
        </DndProvider>
      </main>
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