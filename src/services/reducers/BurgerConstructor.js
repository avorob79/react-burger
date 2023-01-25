import {
  SET_BUN,
  ADD_INGREDIENT,
  REMOVE_INGREDIENT,
  REPLACE_INGREDIENT,
  GET_ORDER_REQUEST,
  GET_ORDER_SUCCESS,
  GET_ORDER_ERROR,
  RESET_ORDER_DETAILS
} from '../actions/BurgerConstructor';

const initialState = {
  bun: null,
  ingredients: [],

  order: null,
  orderRequest: false,
  orderDetails: false
};

export const burgerConstructorReducer = (state = initialState, action) => {
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
        ingredients: [...state.ingredients, { ...action.ingredient, key: Date.now() }]
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
        orderDetails: true
      };
    }
    case GET_ORDER_ERROR: {
      return {
        ...state,
        orderRequest: false
      };
    }
    case RESET_ORDER_DETAILS: {
      return {
        ...state,
        orderDetails: false
      };
    }
    default: {
      return state;
    }
  }
};