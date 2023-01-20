import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import BurgerIngredient from '../burger-ingredient/BurgerIngredient';
import IngredientDetails from '../ingredient-details/IngredientDetails';
import Modal from '../modal/Modal';
import styles from './BurgerIngredients.module.css';
import { ingredientType } from '../../utils/types';

function BurgerIngredients({ data }) {
  const [currentTab, setCurrentTab] = React.useState("bun");
  const [details, setDetails] = React.useState(null);

  const onTabClick = (tab) => {
    setCurrentTab(tab);
    const element = document.getElementById(tab);
    if (element) element.scrollIntoView({ behavior: "smooth" });
  }

  const buns = useMemo(() => data.filter((item) => item.type === "bun"),
    [data]
  );

  const sauces = useMemo(() => data.filter((item) => item.type === "sauce"),
    [data]
  );

  const mains = useMemo(() => data.filter((item) => item.type === "main"),
    [data]
  );

  const hideDetails = (e) => {
    setDetails(null);
    if (!!e && !!e.stopPropagation) {
      e.stopPropagation();
    }
  };

  return (
    <section className={styles.burgerIngredients}>
      <h1 className="text text_type_main-large pt-10 pb-5">Соберите бургер</h1>
      <div className={styles.tabs}>
        <Tab value="bun" active={currentTab === "bun"} onClick={onTabClick}>Булки</Tab>
        <Tab value="sauce" active={currentTab === "sauce"} onClick={onTabClick}>Соусы</Tab>
        <Tab value="main" active={currentTab === "main"} onClick={onTabClick}>Начинки</Tab>
      </div>
      <div className={styles.allIngredients}>
        <h3 id="bun" className={`text text_type_main-medium mt-10 mb-6`}>Булки</h3>
        <div className={`${styles.ingredients} pl-4`}>
          {buns.map((item) => (
            <BurgerIngredient key={item._id} counter={1} item={item} showDetails={setDetails} />
          ))}
        </div>
        <h3 id="sauce" className={`text text_type_main-medium mt-10 mb-6`}>Соусы</h3>
        <div className={`${styles.ingredients} pl-4`}>
          {sauces.map((item) => (
            <BurgerIngredient key={item._id} counter={1} item={item} showDetails={setDetails} />
          ))}
        </div>
        <h3 id="main" className={`text text_type_main-medium mt-10 mb-6`}>Начинки</h3>
        <div className={`${styles.ingredients} pl-4`}>
          {mains.map((item) => (
            <BurgerIngredient key={item._id} counter={1} item={item} showDetails={setDetails} />
          ))}
        </div>
      </div>
      {!!details &&
        <Modal title="Детали ингредиента" onClose={hideDetails}>
          <IngredientDetails item={details} />
        </Modal>
      }
    </section>
  );
}

BurgerIngredients.propTypes = {
  data: PropTypes.arrayOf(ingredientType.isRequired).isRequired
};

export default BurgerIngredients;