import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import AppHeader from '../app-header/AppHeader';
import BurgerIngredients from '../burger-ingredients/BurgerIngredients';
import BurgerConstructor from '../burger-constructor/BurgerConstructor';
import Modal from '../modal/Modal';
import { resetError } from '../../services/actions/App';
import styles from './App.module.css';

function App() {
  const dispatch = useDispatch();

  const error = useSelector(state => state.app.error);

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
      {!!error &&
        <Modal title="Ошибка" onClose={hideError}>
          <div className={styles.error}>
            {error}
          </div>
        </Modal>
      }
    </React.Fragment>
  );
}

export default React.memo(App);