import React, { useState, useEffect, useRef, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import { IngredientsCategory, IngredientDetails, Modal } from '../';
import { getIngredients } from '../../services/actions/burgerIngredients';
import { resetIngredientDetails } from '../../services/actions/ingredientDetails';
import styles from './BurgerIngredients.module.css';

const Tabs = {
  BUN: "bun",
  SAUCE: "sauce",
  MAIN: "main"
};

function BurgerIngredients() {
  const dispatch = useDispatch();

  const [currentTab, setCurrentTab] = useState(Tabs.BUN);

  useEffect(
    () => dispatch(getIngredients()),
    [dispatch]
  );

  const bunRef = useRef(null);
  const sauceRef = useRef(null);
  const mainRef = useRef(null);

  const { ingredients, details } = useSelector(state =>
  ({
    ingredients: state.burgerIngredients.ingredients,
    details: state.ingredientDetails.details
  }));

  const onTabClick = (tab) => {
    setCurrentTab(tab);
    const element = document.getElementById(tab);
    if (element) element.scrollIntoView({ behavior: "smooth" });
  }

  const buns = useMemo(() => ingredients.filter((item) => item.type === Tabs.BUN),
    [ingredients]
  );

  const sauces = useMemo(() => ingredients.filter((item) => item.type === Tabs.SAUCE),
    [ingredients]
  );

  const mains = useMemo(() => ingredients.filter((item) => item.type === Tabs.MAIN),
    [ingredients]
  );

  const hideDetails = (e) => {
    dispatch(resetIngredientDetails());
  };

  const handleScroll = (e) => {
    if (Math.abs(e.target.getBoundingClientRect().top - bunRef.current.getBoundingClientRect().top) <= Math.abs(e.target.getBoundingClientRect().top - sauceRef.current.getBoundingClientRect().top)) {
      if (currentTab !== Tabs.BUN) setCurrentTab(Tabs.BUN);
    } else if (Math.abs(e.target.getBoundingClientRect().top - sauceRef.current.getBoundingClientRect().top) <= Math.abs(e.target.getBoundingClientRect().top - mainRef.current.getBoundingClientRect().top)) {
      if (currentTab !== Tabs.SAUCE) setCurrentTab(Tabs.SAUCE);
    } else {
      if (currentTab !== Tabs.MAIN) setCurrentTab(Tabs.MAIN);
    }
  }

  return (
    <section className={styles.burgerIngredients}>
      <h1 className="text text_type_main-large pt-10 pb-5">Соберите бургер</h1>
      <div className={styles.tabs}>
        <Tab value={Tabs.BUN} active={currentTab === Tabs.BUN} onClick={onTabClick}>Булки</Tab>
        <Tab value={Tabs.SAUCE} active={currentTab === Tabs.SAUCE} onClick={onTabClick}>Соусы</Tab>
        <Tab value={Tabs.MAIN} active={currentTab === Tabs.MAIN} onClick={onTabClick}>Начинки</Tab>
      </div>
      <div onScroll={handleScroll} className={styles.ingredients}>
        {!!buns && buns.length > 0 &&
          <IngredientsCategory ref={bunRef} id={Tabs.BUN} title="Булки" items={buns} />
        }
        {!!sauces && sauces.length > 0 &&
          <IngredientsCategory ref={sauceRef} id={Tabs.SAUCE} title="Соусы" items={sauces} />
        }
        {!!mains && mains.length > 0 &&
          <IngredientsCategory ref={mainRef} id={Tabs.MAIN} title="Начинки" items={mains} />
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