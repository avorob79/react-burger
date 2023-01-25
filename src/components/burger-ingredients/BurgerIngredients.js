import React, { useState, useEffect, useRef, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import BurgerIngredient from '../burger-ingredient/BurgerIngredient';
import IngredientDetails from '../ingredient-details/IngredientDetails';
import Modal from '../modal/Modal';
import { getIngredients, resetDetails } from '../../services/actions/BurgerIngredients';
import styles from './BurgerIngredients.module.css';

function BurgerIngredients() {
  const dispatch = useDispatch();

  const [currentTab, setCurrentTab] = useState("bun");

  useEffect(
    () => dispatch(getIngredients()),
    [dispatch]
  );

  const bunRef = useRef(null);
  const sauceRef = useRef(null);
  const mainRef = useRef(null);

  const { ingredients, counters, details } = useSelector(state =>
  ({
    ingredients: state.burgerIngredients.ingredients,
    counters: state.burgerIngredients.counters,
    details: state.burgerIngredients.details
  }));

  const onTabClick = (tab) => {
    setCurrentTab(tab);
    const element = document.getElementById(tab);
    if (element) element.scrollIntoView({ behavior: "smooth" });
  }

  const buns = useMemo(() => ingredients.filter((item) => item.type === "bun"),
    [ingredients]
  );

  const sauces = useMemo(() => ingredients.filter((item) => item.type === "sauce"),
    [ingredients]
  );

  const mains = useMemo(() => ingredients.filter((item) => item.type === "main"),
    [ingredients]
  );

  const hideDetails = (e) => {
    dispatch(resetDetails());
  };

  const handleScroll = (e) => {
    if (Math.abs(e.target.getBoundingClientRect().top - bunRef.current.getBoundingClientRect().top) <= Math.abs(e.target.getBoundingClientRect().top - sauceRef.current.getBoundingClientRect().top)) {
      if (currentTab !== "bun") setCurrentTab("bun");
    } else if (Math.abs(e.target.getBoundingClientRect().top - sauceRef.current.getBoundingClientRect().top) <= Math.abs(e.target.getBoundingClientRect().top - mainRef.current.getBoundingClientRect().top)) {
      if (currentTab !== "sauce") setCurrentTab("sauce");
    } else {
      if (currentTab !== "main") setCurrentTab("main");
    }
  }

  return (
    <section className={styles.burgerIngredients}>
      <h1 className="text text_type_main-large pt-10 pb-5">Соберите бургер</h1>
      <div className={styles.tabs}>
        <Tab value="bun" active={currentTab === "bun"} onClick={onTabClick}>Булки</Tab>
        <Tab value="sauce" active={currentTab === "sauce"} onClick={onTabClick}>Соусы</Tab>
        <Tab value="main" active={currentTab === "main"} onClick={onTabClick}>Начинки</Tab>
      </div>
      <div onScroll={handleScroll} className={styles.allIngredients}>
        {!!buns && buns.length > 0 &&
          <>
            <h3 id="bun" ref={bunRef} className={`text text_type_main-medium mt-10 mb-6`}>Булки</h3>
            <div className={`${styles.ingredients} pl-4`}>
              {buns.map((item) => (
                <BurgerIngredient key={item._id} counter={counters[item._id]} item={item} />
              ))}
            </div>
          </>
        }
        {!!sauces && sauces.length > 0 &&
          <>
            <h3 id="sauce" ref={sauceRef} className={`text text_type_main-medium mt-10 mb-6`}>Соусы</h3>
            <div className={`${styles.ingredients} pl-4`}>
              {sauces.map((item) => (
                <BurgerIngredient key={item._id} counter={counters[item._id]} item={item} />
              ))}
            </div>
          </>
        }
        {!!mains && mains.length > 0 &&
          <>
            <h3 id="main" ref={mainRef} className={`text text_type_main-medium mt-10 mb-6`}>Начинки</h3>
            <div className={`${styles.ingredients} pl-4`}>
              {mains.map((item) => (
                <BurgerIngredient key={item._id} counter={counters[item._id]} item={item} />
              ))}
            </div>
          </>
        }
      </div>
      {!!details &&
        <Modal title="Детали ингредиента" onClose={hideDetails}>
          <IngredientDetails />
        </Modal>
      }
    </section>
  );
}

export default React.memo(BurgerIngredients);