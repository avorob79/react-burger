import React from 'react';
import AppHeader from './AppHeader';
import BurgerIngredients from './BurgerIngredients';
import BurgerConstructor from './BurgerConstructor';
import styles from './App.module.css';
import data from '../utils/data';

function App(props) {
  return (
    <React.Fragment>
      <AppHeader />
      <div className={styles.main}>
        <BurgerIngredients data={data} />
        <BurgerConstructor data={data} />
      </div>
    </React.Fragment>
  );
}

export default App;
