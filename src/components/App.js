import React from 'react';
import AppHeader from './AppHeader';
import BurgerIngredients from './BurgerIngredients';
import BurgerConstructor from './BurgerConstructor';
import Modal from './Modal';
import styles from './App.module.css';

const url = "https://norma.nomoreparties.space/api/ingredients";

function App(props) {
  const [data, setData] = React.useState(null);
  const [error, setError] = React.useState(null);
  const showError = (message) => {
    setError(message);
  };
  const hideError = (e) => {
    setError(null);
  };
  React.useEffect(() => {
    fetch(url)
    .then(response => response.json())
    .then(result => setData(result.data))
    .catch(e => showError(e.message));
  }, []);
  return (
    <React.Fragment>
      <AppHeader />
      {!!data &&
        <div className={styles.main}>
          <BurgerIngredients data={data} />
          <BurgerConstructor data={data} />
        </div>
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