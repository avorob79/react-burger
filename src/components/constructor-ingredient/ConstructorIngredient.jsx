import React, { useCallback, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useDrag, useDrop } from 'react-dnd';
import PropTypes from 'prop-types';
import { DragIcon, ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import { replaceIngredient, removeIngredient } from '../../services/actions/burgerConstructor';
import { decreaseIngredientCounter } from '../../services/actions/burgerIngredients';
import { ingredientType } from '../../utils/types';
import styles from './ConstructorIngredient.module.css';

function ConstructorIngredient({ item, index }) {
  const dispatch = useDispatch();

  const [, dragRef] = useDrag({
    type: "item",
    item: { index }
  });

  const [, dropRef] = useDrop({
    accept: "item",
    hover: (item, monitor) => {
      if (!ref.current) return;

      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) return;

      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const hoverClientY = monitor.getClientOffset().y - hoverBoundingRect.top;

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) return;
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) return;

      dispatch(replaceIngredient(dragIndex, hoverIndex));
      item.index = hoverIndex;
    }
  });

  const ref = useRef(null);

  const dragDropRef = dragRef(dropRef(ref));

  const remove = useCallback(() => {
    dispatch(removeIngredient(item.key));
    dispatch(decreaseIngredientCounter(item._id));
  }, [dispatch, item]);

  return (
    <li ref={dragDropRef} className={styles.ingredient}>
      <DragIcon type="primary" />
      <ConstructorElement text={item.name} price={item.price} thumbnail={item.image_mobile} handleClose={remove} extraClass="ml-2" />
    </li>
  );
}

ConstructorIngredient.propTypes = {
  item: ingredientType.isRequired,
  index: PropTypes.number.isRequired
};

export default React.memo(ConstructorIngredient);