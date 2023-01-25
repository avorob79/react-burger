import {
  GET_INGREDIENTS_REQUEST,
  GET_INGREDIENTS_SUCCESS,
  GET_INGREDIENTS_ERROR,
  SET_BUN_COUNTER,
  INCREASE_INGREDIENT_COUNTER,
  DECREASE_INGREDIENT_COUNTER,
  SET_DETAILS,
  RESET_DETAILS
} from '../actions/BurgerIngredients';

const initialState = {
  ingredients: [],
  ingredientsRequest: false,

  counters: {},

  details: null
};

export const burgerIngredientsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_INGREDIENTS_REQUEST: {
      return {
        ...state,
        ingredientsRequest: true
      };
    }
    case GET_INGREDIENTS_SUCCESS: {
      return {
        ...state,
        ingredients: action.ingredients,
        ingredientsRequest: false,
      };
    }
    case GET_INGREDIENTS_ERROR: {
      return {
        ...state,
        ingredientsRequest: false,
      };
    }
    case SET_BUN_COUNTER: {
      const counters = {...state.counters};
      state.ingredients.filter(item => item.type === "bun" && !!counters[item._id]).forEach(item => counters[item._id] = 0);
      counters[action.id] = (counters[action.id] || 0) + 2;
      return {
        ...state,
        counters: counters
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
    case SET_DETAILS: {
      return {
        ...state,
        details: action.details,
      };
    }
    case RESET_DETAILS: {
      return {
        ...state,
        details: null
      };
    }
    default: {
      return state;
    }
  }
};