import {
  GET_INGREDIENTS_REQUEST,
  GET_INGREDIENTS_SUCCESS,
  GET_INGREDIENTS_ERROR,
  SET_BUN_COUNTER,
  RESET_BUN_COUNTER,
  INCREASE_INGREDIENT_COUNTER,
  DECREASE_INGREDIENT_COUNTER
} from '../constants';
import { setError } from './app';
import { burgerFetch } from '../../utils/burgerFetch';
import { IIngredient, TAppDispatch } from '../types';

export interface IGetIngredientsRequest {
  readonly type: typeof GET_INGREDIENTS_REQUEST;
}

export interface IGetIngredientsSuccess {
  readonly type: typeof GET_INGREDIENTS_SUCCESS;
  readonly ingredients: ReadonlyArray<IIngredient>;
}

export interface IGetIngredientsError {
  readonly type: typeof GET_INGREDIENTS_ERROR;
  readonly error: string;
}

export interface ISetBunCounter {
  readonly type: typeof SET_BUN_COUNTER;
  readonly id: string;
}

export interface IResetBunCounter {
  readonly type: typeof RESET_BUN_COUNTER;
  readonly id: string;
}

export interface IIncreaseIngredientCounter {
  readonly type: typeof INCREASE_INGREDIENT_COUNTER;
  readonly id: string;
}

export interface IDecreaseIngredientCounter {
  readonly type: typeof DECREASE_INGREDIENT_COUNTER;
  readonly id: string;
}

export type TBurgerIngredients =
  | IGetIngredientsRequest
  | IGetIngredientsSuccess
  | IGetIngredientsError
  | ISetBunCounter
  | IResetBunCounter
  | IIncreaseIngredientCounter
  | IDecreaseIngredientCounter;

export const setBunCounter = (id: string): ISetBunCounter => ({
  type: SET_BUN_COUNTER,
  id: id
});

export const resetBunCounter = (id: string): IResetBunCounter => ({
  type: RESET_BUN_COUNTER,
  id: id
});

export const increaseIngredientCounter = (id: string): IIncreaseIngredientCounter => ({
  type: INCREASE_INGREDIENT_COUNTER,
  id: id
});

export const decreaseIngredientCounter = (id: string): IDecreaseIngredientCounter => ({
  type: DECREASE_INGREDIENT_COUNTER,
  id: id
});

interface IIngredientsResponse {
  success: boolean;
  data: ReadonlyArray<IIngredient>;
}

export const getIngredients = () => {
  return function (dispatch: TAppDispatch) {
    dispatch({
      type: GET_INGREDIENTS_REQUEST
    });

    return burgerFetch<IIngredientsResponse>("ingredients")
      .then(result => {
        dispatch({
          type: GET_INGREDIENTS_SUCCESS,
          ingredients: result.data
        });
      })
      .catch(e => {
        dispatch({
          type: GET_INGREDIENTS_ERROR,
          error: e.message
        });
        dispatch(setError(e.message));
      });
  };
};