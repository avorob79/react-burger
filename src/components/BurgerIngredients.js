import React from 'react';
import PropTypes from 'prop-types';
import {Tab} from '@ya.praktikum/react-developer-burger-ui-components';
import BurgerIngredient from './BurgerIngredient';
import IngredientDetails from './IngredientDetails';
import Modal from './Modal';
import styles from './BurgerIngredients.module.css';
import {ingredientType} from '../utils/types';

function BurgerIngredients(props) {
  const [current, setCurrent] = React.useState('one');
  const [details, setDetails] = React.useState(null);
  const showDetails = (item) => setDetails(item);
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
        <Tab value="one" active={current === 'one'} onClick={setCurrent}>Булки</Tab>
        <Tab value="two" active={current === 'two'} onClick={setCurrent}>Соусы</Tab>
        <Tab value="three" active={current === 'three'} onClick={setCurrent}>Начинки</Tab>
      </div>
      <div className={styles.ingredients}>
        <p className={`text text_type_main-medium ${styles.type} mt-10`}>Булки</p>
        {props.data.filter(item => item.type === "bun").map((item, index)=>(
          <BurgerIngredient key={item._id} counter={1} item={item} showDetails={showDetails} extraClass="ml-4 mr-2 mb-2 mt-6" />
          )
        )}
        <p className={`text text_type_main-medium ${styles.type} mt-8`}>Соусы</p>
        {props.data.filter(item => item.type === "sauce").map((item, index)=>(
          <BurgerIngredient key={item._id} counter={1} item={item} showDetails={showDetails} extraClass="ml-4 mr-2 mb-2 mt-6" />
          )
        )}
        <p className={`text text_type_main-medium ${styles.type} mt-8`}>Начинки</p>
        {props.data.filter(item => item.type === "main").map((item, index)=>(
          <BurgerIngredient key={item._id} counter={1} item={item} showDetails={showDetails} extraClass="ml-4 mr-2 mb-2 mt-6" />
          )
        )}
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
  data: PropTypes.arrayOf(ingredientType).isRequired
};

export default BurgerIngredients;