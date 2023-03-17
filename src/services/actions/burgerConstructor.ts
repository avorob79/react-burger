import {
  SET_BUN,
  ADD_INGREDIENT,
  REMOVE_INGREDIENT,
  REPLACE_INGREDIENT,
  RESET_INGREDIENTS,

  GET_ORDER_REQUEST,
  GET_ORDER_SUCCESS,
  GET_ORDER_ERROR,

  RESET_ORDER_INFO
} from '../constants';
import { v4 as uuidv4 } from 'uuid';
import { setError } from './app';
import { burgerFetch } from '../../utils/burgerFetch';
import { getCookie } from '../../utils/cookie';
import { IIngredient, TAppDispatch } from '../types';

export interface ISetBun {
  readonly type: typeof SET_BUN;
  readonly bun: IIngredient;
}

export interface IAddIngredient {
  readonly type: typeof ADD_INGREDIENT;
  readonly ingredient: IIngredient;
  readonly key: string;
}

export interface IRemoveIngredient {
  readonly type: typeof REMOVE_INGREDIENT;
  readonly key: string;
}

export interface IReplaceIngredient {
  readonly type: typeof REPLACE_INGREDIENT;
  readonly fromIndex: number;
  readonly toIndex: number;
}

export interface IResetIngredients {
  readonly type: typeof RESET_INGREDIENTS;
}

export interface IGetOrderRequest {
  readonly type: typeof GET_ORDER_REQUEST;
}

export interface IGetOrderSuccess {
  readonly type: typeof GET_ORDER_SUCCESS;
  readonly order: number;
}

export interface IGetOrderError {
  readonly type: typeof GET_ORDER_ERROR;
  readonly error: string;
}

export interface IResetOrderInfo {
  readonly type: typeof RESET_ORDER_INFO;
}

export type TBurgerConstructor =
  | ISetBun
  | IAddIngredient
  | IRemoveIngredient
  | IReplaceIngredient
  | IResetIngredients
  | IGetOrderRequest
  | IGetOrderSuccess
  | IGetOrderError
  | IResetOrderInfo;

export const setBun = (bun: IIngredient): ISetBun => ({
  type: SET_BUN,
  bun: bun
});

export const addIngredient = (ingredient: IIngredient): IAddIngredient => ({
  type: ADD_INGREDIENT,
  ingredient: ingredient,
  key: uuidv4()
});

export const removeIngredient = (key: string): IRemoveIngredient => ({
  type: REMOVE_INGREDIENT,
  key: key
});

export const replaceIngredient = (fromIndex: number, toIndex: number): IReplaceIngredient => ({
  type: REPLACE_INGREDIENT,
  fromIndex: fromIndex,
  toIndex: toIndex
});

export const resetIngredients = (): IResetIngredients => ({
  type: RESET_INGREDIENTS
});

export const resetOrderInfo = (): IResetOrderInfo => ({
  type: RESET_ORDER_INFO
});

interface IOrderResponse {
  success: boolean;
  name: string;
  order: {
    ingredients: ReadonlyArray<IIngredient>;
    _id: string;
    owner: {
      name: string;
      email: string;
      createdAt: string;
      updatedAt: string;
    },
    status: string;
    name: string;
    createdAt: string;
    updatedAt: string;
    number: number;
    price: number
  }
}

export const getOrder = (ids: ReadonlyArray<string>) => {
  return function (dispatch: TAppDispatch) {
    dispatch({
      type: GET_ORDER_REQUEST
    });

    return burgerFetch<IOrderResponse>("orders",
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: "Bearer " + getCookie("token")
        },
        body: JSON.stringify({ ingredients: ids })
      })
      .then(result => {
        dispatch({
          type: GET_ORDER_SUCCESS,
          order: result.order.number
        });
      })
      .catch(e => {
        dispatch({
          type: GET_ORDER_ERROR,
          error: e.message
        });
        dispatch(setError(e.message));
      });
  };
};