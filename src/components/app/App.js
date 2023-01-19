import React from 'react';
import AppHeader from '../app-header/AppHeader';
import BurgerIngredients from '../burger-ingredients/BurgerIngredients';
import BurgerConstructor from '../burger-constructor/BurgerConstructor';
import Modal from '../modal/Modal';
import styles from './App.module.css';

const url = "https://norma.nomoreparties.space/api/ingredients";

function App(props) {
  const [data, setData] = React.useState(null);
  const [error, setError] = React.useState(null);
  const showError = (message) => setError(message);
  const hideError = (e) => setError(null);
  React.useEffect(() => {
    fetch(url)
    .then(response => response.ok ? response.json() : Promise.reject(new Error(`Ошибка запроса данных. Код ошибки ${response.status} (${response.statusText})`)))
    .then(result => setData(result.data))
    .catch(e => showError(e.message));
  }, []);
  return (
    <React.Fragment>
      <AppHeader />
      {!!data &&
        <main className={styles.main}>
          <BurgerIngredients data={data} />
          <BurgerConstructor data={data} />
        </main>
      }
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

export default App;