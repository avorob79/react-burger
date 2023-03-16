import {
  SET_BUN,
  ADD_INGREDIENT,
  REMOVE_INGREDIENT,
  REPLACE_INGREDIENT,
  GET_ORDER_REQUEST,
  GET_ORDER_SUCCESS,
  GET_ORDER_ERROR,
  RESET_ORDER_INFO
} from '../constants';
import { TBurgerConstructor } from '../actions/burgerConstructor';
import { IIngredient, IIngredientExt } from '../types';

export interface IBurgerConstructorState {
  bun: IIngredient | null,
  ingredients: ReadonlyArray<IIngredientExt>,

  order: number | null,
  orderRequest: boolean,
  orderError: string | null,
  orderInfo: boolean
}

const initialState: IBurgerConstructorState = {
  bun: null,
  ingredients: [],

  order: null,
  orderRequest: false,
  orderError: null,
  orderInfo: false
};

export const burgerConstructorReducer = (state = initialState, action: TBurgerConstructor): IBurgerConstructorState => {
  switch (action.type) {
    case SET_BUN: {
      return {
        ...state,
        bun: action.bun
      };
    }
    case ADD_INGREDIENT: {
      return {
        ...state,
        ingredients: [...state.ingredients, { ...action.ingredient, key: action.key }]
      };
    }
    case REMOVE_INGREDIENT: {
      return {
        ...state,
        ingredients: state.ingredients.filter(item => item.key !== action.key)
      };
    }
    case REPLACE_INGREDIENT: {
      const ingredients = [...state.ingredients];
      ingredients.splice(action.toIndex, 0, ingredients.splice(action.fromIndex, 1)[0]);
      return {
        ...state,
        ingredients: ingredients
      };
    }
    case GET_ORDER_REQUEST: {
      return {
        ...state,
        orderRequest: true
      };
    }
    case GET_ORDER_SUCCESS: {
      return {
        ...state,
        order: action.order,
        orderRequest: false,
        orderError: null,
        orderInfo: true
      };
    }
    case GET_ORDER_ERROR: {
      return {
        ...state,
        orderRequest: false,
        orderError: action.error
      };
    }
    case RESET_ORDER_INFO: {
      return {
        ...state,
        orderInfo: false
      };
    }
    default: {
      return state;
    }
  }
};