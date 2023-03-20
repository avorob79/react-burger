import React, { FC, useCallback, useRef } from 'react';
import { DropTargetMonitor, XYCoord, useDrag, useDrop } from 'react-dnd';
import { DragIcon, ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import { replaceIngredient, removeIngredient } from '../../services/actions/burgerConstructor';
import { useDispatch } from '../../hooks';
import { decreaseIngredientCounter } from '../../services/actions/burgerIngredients';
import { IIngredientExt } from '../../services/types';
import styles from './ConstructorIngredient.module.css';

interface IProps {
  item: IIngredientExt;
  index: number;
}

const ConstructorIngredient: FC<IProps> = ({ item, index }) => {
  const dispatch = useDispatch();

  const [, dragRef] = useDrag({
    type: "item",
    item: { index }
  });

  const [, dropRef] = useDrop({
    accept: "item",
    hover: (item: { index: number }, monitor: DropTargetMonitor) => {
      if (!ref.current) return;

      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) return;

      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const hoverClientY = (monitor.getClientOffset() as XYCoord).y - hoverBoundingRect.top;

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) return;
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) return;

      dispatch(replaceIngredient(dragIndex, hoverIndex));
      item.index = hoverIndex;
    }
  });

  const ref = useRef<HTMLLIElement>(null);

  dragRef(dropRef(ref));

  const remove = useCallback(() => {
    dispatch(removeIngredient(item.key));
    dispatch(decreaseIngredientCounter(item._id));
  }, [dispatch, item]);

  return (
    <li ref={ref} className={styles.ingredient}>
      <DragIcon type="primary" />
      <ConstructorElement text={item.name} price={item.price} thumbnail={item.image_mobile} handleClose={remove} extraClass="ml-2" />
    </li>
  );
};

export default React.memo(ConstructorIngredient);