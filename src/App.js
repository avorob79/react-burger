import React from 'react';
import AppHeader from './components/AppHeader';
import BurgerIngredients from './components/BurgerIngredients';
import BurgerConstructor from './components/BurgerConstructor';
import data from './Data';
import styles from './App.module.css';

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
