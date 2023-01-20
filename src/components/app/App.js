import React, { useMemo } from 'react';
import AppHeader from '../app-header/AppHeader';
import BurgerIngredients from '../burger-ingredients/BurgerIngredients';
import BurgerConstructor from '../burger-constructor/BurgerConstructor';
import Modal from '../modal/Modal';
import styles from './App.module.css';
import { ErrorContext } from '../../services/ErrorContext';
import { ConstructorIngredientsContext } from '../../services/ConstructorIngredientsContext';
import { burgerFetch } from '../../utils/burgerFetch';

function App() {
  const [data, setData] = React.useState(null);
  const [error, setError] = React.useState(null);

  const hideError = (e) => setError(null);

  React.useEffect(() => {
    burgerFetch("ingredients")
      .then(result => setData(result.data))
      .catch(e => setError(e.message));
  }, []);

  const constructorIngredients = useMemo(
    () => !!data && data.length > 0 ? [data[1], data[3], ...data.slice(6, 9)] : [],
    [data]);

  return (
    <React.Fragment>
      <ErrorContext.Provider value={{ error, setError }}>
        <AppHeader />
        {!!data &&
          <main className={styles.main}>
            <BurgerIngredients data={data} />
            <ConstructorIngredientsContext.Provider value={constructorIngredients}>
              <BurgerConstructor />
            </ConstructorIngredientsContext.Provider>
          </main>
        }
        {!!error &&
          <Modal title="Ошибка" onClose={hideError}>
            <div className={styles.error}>
              {error}
            </div>
          </Modal>
        }
      </ErrorContext.Provider>
    </React.Fragment>
  );
}

export default App;