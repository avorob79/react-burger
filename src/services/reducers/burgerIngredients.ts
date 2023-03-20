import {
  GET_INGREDIENTS_REQUEST,
  GET_INGREDIENTS_SUCCESS,
  GET_INGREDIENTS_ERROR,
  SET_BUN_COUNTER,
  RESET_BUN_COUNTER,
  INCREASE_INGREDIENT_COUNTER,
  DECREASE_INGREDIENT_COUNTER,
  RESET_COUNTERS
} from '../constants';
import { TBurgerIngredients } from '../actions/burgerIngredients';
import { IIngredient, IIngredientsDictionary } from '../types';

export interface IBurgerIngredientsState {
  ingredients: ReadonlyArray<IIngredient>;
  ingredientsDictionary: IIngredientsDictionary;
  ingredientsRequest: boolean;
  ingredientsError: string | null;

  counters: { [name: string]: number };
}

const initialState: IBurgerIngredientsState = {
  ingredients: [],
  ingredientsDictionary: {},
  ingredientsRequest: false,
  ingredientsError: null,

  counters: {}
};

export const burgerIngredientsReducer = (state = initialState, action: TBurgerIngredients): IBurgerIngredientsState => {
  switch (action.type) {
    case GET_INGREDIENTS_REQUEST: {
      return {
        ...state,
        ingredientsRequest: true
      };
    }
    case GET_INGREDIENTS_SUCCESS: {
      let dictionary: IIngredientsDictionary = {};
      action.ingredients.forEach(item => dictionary[item._id] = item);
      return {
        ...state,
        ingredients: action.ingredients,
        ingredientsDictionary: dictionary,
        ingredientsRequest: false,
        ingredientsError: null
      };
    }
    case GET_INGREDIENTS_ERROR: {
      return {
        ...state,
        ingredientsRequest: false,
        ingredientsError: action.error
      };
    }
    case SET_BUN_COUNTER: {
      return {
        ...state,
        counters: {
          ...state.counters,
          [action.id]: 2
        }
      };
    }
    case RESET_BUN_COUNTER: {
      return {
        ...state,
        counters: {
          ...state.counters,
          [action.id]: 0
        }
      };
    }
    case INCREASE_INGREDIENT_COUNTER: {
      return {
        ...state,
        counters: {
          ...state.counters,
          [action.id]: (state.counters[action.id] || 0) + 1
        }
      };
    }
    case DECREASE_INGREDIENT_COUNTER: {
      return {
        ...state,
        counters: {
          ...state.counters,
          [action.id]: state.counters[action.id] - 1
        }
      };
    }
    case RESET_COUNTERS: {
      return {
        ...state,
        counters: {}
      };
    }
    default: {
      return state;
    }
  }
};